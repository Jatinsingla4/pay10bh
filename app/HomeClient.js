'use client'

import HeroHomeBanner from './components/ui/HeroHomeBanner';
import TextCenterBlock from './components/ui/TextCenterBlock';
import BannerBreaker from './components/ui/BannerBreaker';
import JourneySection from './components/ui/blocks/JourneySection';
import FeatureBlock from './components/ui/FeatureBlock';
import CertificationHero from './components/ui/CertificationHero';
import CertificationLicensing from './components/ui/CertificationLicensing';
import CBBLicenseFeatures from './components/ui/CBBLicenseFeatures';
import SuperAppSection from './components/ui/SuperAppSection';
import ConsumerAppFeature from './components/ui/ConsumerAppFeature';
import MerchantAppFeature from './components/ui/MerchantAppFeature';
import HomeSecuritySection from './components/ui/HomeSecuritySection';
import MerchantTestimonialVideos from './components/ui/MerchantTestimonialVideos';
import MerchantLogosCTA from './components/ui/MerchantLogosCTA';

import React from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function HomeClient({ pageData = null }) {
  const containerRef = React.useRef(null);

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const elements = containerRef.current.querySelectorAll('[data-animation]');

      elements.forEach((el) => {
        const animationType = el.getAttribute('data-animation');
        const delayRaw = el.getAttribute('data-anim-delay');
        const delay = delayRaw ? parseInt(delayRaw) / 1000 : 0;

        if (animationType === 'fade-up') {
          gsap.fromTo(el, 
            { y: 50, opacity: 0 },
            { 
              y: 0, opacity: 1, duration: 0.8, delay: delay, ease: "power2.out",
              scrollTrigger: {
                trigger: el,
                start: "top 85%",
                toggleActions: "play none none none"
              }
            }
          );
        } else if (animationType === 'opacity-up') {
          gsap.fromTo(el, 
            { y: 30, opacity: 0 },
            { 
              y: 0, opacity: 1, duration: 0.8, delay: delay, ease: "power2.out",
              scrollTrigger: {
                trigger: el,
                start: "top 85%",
                toggleActions: "play none none none"
              }
            }
          );
        }
      });
    }
  }, []);

  return (
    <main ref={containerRef} style={{ backgroundColor: 'var(--body-bg)' }}>
      {pageData && (pageData.page_title || pageData.banner_image || pageData.page_description) && (
        <HeroHomeBanner
          eyebrow={pageData.page_title}
          subtitle={pageData.page_subtitle}
          description={pageData.page_description}
          ctaLabel={pageData.banner_text || 'Get in Touch'}
          bgImage={pageData.banner_image}
          mobileBgImage={pageData.mobile_image}
          heroImage={null}
          decorations={[]}
        />
      )}
      
      {/* 
        API sections mapping can be added here once the CMS structure for homepage sections is defined.
        For now, all static hardcoded UI has been removed as requested.
      */}
      {pageData?.sections?.map((section, idx) => {
        const titleLower = section.title ? section.title.toLowerCase() : '';

        // Added fallback to idx so that even if the title is completely changed in the CMS, the sections will still render in the correct order.
        if (titleLower.includes('cbuae licensed') || idx === 0) {
          return (
            <CBBLicenseFeatures 
              key={idx}
              eyebrow={section.title}
              title={section.subtitle}
              content={section.content}
              cardsData={section.cards}
              logo={section.images?.[0]}
            />
          );
        }
        
        if (titleLower.includes('super app') || titleLower.includes('everything financial') || idx === 1) {
          const hasContent = section.content && section.content.replace(/<[^>]*>?/gm, '').trim().length > 0;
          return (
            <SuperAppSection 
              key={idx}
              title={hasContent ? section.content : section.title}
              cardsData={section.cards}
              bgImage={section.images?.[0]}
            />
          );
        }

        if (titleLower.includes('complete financial life') || idx === 2) {
          return (
            <ConsumerAppFeature
              key={idx}
              title={section.title}
              subtitle={section.subtitle}
              cardsData={section.cards}
              image={section.images?.[0]}
              content={section.content}
            />
          );
        }

        if (titleLower.includes('the merchant app') || titleLower.includes('merchant app that works') || idx === 3) {
          return (
            <MerchantAppFeature
              key={idx}
              title={section.title}
              subtitle={section.subtitle}
              cardsData={section.cards}
              image={section.images?.[0]}
              content={section.content}
            />
          );
        }

        if (titleLower.includes('security') || idx === 4) {
          return (
            <HomeSecuritySection
              key={idx}
              title={section.title}
              subtitle={section.subtitle}
              content={section.content}
              images={section.images}
            />
          );
        }

        if (titleLower.includes("don't take our word") || titleLower.includes('merchants themselves') || idx === 5) {
          return (
            <MerchantTestimonialVideos
              key={idx}
              title={section.title}
              content={section.content}
              cardsData={section.cards}
              videos={section.videos || []}
              sectionVideo={section.video}
            />
          );
        }

        if (titleLower.includes('get started today') || titleLower.includes('logos') || idx === 6) {
          return (
            <MerchantLogosCTA
              key={idx}
              title={section.title}
              images={section.images}
            />
          );
        }

        return (
          <div key={idx} style={{ padding: '40px', textAlign: 'center' }}>
            {section.title && <h2>{section.title}</h2>}
            {section.content && <div dangerouslySetInnerHTML={{ __html: section.content }} />}
            {section.image && <img src={section.image} alt={section.title} style={{ maxWidth: '100%', height: 'auto', marginTop: '20px' }} />}
          </div>
        );
      })}
    </main>
  );
}
