"use client";

import React from 'react';
import Style from "./page.module.scss";
import ConsumerFeatureSection from "@/app/components/ui/product/ConsumerFeatureSection";
import InteractiveGlobe from "@/app/components/ui/3d/InteractiveGlobe";
import { isEmptyHtml } from "@/app/lib/sanitizeHtml";

const firstNonEmptyHtml = (...vals) => vals.find(v => !isEmptyHtml(v)) ?? vals[vals.length - 1];

const SendAbroadClient = ({ pageData = null }) => {
  const countriesContent = (
    <div className={Style.countries_box}>
      <h4 className={Style.countries_heading}>7 countries Live</h4>
      <div className={Style.flag_row}>
        <div className={Style.flag_box}>🇮🇳</div>
        <div className={Style.flag_box}>🇵🇭</div>
        <div className={Style.flag_box}>🇵🇰</div>
        <div className={Style.flag_box}>🇧🇩</div>
        <div className={Style.flag_box}>🇳🇵</div>
        <div className={Style.flag_box}>🇱🇰</div>
        <div className={Style.flag_box}>🇪🇬</div>
      </div>

      <h4 className={Style.countries_heading} style={{ marginTop: '24px' }}>Coming soon - 8 more</h4>
      <div className={Style.flag_row}>
        <div className={Style.flag_box}>🇯🇴</div>
        <div className={Style.flag_box}>🇲🇦</div>
        <div className={Style.flag_box}>🇰🇪</div>
        <div className={Style.flag_box}>🇹🇿</div>
        <div className={Style.flag_box}>🇬🇭</div>
        <div className={Style.flag_box}>🇸🇾</div>
        <div className={Style.flag_box}>🇪🇹</div>
        <div className={Style.flag_box}>🇮🇩</div>
      </div>

      {pageData?.sections?.[3]?.content && pageData.sections[3].content !== '<p><br></p>' ? (
        <div className={Style.countries_para} dangerouslySetInnerHTML={{ __html: pageData.sections[3].content }} />
      ) : (
        <p className={Style.countries_para}>
          140+ countries are expanding. Pay10 Send Abroad is built to reach every corner of the world - because the UAE's 9M+ expatriates come from everywhere. If your country isn't live yet, it's on its way. Download Pay10 and be the first to send when your corridor opens.
        </p>
      )}
    </div>
  );

  return (
    <main>
      <section 
        className={Style.send_hero}
        style={{
          '--desktop-bg': pageData?.banner_image ? `url(${pageData.banner_image})` : undefined,
          '--mobile-bg': pageData?.mobile_image ? `url(${pageData.mobile_image})` : (pageData?.banner_image ? `url(${pageData.banner_image})` : undefined)
        }}
      >
        <div className={Style.send_hero_text}>
          <h2 dangerouslySetInnerHTML={{ __html: firstNonEmptyHtml(pageData?.page_title, "Your family shouldn't wait <br /> for their money.") }} />
          <p dangerouslySetInnerHTML={{ __html: firstNonEmptyHtml(pageData?.page_subtitle, pageData?.page_description, "With Pay10 UAE Send Abroad, your transfer reaches your loved ones the same day - instantly. No days of waiting. No beneficiary delays. Just send, and it's there.") }} />
        </div>
      </section>

      <div className={Style.bg_circle_wrapper}>
        
        {/* Section 0: Stats Strip */}
        <section className={Style.stats_strip}>
          <div className={Style.stats_grid}>
            {pageData?.sections?.[0]?.cards?.map((card, idx) => (
              <div className={Style.stat_card} key={idx}>
                <h3>{card.title}</h3>
                <p>{card.subtitle || card.description}</p>
              </div>
            )) || (
              <>
                <div className={Style.stat_card}>
                  <h3>7</h3>
                  <p>Countries live now</p>
                </div>
                <div className={Style.stat_card}>
                  <h3>+8</h3>
                  <p>Countries coming soon</p>
                </div>
                <div className={Style.stat_card}>
                  <h3>140+</h3>
                  <p>Countries expanding to</p>
                </div>
                <div className={Style.stat_card}>
                  <h3>Instant</h3>
                  <p>Same-day every transfer</p>
                </div>
              </>
            )}
          </div>
        </section>

        {/* Section 1: Instant Feature */}
        <div className={Style.grey_subtitle_wrap}>
          <ConsumerFeatureSection
            heading={pageData?.sections?.[1]?.title || "Instant. Same day.<br />No waiting. No excuses."}
            subheading={pageData?.sections?.[1]?.subtitle || "Every other way to send money abroad asks you to wait - to add a beneficiary, wait for approval, then wait again for the money to arrive. Pay10 UAE Send Abroad doesn't. When you Send Abroad with Pay10, your transfer moves the moment you confirm it."}
            imageSrc={pageData?.sections?.[1]?.images?.[0] || "/images/prod_imports/send-instant-bubble.png"}
            imageAlt={pageData?.sections?.[1]?.title || "Instant Money Transfer"}
            isReversed={false}
            isGreyBg={false}
            isTransparent={true}
          />
        </div>

        {/* Section 2: Steps */}
        <section className={Style.steps_section}>
          <div className={Style.steps_header} data-animation="opacity-up">
            <h2>{pageData?.sections?.[2]?.title || "Four steps. One tap. Money sent."}</h2>
            <p>{pageData?.sections?.[2]?.subtitle || "Send Abroad is built for the pace of UAE life - fast, secure, and done before you finish your coffee"}</p>
          </div>
          <div className={Style.steps_container}>
            <div className={Style.steps_left} data-animation="opacity-up">
              <InteractiveGlobe />
            </div>

            <div className={Style.steps_right}>
              {pageData?.sections?.[2]?.cards?.map((card, idx) => (
                <div className={Style.step_card} data-animation="opacity-up" data-anim-delay={`${(idx + 1) * 100}`} key={idx}>
                  <span className={Style.step_number}>Step {idx + 1}</span>
                  <h3>{card.title}</h3>
                  <p>{card.subtitle || card.description}</p>
                </div>
              )) || (
                <>
                  <div className={Style.step_card} data-animation="opacity-up" data-anim-delay="100">
                    <span className={Style.step_number}>Step 1</span>
                    <h3>Open your Pay10 UAE</h3>
                    <p>Select Send Abroad Feature</p>
                  </div>
                  <div className={Style.step_card} data-animation="opacity-up" data-anim-delay="200">
                    <span className={Style.step_number}>Step 2</span>
                    <h3>Select country</h3>
                    <p>Choose from your available Send Abroad destinations - based on your home country.</p>
                  </div>
                  <div className={Style.step_card} data-animation="opacity-up" data-anim-delay="300">
                    <span className={Style.step_number}>Step 3</span>
                    <h3>Enter amount & recipient</h3>
                    <p>Enter how much to send and your recipient's details. No waiting for approvals.</p>
                  </div>
                  <div className={Style.step_card} data-animation="opacity-up" data-anim-delay="400">
                    <span className={Style.step_number}>Step 4</span>
                    <h3>Sent. Instantly.</h3>
                    <p>Confirm and it's done. Your loved one receives their money the same day.</p>
                  </div>
                </>
              )}
            </div>
          </div>
        </section>

        {/* Section 3: Countries Feature */}
        <div className={Style.grey_subtitle_wrap}>
          <ConsumerFeatureSection
            heading={pageData?.sections?.[3]?.title || "Where can you Send Abroad today?"}
            subheading={pageData?.sections?.[3]?.subtitle || "Pay10 UAE Send Abroad is live, growing fast, and on its way to 140+ countries. Check where you can send right now - and where we're headed next."}
            extraContent={
              <>
                {countriesContent}
              </>
            }
            imageSrc={pageData?.sections?.[3]?.images?.[0] || "/images/prod_imports/send-where-bubble.png"}
            imageAlt={pageData?.sections?.[3]?.title || "Countries"}
            isReversed={true}
            isGreyBg={false}
            isTransparent={true}
          />
        </div>
        
        <section className={Style.download_cta}>
          <div data-animation="opacity-up">
            <h3>Get the App Now</h3>
          </div>

          <div className={Style.apps_container} data-animation="opacity-up" data-anim-delay="100">
            <div className={Style.app_type}>
              <h4>Consumer App</h4>
              <div className={Style.store_buttons}>
                <a href="https://apps.apple.com/us/app/pay10-bahrain/id6758339638" target="_blank" rel="noopener noreferrer">
                  <img src="/images/foo-app1.svg?v=3" alt="Download Consumer App on the App Store" />
                </a>
                <a href="https://play.google.com/store/apps/details?id=bh.payten.wallet.app&hl=en" target="_blank" rel="noopener noreferrer">
                  <img src="/images/foo-app2.svg?v=3" alt="Get Consumer App on Google Play" />
                </a>
              </div>
            </div>

            <div className={Style.app_type}>
              <h4>Merchant App</h4>
              <div className={Style.store_buttons}>
                <a href="#" target="_blank" rel="noopener noreferrer">
                  <img src="/images/foo-app1.svg?v=3" alt="Download Merchant App on the App Store" />
                </a>
                <a href="#" target="_blank" rel="noopener noreferrer">
                  <img src="/images/foo-app2.svg?v=3" alt="Get Merchant App on Google Play" />
                </a>
              </div>
            </div>
          </div>
        </section>

      </div>

    </main>
  );
};

export default SendAbroadClient;
