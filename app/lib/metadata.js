/** Staging: discourage indexing disabled — enable for production */
export const stagingRobots = {
  index: true,
  follow: true,
  googleBot: { index: true, follow: true },
};

export const defaultMetadata = {
  title: "Pay 10",
  description: 'Pay 10 UAE is a regulated payments platform building secure, interoperable, and compliance-led payment infrastructure in the UAE.',
  keywords: 'Best payment gateway in UAE, Payment gateway company in UAE, Best payment gateway services provider in UAE, Payment gateway company, Payment gateways in UAE, Best Payment Gateway, Best Payment Gateway in UAE, Payment Gateways In UAE, Best Payment Gateways',
  robots: stagingRobots,
  alternates: {
    canonical: 'https://pay10.bh',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://pay10.bh',
    siteName: 'Pay 10',
    title: "Pay 10 - Trusted Payment Partner in UAE",
    description: 'Pay 10 UAE is a regulated payments platform building secure, interoperable, and compliance-led payment infrastructure in the UAE.',
    images: [
      {
        url: '',
        width: 1200,
        height: 630,
        alt: 'Pay 10',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Pay 10 - Trusted Payment Partner in UAE",
    description: 'Pay 10 UAE is a regulated payments platform building secure, interoperable, and compliance-led payment infrastructure in the UAE.',
    images: [''],
  },
}

// Helper function to generate metadata from API pageData
export const generateApiMetadata = (pageData, fallbackTitle = 'Pay 10', fallbackDescription = defaultMetadata.description) => {
  const baseUrl = process.env.NEXT_PUBLIC_IMAGE_URL;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://pay10.bh';

  let rawTitle = pageData?.meta_title || fallbackTitle;
  
  const currentSlug = (pageData?.slug || '').toLowerCase();
  const titleLower = rawTitle.toLowerCase();

  // Normalize titles to match production exactly
  if (currentSlug === 'home' || titleLower === 'home' || titleLower === 'pay 10') {
    rawTitle = 'Pay 10';
  } else if (currentSlug === 'about-us' || titleLower === 'about-us' || titleLower.includes('about us')) {
    rawTitle = 'About Us \u2013 Pay 10';
  } else if (currentSlug === 'vision-mission' || currentSlug === 'vision-and-mission' || titleLower.includes('vision & mission') || titleLower.includes('vision and mission')) {
    rawTitle = 'Vision & Mission \u2013 Pay 10';
  } else if (currentSlug === 'pay10-uae-app' || titleLower.includes('Pay10 UAE')) {
    rawTitle = 'Pay10 UAE \u2013 Pay 10';
  } else if (currentSlug === 'pay10-biz-uae-app' || currentSlug === 'merchant-app' || titleLower.includes('merchant-app') || titleLower.includes('merchant app')) {
    rawTitle = 'Pay10 Biz UAE \u2013 Pay 10';
  } else if (currentSlug === 'open-finance-altareq' || currentSlug === 'open-finance-altareeq' || titleLower.includes('open finance') || titleLower.includes('altareq') || titleLower.includes('altareeq')) {
    rawTitle = 'Open Finance Al Tareeq \u2013 Pay 10';
  } else if (currentSlug === 'integration-methods' || titleLower.includes('integration methods') || titleLower.includes('integration-methods')) {
    rawTitle = 'Integration Methods \u2013 Pay 10';
  } else if (currentSlug === 'careers' || titleLower.includes('careers')) {
    rawTitle = 'Careers \u2013 Pay 10';
  } else if (currentSlug === 'faqs' || currentSlug === 'faq' || titleLower.includes('faq')) {
    rawTitle = 'Faqs \u2013 Pay 10';
  } else if (currentSlug === 'terms-of-service' || titleLower.includes('terms of service') || titleLower.includes('terms-of-service')) {
    rawTitle = 'Terms of Service \u2013 Pay 10';
  } else if (currentSlug === 'key-fact-statement' || titleLower.includes('key fact statement') || titleLower.includes('key-fact-statement')) {
    rawTitle = 'Key Fact Statement \u2013 Pay 10';
  } else if (currentSlug === 'privacy-policy' || titleLower.includes('privacy policy') || titleLower.includes('privacy-policy')) {
    rawTitle = 'Privacy Policy \u2013 Pay 10';
  } else if (currentSlug === 'channel-partners' || titleLower.includes('channel partners') || titleLower.includes('channel-partners')) {
    rawTitle = 'Channel Partners \u2013 Pay 10';
  }

  const slug = pageData?.slug === 'home' || !pageData?.slug ? '' : pageData.slug;
  const canonicalUrl = `${siteUrl}/${slug}`;

  return {
    title: rawTitle,
    description: pageData?.meta_description || fallbackDescription,
    keywords: pageData?.meta_keywords || defaultMetadata.keywords,
    robots: stagingRobots,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: canonicalUrl,
      siteName: 'Pay 10',
      title: rawTitle,
      description: pageData?.meta_description || fallbackDescription,
      images: pageData?.image && baseUrl ? [
        {
          url: `${baseUrl}${pageData.image}`,
          width: 1200,
          height: 630,
          alt: rawTitle,
        }
      ] : defaultMetadata.openGraph.images,
    },
    twitter: {
      card: 'summary_large_image',
      title: rawTitle,
      description: pageData?.meta_description || fallbackDescription,
      images: pageData?.image && baseUrl ? [`${baseUrl}${pageData.image}`] : defaultMetadata.twitter.images,
    },
  };
};

// Helper function to generate blog post metadata
export const generateBlogMetadata = (blog, fallbackTitle = 'Pay 10', fallbackDescription = defaultMetadata.description) => {
  const baseUrl = process.env.NEXT_PUBLIC_IMAGE_URL;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://pay10.bh';
  const description = blog?.short_description || blog?.description?.replace(/<[^>]*>/g, '').substring(0, 160) || fallbackDescription;
  const canonicalUrl = `${siteUrl}/blog/${blog?.slug || ''}`;

  return {
    title: `${blog?.name || fallbackTitle} | Blog | Pay 10`,
    description: description,
    keywords: blog?.meta_keywords || defaultMetadata.keywords,
    robots: stagingRobots,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      type: 'article',
      locale: 'en_US',
      url: canonicalUrl,
      siteName: 'Pay 10',
      title: blog?.name || fallbackTitle,
      description: description,
      images: blog?.image && baseUrl ? [
        {
          url: `${baseUrl}${blog.image}`,
          width: 1200,
          height: 630,
          alt: blog?.name || fallbackTitle,
        }
      ] : defaultMetadata.openGraph.images,
      publishedTime: blog?.post_date,
      modifiedTime: blog?.updated_at || blog?.post_date,
    },
    twitter: {
      card: 'summary_large_image',
      title: blog?.name || fallbackTitle,
      description: description,
      images: blog?.image && baseUrl ? [`${baseUrl}${blog.image}`] : defaultMetadata.twitter.images,
    },
  };
};
