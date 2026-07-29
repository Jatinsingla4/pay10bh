"use client";

import React from "react";
import { Icon } from "@iconify/react";
import Style from "./ConsumerHero.module.scss";
import { isEmptyHtml } from "@/app/lib/sanitizeHtml";

const ConsumerHero = ({ 
  title = "",
  subtitle = "",
  sectionHeading = "",
  description = "",
  bgImage = "",
  mobileBgImage = "",
  eyebrow = "",
  cardsData = []
}) => {
  const hasSubtitle = !isEmptyHtml(subtitle);
  const hasSectionHeading = !isEmptyHtml(sectionHeading);
  const hasDescription = !isEmptyHtml(description);

  // If no data provided, don't render the section
  if (!title && !hasSubtitle && !hasDescription && !bgImage && cardsData.length === 0) return null;

  return (
    <section 
      className={Style.consumer_hero}
      style={{
        '--bg-desktop': bgImage ? `url(${bgImage})` : 'none',
        '--bg-mobile': mobileBgImage ? `url(${mobileBgImage})` : (bgImage ? `url(${bgImage})` : 'none')
      }}
    >
      <div className={Style.hero_banner_wrapper}>
        <div className={`${Style.hero_banner} ${!bgImage ? Style.fallback_gradient : ''}`}>
          <div className={Style.hero_banner_text}>
            {title && (
              <h1 className={Style.headline} data-animation="opacity-up" dangerouslySetInnerHTML={{ __html: title }}></h1>
            )}
            {hasSubtitle && (
              <p className={Style.hero_desc} data-animation="opacity-up" dangerouslySetInnerHTML={{ __html: subtitle }}></p>
            )}
          </div>
        </div>
      </div>

      {(hasSectionHeading || hasDescription || eyebrow) && (
        <div className={Style.intro_text_section} data-animation="opacity-up">
          {eyebrow && (
            <span className={Style.intro_label}>{eyebrow}</span>
          )}
          {hasSectionHeading && (
            <h2 className={Style.intro_heading} dangerouslySetInnerHTML={{ __html: sectionHeading }}></h2>
          )}
          {hasDescription && (
            <div className={Style.intro_para} dangerouslySetInnerHTML={{ __html: description }}></div>
          )}
        </div>
      )}

      {cardsData && cardsData.length > 0 && (
        <>
          <svg width="0" height="0">
            <defs>
              <linearGradient id="heroIconGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="var(--red)" />
                <stop offset="40%" stopColor="var(--orange)" />
                <stop offset="100%" stopColor="var(--yellow)" />
              </linearGradient>
            </defs>
          </svg>

          <div className={Style.features_wrapper} data-animation="opacity-up" data-anim-delay="300">
            <div className={Style.features_scroll}>
              {cardsData.map((item, index) => (
                <div className={Style.feature_card} key={index}>
                  <div className={Style.feature_icon}>
                    {/* Support both uploaded images and iconify strings */}
                    {(item.image || (item.icon && (item.icon.startsWith('http') || item.icon.startsWith('/')))) ? (
                      <img src={item.image || item.icon} alt={item.title} width="36" height="36" />
                    ) : (
                      <Icon icon={item.icon || "ph:star-bold"} width="36" height="36" />
                    )}
                  </div>
                  <h3 className={Style.feature_title}>{item.title}</h3>
                  <p className={Style.feature_desc}>{item.subtitle || item.content?.replace(/<[^>]*>?/gm, '')}</p>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default ConsumerHero;
