export default async function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://pay10.bh';

  // Static routes matching production
  const routes = [
    '',
    '/about-us',
    '/contact-us',
    '/careers',
    '/terms-of-service',
    '/privacy-policy',
    '/vision-mission',
    '/pay10-uae-app',
    '/pay10-biz-uae-app',
    '/open-finance-altareq',
    '/payment-gateway',
    '/faqs',
    '/key-fact-statement',
    '/channel-partners',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: route === '' ? 1 : 0.8,
  }));

  // Static event routes (matching FALLBACK_EVENTS in events/page.js)
  const eventRoutes = [
    'gitex-global-2024',
    'seamless-middle-east-2025',
    'fintech-abu-dhabi-2025',
    'global-fintech-fest-2025',
  ].map((slug) => ({
    url: `${baseUrl}/events/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.6,
  }));

  return [...routes, ...eventRoutes];
}
