"use client";

import ConsumerHero from "@/app/components/ui/product/ConsumerHero";
import ConsumerFeatureSection from "@/app/components/ui/product/ConsumerFeatureSection";
import ConsumerSecuritySection from "./ConsumerSecuritySection";
import Style from "./page.module.scss";

// These sections must render right after the hero, ahead of everything else —
// CMS only allows appending new sections at the end, so we reorder by title here.
const PINNED_TO_TOP = [
  'Register in Minutes',
  'Login. Securely. Every Time.',
  'Manage Your Profile. Your Way.',
];

const CustomerAppClient = ({ pageData = null }) => {
  // Extract the first section which acts as the hero content
  const heroSection = pageData?.sections?.[0];
  const remainingSections = [...(pageData?.sections?.slice(1) || [])].sort((a, b) => {
    const aRank = PINNED_TO_TOP.findIndex((t) => t.toLowerCase() === a.title?.trim().toLowerCase());
    const bRank = PINNED_TO_TOP.findIndex((t) => t.toLowerCase() === b.title?.trim().toLowerCase());
    return (aRank === -1 ? PINNED_TO_TOP.length : aRank) - (bRank === -1 ? PINNED_TO_TOP.length : bRank);
  });

  return (
    <main>
      <ConsumerHero 
        title={pageData?.page_title}
        eyebrow={heroSection?.title || pageData?.banner_text}
        subtitle={pageData?.page_subtitle || heroSection?.subtitle}
        sectionHeading={heroSection?.subtitle}
        description={heroSection?.content || pageData?.page_description}
        bgImage={pageData?.banner_image}
        mobileImage={pageData?.mobile_image}
        mobileBgImage={pageData?.mobile_image}
        cardsData={heroSection?.cards || pageData?.contact_cards || []}
      />

      {remainingSections && remainingSections.length > 0 && (
        <div className={Style.bg_circle_wrapper}>
          {remainingSections.map((section, index) => {
            // Check if this section is the security section
            if (section.title?.toUpperCase().includes('SECURITY')) {
              return (
                <ConsumerSecuritySection 
                  key={index} 
                  title={section.title}
                  subtitle={section.subtitle}
                  content={section.content}
                  images={section.images}
                />
              );
            }

            // Bullets can come from an actual <li> list typed into the CMS
            // content field, instead of requiring separate "cards" per bullet.
            const liMatches = section.content
              ? Array.from(section.content.matchAll(/<li[^>]*>(.*?)<\/li>/g))
              : [];
            const pointsFromContent = liMatches.map((m) => m[1].replace(/<[^>]*>?/gm, '').trim());
            const points = pointsFromContent.length > 0
              ? pointsFromContent
              : (section.cards?.map(card => card.title) || []);

            // Otherwise, render it as a feature section
            return (
              <ConsumerFeatureSection
                key={index}
                heading={section.title}
                subheading={section.subtitle}
                points={points}
                imageSrc={section.images?.[0]}
                imageAlt={section.title}
                isReversed={index % 2 !== 0} // Alternate left/right based on index
                isGreyBg={true}
                isTransparent={true}
                extraContent={pointsFromContent.length > 0 ? null : section.content}
              />
            );
          })}
        </div>
      )}
    </main>
  );
};

export default CustomerAppClient;
