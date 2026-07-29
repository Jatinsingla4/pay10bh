"use client";
import React, { useEffect, useRef } from 'react';
import Style from '../../pay10-uae-app/ConsumerSecuritySection.module.scss';
import Image from 'next/image';

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

  // If no CMS data is provided, do not render
  if (!title && !subtitle && !content && displayImages.length === 0) {
    return null;
  }

  return (
    <section className={Style.security_section}>
      <div className={Style.container}>
        
        {/* Animated Gradient Padlock SVG */}
        <div className={Style.icon_wrapper} data-animation="opacity-up">
          <svg width="80" height="100" viewBox="0 0 24 30" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="lockGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ffb100" />
                <stop offset="100%" stopColor="#ff0000" />
              </linearGradient>
            </defs>
            <path d="M19 11H18V7C18 3.686 15.314 1 12 1C8.686 1 6 3.686 6 7V11H5C3.895 11 3 11.895 3 13V27C3 28.105 3.895 29 5 29H19C20.105 29 21 28.105 21 27V13C21 11.895 20.105 11 19 11ZM8 7C8 4.791 9.791 3 12 3C14.209 3 16 4.791 16 7V11H8V7ZM19 27H5V13H19V27ZM12 22C10.895 22 10 21.105 10 20C10 18.895 10.895 18 12 18C13.105 18 14 18.895 14 20C14 21.105 13.105 22 12 22Z" fill="url(#lockGradient)"/>
          </svg>
        </div>

        {subtitle && (
          <h3 className={Style.subheading} data-animation="opacity-up" data-anim-delay="100">
            {subtitle}
          </h3>
        )}
        
        {title && (
          <h1 className={Style.main_heading} data-animation="opacity-up" data-anim-delay="150" dangerouslySetInnerHTML={{ __html: title }}></h1>
        )}
        
        {content && (
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

      </div>
    </section>
  );
};

export default HomeSecuritySection;
