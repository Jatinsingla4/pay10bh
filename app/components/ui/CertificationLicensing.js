'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import styles from './CertificationLicensing.module.scss';

export default function CertificationLicensing({
  heading = 'Pay Ten Payment Services Provider LLC (Pay10) is licensed and regulated by the Central Bank of Bahrain.',
  centralBankImage,
  licensedByHeading = 'Licensed by:',
  licenseImages = [],
}) {
  const trackRef = useRef(null);
  const marqueeRef = useRef(null);
  const indexRef = useRef(0);

  useEffect(() => {
    if (!licenseImages || licenseImages.length === 0) return;
    const total = licenseImages.length; // 2

    const slide = () => {
      const track = trackRef.current;
      const container = marqueeRef.current;
      if (!track || !container) return;

      const cardW = container.offsetWidth / 2; // 2 cards visible
      const gap = 24;
      const stepPx = cardW + gap;

      indexRef.current += 1;

      track.style.transition = 'transform 0.8s cubic-bezier(0.77, 0, 0.175, 1)';
      track.style.transform = `translateX(-${indexRef.current * stepPx}px)`;

      // After sliding to the cloned pair, snap silently back to start
      if (indexRef.current >= total) {
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
  }, [licenseImages]);

  return (
    <section className={styles.banner}>
      <div className={styles.content}>
        <p className={styles.mainText} data-animation="opacity-up">
          {heading}
        </p>

        {centralBankImage && (
          <div className={styles.centralBankSection} data-animation="opacity-up">
            <div className={styles.logoContainer}>
              <Image
                src={centralBankImage}
                alt="Central Bank of Bahrain"
                width={200}
                height={100}
                className={styles.centralBankLogo}
              />
            </div>
          </div>
        )}

        {licensedByHeading && (
          <p className={styles.licensedBy} data-animation="opacity-up">
            {licensedByHeading}
          </p>
        )}

        {licenseImages && licenseImages.length > 0 && (
          <div className={styles.badgesMarquee} ref={marqueeRef} data-animation="opacity-up" data-anim-delay="200">
            <div className={styles.badgesTrack} ref={trackRef}>
              {[...licenseImages, ...licenseImages].map((item, index) => (
                <div key={index} className={styles.badgeCard}>
                  <Image
                    src={item.Image || item.image || item}
                    alt={`License ${index + 1}`}
                    width={200}
                    height={200}
                    className={styles.badgeImage}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
