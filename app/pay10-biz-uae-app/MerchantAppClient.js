"use client";

import Style from "./page.module.scss";
import Image from "next/image";
import { Icon } from "@iconify/react";
import MerchantTestimonialVideos from "../components/ui/MerchantTestimonialVideos";
import MerchantLogosCTA from "../components/ui/MerchantLogosCTA";
import BizLeadForm from "./BizLeadForm";
import { isEmptyHtml } from "../lib/sanitizeHtml";

const firstNonEmptyHtml = (...vals) => vals.find(v => !isEmptyHtml(v)) ?? vals[vals.length - 1];

// Sections are matched by title keyword rather than array position — CMS
// section order isn't guaranteed, and deleting one section shifts every
// following index, which used to make unrelated sections swap content.
const findSection = (sections, keyword) =>
  sections?.find((s) => (s.title || '').toLowerCase().includes(keyword));

const MerchantAppClient = ({ pageData = null, testimonialVideos = [], merchantLogos = [] }) => {
  // Once the CMS is actually connected (has sections at all), a section
  // missing from it means it was deliberately deleted — hide it rather than
  // falling back to placeholder copy. Before the CMS has any data yet
  // (pageData/sections empty), show every section with its hardcoded default.
  const hasCmsData = !!pageData?.sections?.length;

  const scaleSection = findSection(pageData?.sections, 'every merchant');
  const benefitsSection = findSection(pageData?.sections, 'merchants get');
  const supportSection = findSection(pageData?.sections, 'human support');
  const commandSection = findSection(pageData?.sections, 'run your payments');
  const stepsSection = findSection(pageData?.sections, 'simple steps');
  const finalCtaSection = findSection(pageData?.sections, 'smarter way');

  const showScale = !hasCmsData || !!scaleSection;
  const showBenefits = !hasCmsData || !!benefitsSection;
  const showSupport = !hasCmsData || !!supportSection;
  const showCommand = !hasCmsData || !!commandSection;
  const showSteps = !hasCmsData || !!stepsSection;
  // Final CTA section always renders — it hosts the lead-gen contact form,
  // not just CMS copy, so it shouldn't disappear if the CMS section is empty.

  const scaleCards = scaleSection?.cards?.map((c, i) => {
    const cleanDesc = (c.description || c.content || "").replace(/<[^>]*>?/gm, '').trim();
    return {
      num: `0${i + 1}`,
      title: c.title,
      sub: c.subtitle || null,
      desc: cleanDesc,
    };
  }) || [
    {
      num: '01',
      title: 'Micro Merchant',
      sub: 'Starting out or going solo',
      desc: 'Single location, lower transaction volumes. Pay10 gives micro merchants the same tools and rates that only big players used to get.',
    },
    {
      num: '02',
      title: 'Growing businesses',
      sub: null,
      desc: 'Multi-cashier, real-time reporting, instant settlement. Everything an SME needs to manage payments and cash flow without a finance team.',
    },
    {
      num: '03',
      title: 'Multi-location. Complex operations.',
      sub: null,
      desc: 'Fleet management, hierarchy controls, analytics at scale. Pay10 handles enterprise payment infrastructure across locations, teams, and transaction volumes.',
    },
  ];

  const benefitIcons = [
    <svg key={0} width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/></svg>,
    <svg key={1} width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/></svg>,
    <svg key={2} width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 2l7 4v6c0 4.5-3 8.5-7 10-4-1.5-7-5.5-7-10V6l7-4z"/><path d="M9 12l2 2 4-4"/></svg>,
    <svg key={3} width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><path d="M9 22V12h6v10"/></svg>
  ];

  const renderIcon = (cmsIcon, fallback) => {
    if (typeof cmsIcon !== 'string' || !cmsIcon.trim()) return fallback;
    return /^(https?:)?\//.test(cmsIcon)
      ? <img src={cmsIcon} alt="" width={28} height={28} />
      : <Icon icon={cmsIcon} width={28} />;
  };

  const benefitsCards = benefitsSection?.cards?.map((c, i) => ({
    num: `0${i + 1}`,
    icon: renderIcon(c.icon, benefitIcons[i % benefitIcons.length]),
    title: c.title,
    sub: c.subtitle,
    desc: (c.description || c.content || "").replace(/<[^>]*>?/gm, '').trim(),
  })) || [
    {
      num: '01',
      icon: benefitIcons[0],
      title: 'Lowest MDR in the UAE market',
      sub: 'Keep more of every dirham you earn.',
      desc: 'Pay10 offers the lowest Merchant Discount Rate in the UAE market, so your transaction fees stop eating into your margins. Every sale, every day, you keep more.',
    },
    {
      num: '02',
      icon: benefitIcons[1],
      title: 'Same-day instant settlement',
      sub: 'Your money on the day you earn it, not days later.',
      desc: 'Pay10 is the first to offer instant same-day settlement to all merchants, micro to enterprise. Your working capital is available the same day. No T+1. No T+2. Never.',
    },
    {
      num: '03',
      icon: benefitIcons[2],
      title: 'Complete security, no hidden fees',
      sub: 'What you see is what you pay. Always.',
      desc: 'Full transaction visibility, zero hidden charges, and PCI DSS Level 1 certified security across every payment. You know exactly what\'s happening with your money at all times.',
    },
    {
      num: '04',
      icon: benefitIcons[3],
      title: 'Licensed by the Central Bank of the UAE',
      sub: 'Your business deserves a regulated partner.',
      desc: 'Pay10 holds four CBUAE licences: SVF, RPS-II, Open Finance, and Category 4 Remittance. You\'re not just using a business payments app. You\'re working with a fully regulated financial institution.',
    },
  ];

  const commandCards = commandSection?.cards?.map((c, i) => ({
    num: `0${i + 1}`,
    title: c.title,
    desc: c.subtitle || (c.description || c.content || "").replace(/<[^>]*>?/gm, '').trim(),
  })) || [
    { num: '01', title: 'Transaction data live', desc: 'See every transaction in real time, every amount, every method, every status, cashier. Full history, always accessible.' },
    { num: '02', title: 'Balance visibility', desc: 'See your settled and unsettled balance at a glance. Know your cash flow position before you need it.' },
    { num: '03', title: 'Refunds', desc: 'Process refunds directly from the app. Fast, clean, no paperwork, no calls to the bank.' },
    { num: '04', title: 'Link / unlink DQR devices', desc: 'Connect or disconnect your DQR POS machine directly from the app. Full device control in your hands.' },
  ];

  const stepsCards = stepsSection?.cards?.map((c, i) => ({
    num: `0${i + 1}`,
    title: c.title,
    desc: c.subtitle || (c.description || c.content || "").replace(/<[^>]*>?/gm, '').trim(),
  })) || [
    { num: '01', title: 'Contact our team', desc: 'SME or Enterprise, email the right team and we respond fast.' },
    { num: '02', title: 'Business registration', desc: 'Our team onboards your business onto the Pay10 platform.' },
    { num: '03', title: 'Receive credentials', desc: 'Your Pay10 Biz UAE login credentials are sent to you.' },
    { num: '04', title: 'DQR device delivered', desc: 'Your DQR POS machine is delivered and installed at your premises by our team.' },
    { num: '05', title: 'Start accepting', desc: 'Login, link your device, and start accepting payments instantly.' },
  ];

  return (
    <main>
      <section
        className={Style.biz_hero}
        style={{
          '--bg-desktop': pageData?.banner_image ? `url(${pageData.banner_image})` : 'none',
          '--bg-mobile': pageData?.mobile_image ? `url(${pageData.mobile_image})` : undefined,
        }}
      >
        <div className={Style.biz_hero_text}>
          <h2 dangerouslySetInnerHTML={{ __html: firstNonEmptyHtml(pageData?.page_title, "Every dirham you earn, <br />settled today.") }} />
          <p dangerouslySetInnerHTML={{ __html: firstNonEmptyHtml(pageData?.page_subtitle, pageData?.page_description, "Pay10 UAE Biz App is built for every merchant in the UAE: micro, SME, and enterprise. Lowest transaction fees. Same-day settlement. 24/7 multi-language, human support. Licensed by the Central Bank of the UAE.") }} />
        </div>
      </section>

      {showScale && (
      <section className={Style.merchant_scale}>
        <div className={Style.merchant_scale_header}>
          <h2>{scaleSection?.title || "Built for every merchant, from first sale to full scale."}</h2>
          <p>{scaleSection?.subtitle || "Whether you're a solo trader, a growing SME, or a multi-location enterprise Pay10 UAE Biz App levels the playing field. The same powerful platform. The same unbeatable rates. For everyone."}</p>
        </div>
        <div className={Style.merchant_scale_cards}>
          {scaleCards.map((card) => (
            <div key={card.num} className={Style.merchant_scale_card}>
              <span className={Style.card_num}>{card.num}</span>
              <h3>{card.title}</h3>
              {card.sub && <p className={Style.card_sub}>{card.sub}</p>}
              <p className={Style.card_desc}>{card.desc}</p>
            </div>
          ))}
        </div>
      </section>
      )}

      {showBenefits && (
      <section className={Style.biz_benefits}>
        <div className={Style.benefits_left}>
          <h2>{benefitsSection?.title || "What Pay10 merchants get that others don't."}</h2>
          <p>{benefitsSection?.subtitle || "Five benefits that change how you run your business and why merchants across the UAE are switching to Pay10."}</p>
        </div>
        <div className={Style.benefits_grid}>
          {benefitsCards.map((item) => (
            <div key={item.num} className={Style.benefit_card}>
              <span className={Style.benefit_num}>{item.num}</span>
              <div className={Style.benefit_icon}>{item.icon}</div>
              <h3>{item.title}</h3>
              <p className={Style.benefit_sub}>{item.sub}</p>
              <p className={Style.benefit_desc}>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
      )}

      {showSupport && (
      <section className={Style.biz_support}>
        <div className={Style.support_left}>
          <h2>{supportSection?.title || "24/7 human support · multi-language · zero wait time"}</h2>
          <p className={Style.support_sub}>{supportSection?.subtitle || "Call. A human picks up. Every time."}</p>
          <div className={Style.support_desc}>
            {!isEmptyHtml(supportSection?.content)
              ? <div dangerouslySetInnerHTML={{ __html: supportSection.content }} />
              : <p>In a world of bots and long waits, Pay10 is different. Human support, available 24 hours a day, 7 days a week, 365 days a year, in multiple languages. For every merchant, regardless of size. Call and your call will be picked up. No queues. No bots. No waiting.</p>
            }
          </div>
        </div>
        <div className={Style.support_visual}>
          <div className={Style.circle_outer}>
            <img src={supportSection?.images?.[1] || "/images/support-avatar-1.jpg"} alt="support agent" className={Style.floating_avatar_1} />
            <div className={Style.circle_mid}>
              <img src={supportSection?.images?.[2] || "/images/support-avatar-2.jpg"} alt="support agent" className={Style.floating_avatar_2} />
              <img src={supportSection?.images?.[3] || "/images/support-avatar-3.jpg"} alt="support agent" className={Style.floating_avatar_3} />
              <div className={Style.circle_inner}>
                <Image src={supportSection?.images?.[0] || "/images/prod_imports/customer-executive.jpg"} alt="Pay10 support" width={200} height={200} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} />
              </div>
            </div>
          </div>
        </div>
      </section>
      )}

      {showCommand && (
      <section className={Style.biz_command}>
        <h2 className={Style.command_heading}>{commandSection?.title || "Everything you need to run your payments, in one app."}</h2>
        <div className={Style.command_body}>
          <div className={Style.command_phones}>
            <Image src={commandSection?.images?.[0] || "/images/prod_imports/biz-home-screen.png"} alt="Pay10 Biz App Home" width={280} height={560} className={Style.phone_img_back} />
            <Image src={commandSection?.images?.[1] || "/images/prod_imports/biz-transaction-history.png"} alt="Pay10 Biz App Transactions" width={280} height={560} className={Style.phone_img_front} />
          </div>
          <div className={Style.command_right}>
            <p className={Style.command_desc}>{commandSection?.subtitle || "The Pay10 Biz UAE is your merchant command centre linked directly to your DQR device, giving you real-time visibility and full control from your phone."}</p>
            <div className={Style.command_features}>
              {commandCards.map((f) => (
                <div key={f.num} className={Style.command_feature}>
                  <p className={Style.feature_title}>{f.title}</p>
                  <p className={Style.feature_desc}>{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      )}

      {showSteps && (
      <section className={Style.biz_steps}>
        <div className={Style.steps_header}>
          <h2 className={Style.steps_heading}>{stepsSection?.title || "Up and running in 5 simple steps."}</h2>
          <p className={Style.steps_sub}>{stepsSection?.subtitle || "Getting Pay10 Business Solutions: POS DQR Devices, Pay10 Biz UAE and much more, at your premises is straightforward. Our team handles the heavy lifting. You focus on your business."}</p>
        </div>
        <div className={Style.steps_row}>
          {stepsCards.map((step) => (
            <div key={step.num} className={Style.step_item}>
              <div className={Style.step_num_wrap}>
                <span className={Style.step_num}>{step.num}</span>
              </div>
              <h3 className={Style.step_title}>{step.title}</h3>
              <p className={Style.step_desc}>{step.desc}</p>
            </div>
          ))}
        </div>
      </section>
      )}

      <MerchantTestimonialVideos
        title="Don't take our word for it. Hear it from the merchants themselves."
        content="<p>From small retailers to enterprise brands, businesses across the UAE are choosing Pay10 for faster settlements, lower costs, and support that actually shows up.</p>"
        videos={testimonialVideos}
      />
      <MerchantLogosCTA showCta={false} images={merchantLogos} />

      <section className={Style.biz_final_cta}>
        <h2 className={Style.cta_heading} dangerouslySetInnerHTML={{ __html: finalCtaSection?.title || "Ready to accept payments<br />the smarter way?" }} />
        {(() => {
          // An empty CMS subtitle means "intentionally removed" — don't fall
          // back to the hardcoded default in that case, only when the field
          // is missing entirely (e.g. pageData hasn't loaded).
          const ctaSubtitle = finalCtaSection?.subtitle ?? "Lowest MDRs. Same-day settlement. 24/7 human support. CBUAE licensed. Everything your business deserves, and nothing you don't need.";
          return ctaSubtitle && <p className={Style.cta_sub}>{ctaSubtitle}</p>;
        })()}
        <BizLeadForm />
      </section>

      <section className={Style.biz_app_download}>
        <h2 className={Style.app_download_heading}>Merchant App</h2>
        <div className={Style.app_download_badges}>
          <a
            href="https://apps.apple.com/us/app/pay10-biz-bahrain/id6758454998"
            target="_blank"
            rel="noopener noreferrer"
            className={Style.app_qr_card}
          >
            <Image src="/images/prod_imports/biz-app-store-qr.png" alt="Scan to download on the App Store" width={140} height={140} />
            <div>
              <Icon icon="ic:baseline-apple" width={20} />
              <span>Download on the App Store</span>
            </div>
          </a>
          <a
            href="https://play.google.com/store/apps/details?id=bh.pay10.merchant.app"
            target="_blank"
            rel="noopener noreferrer"
            className={Style.app_qr_card}
          >
            <Image src="/images/prod_imports/biz-play-store-qr.png" alt="Scan to get it on Google Play" width={140} height={140} />
            <div>
              <Icon icon="logos:google-play-icon" width={18} />
              <span>Get it on Google Play</span>
            </div>
          </a>
        </div>
      </section>
    </main>
  );
};

export default MerchantAppClient;
