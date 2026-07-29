"use client";
import React, { useEffect, useRef } from 'react';
import Style from '../../pay10-uae-app/ConsumerSecuritySection.module.scss';
import Image from 'next/image';
import GlobalContactCTA from './GlobalContactCTA';
import { isEmptyHtml } from '../../lib/sanitizeHtml';

const HomeSecuritySection = ({
  title = "",
  subtitle = "",
  content = "",
  images = []
}) => {
  const trackRef = useRef(null);
  const marqueeRef = useRef(null);
  const indexRef = useRef(0);

  const displayImages = images && images.length > 0 ? images : [];

  useEffect(() => {
    if (!displayImages || displayImages.length === 0) return;
    
    // We duplicate the images many times to create a smooth infinite scroll effect
    const slide = () => {
      const track = trackRef.current;
      const container = marqueeRef.current;
      if (!track || !container || !track.children[0]) return;

      const cardW = track.children[0].offsetWidth;
      const gap = 24;
      const stepPx = cardW + gap;

      indexRef.current += 1;

      track.style.transition = 'transform 0.8s cubic-bezier(0.77, 0, 0.175, 1)';
      track.style.transform = `translateX(-${indexRef.current * stepPx}px)`;

      // Reset when we reach the total number of unique items
      if (indexRef.current >= displayImages.length) {
        setTimeout(() => {
          if (!trackRef.current) return;
          trackRef.current.style.transition = 'none';
          trackRef.current.style.transform = 'translateX(0)';
          indexRef.current = 0;
        }, 900);
      }
    };

    const id = setInterval(slide, 3500);
    return () => clearInterval(id);
  }, [displayImages]);

  const hasHeading = !!title || !!subtitle || !isEmptyHtml(content);

  // If no CMS data is provided, do not render
  if (!hasHeading && displayImages.length === 0) {
    return null;
  }

  return (
    <section className={Style.security_section} style={hasHeading ? undefined : { paddingTop: '40px' }}>
      <div className={Style.container}>

        {subtitle && (
          <h3 className={Style.subheading} data-animation="opacity-up" data-anim-delay="100">
            {subtitle}
          </h3>
        )}
        
        {title && (
          <h1 className={Style.main_heading} data-animation="opacity-up" data-anim-delay="150" dangerouslySetInnerHTML={{ __html: title }}></h1>
        )}
        
        {!isEmptyHtml(content) && (
          <div className={Style.description} data-animation="opacity-up" data-anim-delay="200" style={{ maxWidth: '800px', margin: '0 auto 40px auto' }} dangerouslySetInnerHTML={{ __html: content }} />
        )}

        <div className={Style.certifications} data-animation="opacity-up" data-anim-delay="250">
          <h4>Certified by</h4>

          <div className={Style.badgesMarquee} ref={marqueeRef}>
            <div className={Style.badgesTrack} ref={trackRef}>
              {/* Duplicate the logos array so we have enough items to slide and reset seamlessly */}
              {[...displayImages, ...displayImages, ...displayImages, ...displayImages, ...displayImages].map((item, index) => (
                <div key={index} className={Style.badgeCard}>
                  <img
                    src={item}
                    alt={`License ${index + 1}`}
                    className={Style.badgeImage}
                  />
                </div>
              ))}
            </div>
          </div>

        </div>

        <GlobalContactCTA title="Get Started Today" />

      </div>
    </section>
  );
};

export default HomeSecuritySection;
