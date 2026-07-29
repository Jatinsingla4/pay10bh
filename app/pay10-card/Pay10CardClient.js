"use client";

import React from "react";
import Style from "./page.module.scss";
import ConsumerFeatureSection from "@/app/components/ui/product/ConsumerFeatureSection";
import Pay10CardFeatures from "./components/Pay10CardFeatures";
import Pay10AppFeature from "./components/Pay10AppFeature";
import Pay10WPSFeature from "./components/Pay10WPSFeature";
import { isEmptyHtml } from "@/app/lib/sanitizeHtml";

const firstNonEmptyHtml = (...vals) => vals.find(v => !isEmptyHtml(v)) ?? vals[vals.length - 1];

const Pay10CardClient = ({ pageData = null }) => {
  const cardFeature = {
    heading: pageData?.sections?.[0]?.title || "The first local Debit Card accredited by the Central Bank of Bahrain.",
    subheading: pageData?.sections?.[0]?.subtitle || "Pay10 is issuing UAE's first CBB-accredited local debit card directly through the Pay10 UAE - offering an instant, secure, and seamless payment experience for everyone who calls the UAE home.",
    points: pageData?.sections?.[0]?.cards?.map(c => c.title) || [],
    imageSrc: pageData?.sections?.[0]?.images?.[0] || "/images/prod_imports/pay10-card-aluminium.png",
    imageAlt: pageData?.sections?.[0]?.title || "Pay10 Card",
    isReversed: false,
  };

  return (
    <main>
      <section 
        className={Style.altareq_hero}
        style={{
          '--desktop-bg': pageData?.banner_image ? `url(${pageData.banner_image})` : undefined,
          '--mobile-bg': pageData?.mobile_image ? `url(${pageData.mobile_image})` : (pageData?.banner_image ? `url(${pageData.banner_image})` : undefined)
        }}
      >
        <div className={Style.altareq_hero_text}>
          <h2 dangerouslySetInnerHTML={{ __html: firstNonEmptyHtml(pageData?.page_title, "Pay10 Card, UAE has been waiting for.") }} />
          <p dangerouslySetInnerHTML={{ __html: firstNonEmptyHtml(pageData?.page_subtitle, pageData?.page_description, "The first local Debit Card accredited by the Central Bank of Bahrain — instant, secure, and seamless. Built inside Pay10 UAE. For banked professionals and WPS employees.") }} />
        </div>
      </section>

      <div className={Style.bg_circle_wrapper}>

        <div className={Style.grey_subtitle_wrap}>
        <ConsumerFeatureSection
          heading={cardFeature.heading}
          subheading={cardFeature.subheading}
          points={cardFeature.points}
          extraContent={
            <>
              {!isEmptyHtml(pageData?.sections?.[0]?.content) && (
                <div dangerouslySetInnerHTML={{ __html: pageData.sections[0].content }} />
              )}
            </>
          }
          imageSrc={cardFeature.imageSrc}
          imageAlt={cardFeature.imageAlt}
          isReversed={cardFeature.isReversed}
          isGreyBg={false}
          isTransparent={true}
        />
        </div>

        <Pay10CardFeatures data={pageData?.sections?.[1]} />

        {/* ── Dual Debit Card Section ── */}
        <section className={Style.dual_card_section}>
          <div className={Style.dual_card_header} data-animation="opacity-up">
            <h2>{pageData?.sections?.[2]?.title || "Two cards. One app. Every need covered."}</h2>
            <p>{pageData?.sections?.[2]?.subtitle || "Whether you're a salaried professional or a WPS employee, Pay10 has a Jaywan-powered debit card built for your life in the UAE."}</p>
          </div>

          <div className={Style.dual_card_grid}>
            {/* Consumer Debit Card — grey card image */}
            <div className={Style.card_wrapper} data-animation="opacity-up" data-anim-delay="100">
              <div className={Style.debit_card}>
                <img
                  src={pageData?.sections?.[2]?.cards?.[0]?.icon}
                  alt={pageData?.sections?.[2]?.cards?.[0]?.title || "Consumer Debit Card"}
                  className={Style.debit_card_img}
                />
              </div>
              <div className={Style.card_info}>
                <h3>{pageData?.sections?.[2]?.cards?.[0]?.title || "Consumer Debit Card"}</h3>
                <p>{firstNonEmptyHtml(pageData?.sections?.[2]?.cards?.[0]?.subtitle, pageData?.sections?.[2]?.cards?.[0]?.description, "For Pay10 UAE users. Tap, swipe, or pay online — works at 90%+ of UAE POS terminals and all major ATMs.")}</p>
              </div>
            </div>

            {/* WPS Debit Card — orange card image */}
            <div className={Style.card_wrapper} data-animation="opacity-up" data-anim-delay="200">
              <div className={Style.debit_card}>
                <img
                  src={pageData?.sections?.[2]?.cards?.[1]?.icon}
                  alt={pageData?.sections?.[2]?.cards?.[1]?.title || "WPS Debit Card"}
                  className={Style.debit_card_img}
                />
              </div>
              <div className={Style.card_info}>
                <h3>{pageData?.sections?.[2]?.cards?.[1]?.title || "WPS Debit Card"}</h3>
                <p>{firstNonEmptyHtml(pageData?.sections?.[2]?.cards?.[1]?.subtitle, pageData?.sections?.[2]?.cards?.[1]?.description, "For WPS-enrolled employees. Receive your salary directly and spend instantly — no bank account required.")}</p>
              </div>
            </div>
          </div>
        </section>

        <Pay10AppFeature data={pageData?.sections?.[3]} />

        {pageData?.sections?.[4] && <Pay10WPSFeature data={pageData.sections[4]} />}

      </div>
    </main>
  );
};

export default Pay10CardClient;
