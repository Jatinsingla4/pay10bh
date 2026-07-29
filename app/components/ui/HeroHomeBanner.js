 'use client';

import { useLayoutEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { gsap } from 'gsap';
import styles from './HeroHomeBanner.module.scss';
import { isEmptyHtml } from '../../lib/sanitizeHtml';

const defaultDecorations = [
  {
    id: 'ic1',
    type: 'icon',
    src: '/images/home/ic1.svg',
    alt: '',
    size: { width: 77, height: 77 },
    position: {
      desktop: { top: '15%', left: '6%' },
      mobile: { top: '57%', left: '9%' },
    },
  },
  {
    id: 'ic2',
    type: 'icon',
    src: '/images/prod_imports/pay10.svg',
    alt: '',
    size: { width: 56, height: 56 },
    position: {
      desktop: { top: '10%', left: '92%' },
      mobile: { top: '80%', left: '10%' },
    },
  },
  {
    id: 'ic3',
    type: 'icon',
    src: '/images/home/ic4.svg',
    alt: '',
    size: { width: 40, height: 40 },
    position: {
      desktop: { top: '60%', left: '6%' },
      mobile: { top: '60%', left: '90%' },
    },
  },
  {
    id: 'ic4',
    type: 'icon',
    src: '/images/home/ic4.svg',
    alt: '',
    size: { width: 40, height: 40 },
    position: {
      desktop: { top: '36%', left: '83%' },
      mobile: { top: '85%', left: '88%' },
    },
  },
  {
    id: 'ic5',
    type: 'icon',
    src: '/images/prod_imports/shield-with-bg.svg',
    alt: '',
    size: { width: 78, height: 77 },
    position: {
      desktop: { top: '74%', left: '89%' },
      mobile: { top: '88%', left: '82%' },
    },
  },
  {
    id: 'ic6',
    type: 'icon',
    src: '/images/prod_imports/barcode-with-bg.svg',
    alt: '',
    size: { width: 78, height: 78 },
    position: {
      desktop: { top: '60%', left: '21%' },
      mobile: { top: '72%', left: '5%' },
    },
  },
  {
    id: 'circle-large',
    type: 'circle',
    size: { width: '95vw', height: '95vw' },
    position: {
      desktop: { top: '100%', left: '50%' },
      mobile: { top: '115%', left: '-6%' },
    },
  },
  {
    id: 'circle-small',
    type: 'circle',
    size: { width: '74vw', height: '80vw' },
    position: {
      desktop: { top: '112%', left: '50%' },
      mobile: { top: '100%', left: '14%' },
    },
  },
];

export default function HeroHomeBanner({
  eyebrow = 'Your Trusted Alternative Payment Method',
  subtitle: subtitleProp = 'Licensed by Central Bank of Bahrain\nInstant. Secure. Interoperable.',
  description: descriptionProp = '<h1>Why Pay, When You Can Pay10</h1>',
  ctaLabel = 'Get Started',
  ctaHref = '/contact-us',
  heroImage = {
    src: '/images/home/herobanner_mobile_img.png',
    alt: 'Pay10 app screens',
    width: 360,
    height: 640,
  },
  decorations = defaultDecorations,
  bgImage,
  mobileBgImage,
}) {
  const description = isEmptyHtml(descriptionProp) ? '<h1>Why Pay, When You Can Pay10</h1>' : descriptionProp;
  const subtitle = isEmptyHtml(subtitleProp) ? 'Licensed by Central Bank of Bahrain\nInstant. Secure. Interoperable.' : subtitleProp;
  const hasHeroImage = heroImage && heroImage.src;
  const rootRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const prefersReduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReduce) return;

      const rootEl = rootRef.current;
      if (rootEl) {
        gsap.set(rootEl, { autoAlpha: 0 });
      }

      const circles = gsap.utils.toArray('[data-anim="circle"]');
      const icons = gsap.utils.toArray('[data-anim="icon"]');
      const textChain = gsap.utils.toArray(
        '[data-anim="eyebrow"], [data-anim="sub1"], [data-anim="sub2"], [data-anim="title"], [data-anim="phone"]'
      );
      const ctaEl = document.querySelector('[data-anim="cta"]');

      const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });

      if (rootEl) {
        tl.to(rootEl, {
          autoAlpha: 1,
          duration: 0.25,
          ease: 'power1.out',
        }, 0);
      }

      if (circles.length) {
        tl.from(circles, {
          autoAlpha: 0,
          scale: 0.8,
          duration: 1,
          stagger: 0.15,
        }, 0.05);
      }

      if (textChain.length) {
        tl.from(textChain, {
          autoAlpha: 0,
          y: 28,
          duration: 0.8,
          stagger: 0.2,
          clearProps: 'transform',
        }, 0.25);
      }

      if (ctaEl) {
        tl.fromTo(ctaEl,
          { autoAlpha: 0, y: 20 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.5,
            ease: 'power2.out',
            // clearProps: 'transform',
          },
          0.75
        );
      }

      if (icons.length) {
        tl.from(icons, {
          autoAlpha: 0,
          scale: 0.3,
          duration: 1,
          stagger: 0.05,
          ease: 'back.out(1.8)',
        }, 1.05);
      }

      // Add subtle scale animation after initial timeline completes
      const timelineDuration = tl.duration();

      if (circles.length) {
        gsap.to(circles, {
          scale: 1.05,
          duration: 1.5,
          ease: 'power1.inOut',
          stagger: 0.2,
          yoyo: true,
          repeat: -1,
          delay: timelineDuration + 0.3,
        });
      }

      if (icons.length) {
        gsap.to(icons, {
          y: -10,
          duration: 1.2,
          ease: 'power1.inOut',
          stagger: 0.15,
          yoyo: true,
          repeat: -1,
          delay: timelineDuration + 0.5,
        });
      }
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={rootRef} 
      className={styles.heroHomeBanner}
      style={{
        '--hero-bg-desktop': bgImage ? `url(${bgImage})` : "url('/images/home/home_banner_headspace.jpg')",
        '--hero-bg-mobile': mobileBgImage ? `url(${mobileBgImage})` : (bgImage ? `url(${bgImage})` : "url('/images/prod_imports/home-page-hero-mobile.png')")
      }}
    >
      <div className={styles.desktopLayout}>
        <div className={styles.desktopInner}>
          {eyebrow && <p className={styles.eyebrow} data-anim="eyebrow">{eyebrow}</p>}
          {subtitle && (
            <p className={styles.body} data-anim="sub1" style={{ whiteSpace: 'pre-line' }}>
              {subtitle}
            </p>
          )}
          {description && (
            <div 
              className={styles.titleWrapper} 
              data-anim="title"
              dangerouslySetInnerHTML={{ __html: description }}
            />
          )}
          {ctaLabel && (
            <Link href={ctaHref} className={styles.ctaDesktop} data-anim="cta">
              <span>{ctaLabel}</span>
            </Link>
          )}
        </div>

        {hasHeroImage && (
          <div className={styles.desktopPhoneWrap} data-anim="phone">
            <Image
              src={heroImage.src}
              alt={heroImage.alt || ''}
              width={heroImage.width}
              height={heroImage.height}
              className={styles.desktopPhone}
              priority
            />
          </div>
        )}
      </div>

      {Array.isArray(decorations) && decorations.length > 0 && (
        <div className={styles.decorations}>
          {decorations.map((item) => {
            const widthVal = item.size?.width;
            const heightVal = item.size?.height;

            const styleVars = {
              '--top-desktop': item.position?.desktop?.top,
              '--left-desktop': item.position?.desktop?.left,
              '--right-desktop': item.position?.desktop?.right,
              '--bottom-desktop': item.position?.desktop?.bottom,
              '--top-mobile': item.position?.mobile?.top,
              '--left-mobile': item.position?.mobile?.left,
              '--right-mobile': item.position?.mobile?.right,
              '--bottom-mobile': item.position?.mobile?.bottom,
              '--width':
                typeof widthVal === 'number'
                  ? `${widthVal}px`
                  : typeof widthVal === 'string'
                    ? widthVal
                    : undefined,
              '--height':
                typeof heightVal === 'number'
                  ? `${heightVal}px`
                  : typeof heightVal === 'string'
                    ? heightVal
                    : undefined,
            };

            if (item.type === 'circle') {
              return (
                <span
                  key={item.id}
                  className={styles.circleDecoration}
                  style={styleVars}
                  data-anim="circle"
                  aria-hidden="true"
                />
              );
            }

            return (
              <div
                key={item.id}
                className={styles.iconDecoration}
                style={styleVars}
                aria-hidden={item.alt ? undefined : true}
                data-anim="icon"
              >
                {item.src ? (
                  <Image
                    src={item.src}
                    alt={item.alt || ''}
                    width={item.size?.width || 56}
                    height={item.size?.height || 56}
                    className={styles.iconImage}
                    priority={Boolean(item.priority)}
                  />
                ) : null}
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}

