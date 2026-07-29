import { NextResponse } from 'next/server';

/** Apex hostname only — must match DNS for bare domain. */
const APEX_HOST = 'pay10.bh';
const WWW_HOST = 'www.pay10.bh';


const SKIP_HOSTS = new Set(['localhost', '127.0.0.1']);

// --- Rate limiting for public, unauthenticated API routes ---
// This app runs as a single long-lived `next start` process (confirmed —
// not serverless/edge functions), so an in-memory store is correctly
// shared across every request it handles.
const RATE_LIMITED_PREFIXES = ['/api/proxy'];
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX_REQUESTS = 10;
const rateLimitStore = new Map(); // ip -> { count, windowStart }
let requestsSinceSweep = 0;

function pruneExpiredEntries(now) {
  for (const [ip, entry] of rateLimitStore) {
    if (now - entry.windowStart > RATE_LIMIT_WINDOW_MS) {
      rateLimitStore.delete(ip);
    }
  }
}

function isRateLimited(ip) {
  const now = Date.now();

  requestsSinceSweep += 1;
  if (requestsSinceSweep >= 500) {
    requestsSinceSweep = 0;
    pruneExpiredEntries(now);
  }

  const entry = rateLimitStore.get(ip);
  if (!entry || now - entry.windowStart > RATE_LIMIT_WINDOW_MS) {
    rateLimitStore.set(ip, { count: 1, windowStart: now });
    return false;
  }

  entry.count += 1;
  return entry.count > RATE_LIMIT_MAX_REQUESTS;
}

function getClientIp(request) {
  const forwardedFor = request.headers.get('x-forwarded-for');
  if (forwardedFor) {
    return forwardedFor.split(',')[0].trim();
  }
  return request.headers.get('x-real-ip') || 'unknown';
}

export function proxy(request) {
  const { pathname } = request.nextUrl;

  if (RATE_LIMITED_PREFIXES.some((prefix) => pathname.startsWith(prefix))) {
    const ip = getClientIp(request);
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { status: false, message: 'Too many requests. Please try again in a minute.' },
        { status: 429 }
      );
    }
  }

  const forwarded = request.headers.get('x-forwarded-host');
  const hostHeader = forwarded || request.headers.get('host') || '';
  const hostname = hostHeader.split(':')[0].toLowerCase();

  if (!hostname || SKIP_HOSTS.has(hostname) || hostname.endsWith('.local')) {
    return NextResponse.next();
  }

  if (hostname !== APEX_HOST) {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.hostname = WWW_HOST;
  url.protocol = 'https';
  return NextResponse.redirect(url, 308);
}

export const config = {
  matcher: '/:path*',
};
