/** @type {import('next').NextConfig} */
const path = require('path');
const { buildCspHeader } = require('./config/csp-config');

const cspHeader = buildCspHeader();

const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    minimumCacheTTL: 60,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'gww.grapesmobile.com',
      },
      {
        protocol: 'https',
        hostname: 'pay10.grapesmobile.com',
      },
      {
        protocol: 'https',
        hostname: 'pcms.pay10.in',
      },
      {
        protocol: 'https',
        hostname: 'adminpayd.grapesmobile.com',
      },
      {
        protocol: 'https',
        hostname: 'pay10.webhr.co',
      },
      {
        protocol: 'https',
        hostname: 'bucket-7vbln7.s3.ap-south-1.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: 'grapesmdev.blr1.digitaloceanspaces.com',
      },
    ],
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
    // prependData: `@import "globals/_mixin";`,
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },

  async redirects() {
    return [
      {
        source: '/merchant-app',
        destination: '/pay10-biz-uae-app',
        permanent: true,
      },
      {
        source: '/consumer-app',
        destination: '/pay10-uae-app',
        permanent: true,
      },
      {
        source: '/kfs-biz-app',
        destination: '/key-fact-statement',
        permanent: true,
      },
      {
        source: '/kfs-customer-wallet',
        destination: '/key-fact-statement',
        permanent: true,
      },
      {
        source: '/solution-payment-gateway.php',
        destination: '/payment-gateway',
        permanent: true,
      },
      {
        source: '/about-overview.php',
        destination: '/about-us',
        permanent: true,
      },
      {
        source: '/terms-and-conditions.php',
        destination: '/terms-of-service',
        permanent: true,
      },
      {
        source: '/customer-grievance-policy.php',
        destination: '/customer-grievances-policy',
        permanent: true,
      },
    ];
  },

  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains',
          },
          {
            key: 'Content-Security-Policy',
            value: cspHeader,
          },
        ],
      },
      {
        source: '/fonts/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400, must-revalidate',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
