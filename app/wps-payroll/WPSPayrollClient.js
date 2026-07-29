"use client";

import React from "react";
import Link from 'next/link';
import Image from 'next/image';
import styles from "./wps.module.scss";
import { Icon } from "@iconify/react";
import ConsumerFeatureSection from "@/app/components/ui/product/ConsumerFeatureSection";
import { isEmptyHtml } from "@/app/lib/sanitizeHtml";

// CMS "icon" field can be an uploaded image (URL/path) or an iconify name.
const renderIcon = (cmsIcon, className) => {
  if (typeof cmsIcon !== 'string' || !cmsIcon.trim()) return null;
  return /^(https?:)?\//.test(cmsIcon)
    ? <img src={cmsIcon} alt="" width={28} height={28} className={className} />
    : <Icon icon={cmsIcon} width={28} className={className} />;
};

const WPSPayrollClient = ({ pageData = null }) => {

  // ConsumerFeatureSection 1
  const rawSubHeading1 = pageData?.sections?.[0]?.description || pageData?.sections?.[0]?.content || "";
  const parts1 = rawSubHeading1.split('---');
  const subHeadingText1 = parts1[0]?.replace(/<[^>]*>?/gm, '')?.trim() || "The Wage Protection System (WPS) is a UAE government mandate managed by the Central Bank of Bahrain (CBB). It requires every employer in the UAE: across all industries, for all workers, blue collar and white collar: to process salaries digitally through a CBB-licensed provider. The system verifies that every employee is paid what their labour contract says, and that they are paid on time. Non-compliance carries significant penalties. Pay10 is a fully licensed WPS provider: meaning every salary processed through Pay10 satisfies this mandate completely.";
  const tagsText1 = parts1[1] || pageData?.sections?.[0]?.cards?.[0]?.tags;
  const points1 = tagsText1 ? tagsText1.split(',').map(t => t.trim().replace(/<[^>]*>?/gm, '')).filter(Boolean) : [];

  // ConsumerFeatureSection 2
  const rawSubHeading2 = pageData?.sections?.[6]?.description || pageData?.sections?.[6]?.content || "";
  const parts2 = rawSubHeading2.split('---');
  const subHeadingText2 = parts2[0]?.replace(/<[^>]*>?/gm, '')?.trim() || "Our end-to-end WPS solution is built to make switching effortless.";
  const tagsText2 = parts2[1] || pageData?.sections?.[6]?.cards?.[0]?.tags;
  const points2 = tagsText2 ? tagsText2.split(',').map(t => t.trim().replace(/<[^>]*>?/gm, '')).filter(Boolean) : [
    "Smooth migration for existing payroll cards: no disruption to employees",
    "Seamless salary disbursement from day one",
    "Full regulatory compliance with the new CBB WPS framework",
    "Reduced administrative effort for HR and payroll teams",
    "Digital access for all employees via Pay10 UAE",
    "Transparent fee structure and simplified onboarding process"
  ];

  // Who is this for? (Section 1)
  const getCardDetails = (c, def) => {
    if (!c) return def;
    const rawDesc = c.description || c.content || "";
    const parts = rawDesc.split('---');
    return {
      title: c.title || def.title,
      description: !isEmptyHtml(parts[0]) ? parts[0].trim() : def.description,
      tags: parts[1] || c.tags || def.tags
    };
  };

  const employersCard = getCardDetails(pageData?.sections?.[1]?.cards?.[0], {
    title: 'For employers',
    description: 'One WPS solution for all your payroll needs. From SMEs with 10 staff to enterprises with thousands: Pay10 handles it all, compliantly.',
    tags: 'Fully CBB-licensed WPS salary disbursement, Upload SIF file: Pay10 processes instantly, IBAN transfers for banked employees, Universal Account setup for unbanked workers, Analytics dashboard: full payroll visibility, Reduced admin effort and paperwork, Transparent fee structure: no surprises, Smooth migration from existing payroll cards, Full regulatory compliance with new CBB WPS framework'
  });
  const employeesCard = getCardDetails(pageData?.sections?.[1]?.cards?.[1], {
    title: 'For employees',
    description: 'A universal account and everything they need to use it. Banked or unbanked: every employee gets full access to their salary digitally.',
    tags: 'Universal Account: works for banked and unbanked workers, Jaywan card: ATM withdrawals, POS purchases, digital transactions, Pay10 UAE: full digital access to salary and account, Scan and pay at merchants across all 7 Emirates, Send money internationally to family back home, Pay bills: utilities, telecom, transport, gift cards, Card management in-app: limits, freeze, cancel, IBAN transfers: send to any UAE bank account'
  });

  // Benefits (Section 2)
  const benefitIcons = [
    <Icon key={0} icon="mdi:bank-outline" width={28} />,
    <Icon key={1} icon="mdi:bank-transfer" width={28} />,
    <Icon key={2} icon="mdi:credit-card" width={28} />,
    <Icon key={3} icon="mdi:cellphone-check" width={28} />
  ];
  const benefits = pageData?.sections?.[2]?.cards?.map((c, i) => ({
    num: `0${i + 1}`,
    title: c.title,
    desc: (c.description || c.content || "").replace(/<[^>]*>?/gm, '').trim(),
    icon: benefitIcons[i % benefitIcons.length]
  })) || [
    { num: '01', icon: benefitIcons[0], title: 'Fully CBB licensed', desc: 'CBB-licensed WPS provider enabling secure, compliant, and fully digital salary processing: aligned with the new WPS framework.' },
    { num: '02', icon: benefitIcons[1], title: 'Secure salary transfers', desc: 'IBAN-based transfers for banked employees. Universal Account for unbanked and blue-collar workers: safe, instant, every salary run.' },
    { num: '03', icon: benefitIcons[2], title: 'Jaywan card services', desc: 'Jaywan card issued to every unbanked employee: linked to their Universal Account for ATM withdrawals, POS purchases, and digital payments.' },
    { num: '04', icon: benefitIcons[3], title: 'Pay10 UAE', desc: 'Full digital access for blue-collar employees to their Universal Account: view balance, pay bills, scan and pay, send money, manage their card.' },
  ];

  // Pills above the benefits grid — reuses section[2].content as a plain
  // comma-separated label list (no CMS field exists for icons, so those
  // stay a fixed cycling set matched by position to whatever labels come in).
  const pillIcons = ['mdi:shield-check-outline', 'mdi:credit-card-outline', 'mdi:cellphone', 'mdi:headset'];
  const rawPillText = pageData?.sections?.[2]?.content || pageData?.sections?.[2]?.description || "";
  const pillLabels = rawPillText.replace(/<[^>]*>?/gm, '').split(',').map(t => t.trim()).filter(Boolean);

  // Banked vs Unbanked (Section 3)
  const bankedCard = getCardDetails(pageData?.sections?.[3]?.cards?.[0], {
    title: 'Banked employees',
    description: 'Salary straight to their existing bank account. White-collar, salaried, already banked: Pay10 handles WPS compliance without changing how they receive their salary.',
    tags: 'Salary transferred directly to their existing UAE IBAN, No new account needed: seamless for the employee, WPS compliance handled entirely by Pay10, Optional Pay10 UAE for additional financial features, Employer\'s WPS obligation fully satisfied'
  });
  const unbankedCard = getCardDetails(pageData?.sections?.[3]?.cards?.[1], {
    title: 'Unbanked employees',
    description: 'A named IBAN, a Jaywan card, and a full financial life. Blue-collar, sub-5K AED workers often invisible to the banking system. Pay10 changes that permanently.',
    tags: 'Named Pay10 IBAN Universal Account, theirs forever, Jaywan debit card: ATM, POS, online transactions, Pay10 UAE: balance, transfers, scan and pay, Send money home: international transfers in app, Pay bills: utilities, telecom, transport, gift cards, No more anonymous salary cards with no name attached'
  });

  // Steps (Section 4)
  const steps = pageData?.sections?.[4]?.cards?.map((c, i) => ({
    num: `0${i + 1}`,
    title: c.title,
    desc: (c.description || c.content || "").replace(/<[^>]*>?/gm, '').trim(),
    icon: c.icon
  })) || [
    { num: '01', title: 'Registration', desc: 'Employers submit onboarding documents and employee data to Pay10.' },
    { num: '02', title: 'Account creation', desc: 'Universal Accounts are set up for unbanked employees by the Pay10 team.' },
    { num: '03', title: 'Card issuance', desc: 'Jaywan cards are issued to unbanked employees and linked to their Universal Account.' },
    { num: '04', title: 'App activation', desc: 'Employees download the Pay10 UAE to access their account, view balance, and manage transactions.' },
    { num: '05', title: 'First salary run', desc: 'The employer uploads the SIF file and transfers funds. Pay10 processes the salary instantly.' },
    { num: '06', title: 'Ongoing management', desc: 'Employers manage payroll through the analytics dashboard with full visibility and 24/7 support.' }
  ];

  // Comparison table (Section 5) — each card is "Traditional text --- Pay10
  // text". Pay10's column is always a check (true for all rows today), so
  // only the traditional side needs a status marker: a leading "✕" renders
  // a cross icon, a leading "✓" a check icon, no marker renders plain text.
  const parseComparisonStatus = (raw) => {
    if (raw.startsWith('✕')) return { type: 'cross', text: raw.slice(1).trim() };
    if (raw.startsWith('✓')) return { type: 'check', text: raw.slice(1).trim() };
    return { type: 'text', text: raw };
  };
  const comparisonRows = (pageData?.sections?.[5]?.cards || []).map((c) => {
    const raw = c.description || c.content || "";
    const parts = raw.replace(/<[^>]*>?/gm, '').split('---');
    return {
      feature: c.title,
      trad: parseComparisonStatus((parts[0] || "").trim()),
      pay10: { type: 'check', text: (parts[1] || "").trim() }
    };
  });

  return (
    <main className={styles.wps}>
      {/* Hero Banner Section */}
      <section className={styles.altareq_section}>
        <div
          className={styles.altareq_hero}
          style={{
            ...(pageData?.banner_image ? { '--bg-desktop': `url(${pageData.banner_image})` } : {}),
            ...(pageData?.mobile_image ? { '--bg-mobile': `url(${pageData.mobile_image})` } : {}),
          }}
        >
          <div className={styles.altareq_hero_content}>
            <h1 dangerouslySetInnerHTML={{ __html: pageData?.page_title || "UAE's seamless solution<br />for salary compliance." }} />
            <p dangerouslySetInnerHTML={{ __html: pageData?.page_description || "Pay all your employees' salaries digitally: compliant, scalable, and fully powered by Pay10. A CBB-licensed WPS provider built for every type of UAE employer and every type of UAE employee." }} />
          </div>
        </div>
      </section>

      <ConsumerFeatureSection
          heading={pageData?.sections?.[0]?.title || "What is the Wage Protection System (WPS)?"}
          subheading={<span className={styles.grey_text}>{subHeadingText1}</span>}
          points={points1}
          imageSrc={pageData?.sections?.[0]?.images?.[0] || "/images/prod_imports/wps-labor-bubble.png"}
          imageAlt="Wage Protection System"
          isReversed={false}
          isGreyBg={true}
        />

      <section className={styles.who_is_for_section}>
        <div className={styles.who_container}>
          <h2 className={styles.section_title} dangerouslySetInnerHTML={{ __html: pageData?.sections?.[1]?.title || "Who is This For?" }} />
          
          <div className={styles.who_grid}>
            {/* Employers Column */}
            <div className={styles.who_col}>
              <h3>{employersCard.title}</h3>
              <p dangerouslySetInnerHTML={{ __html: employersCard.description || employersCard.content }} />
              <ul className={styles.feature_list}>
                {(employersCard.tags || "").split(',').map((t, idx) => (
                  <li key={idx}><Icon icon="mdi:check" className={styles.list_icon} /> {t.trim().replace(/<[^>]*>?/gm, '')}</li>
                ))}
              </ul>
            </div>

            {/* Employees Column */}
            <div className={styles.who_col}>
              <h3>{employeesCard.title}</h3>
              <p dangerouslySetInnerHTML={{ __html: employeesCard.description || employeesCard.content }} />
              <ul className={styles.feature_list}>
                {(employeesCard.tags || "").split(',').map((t, idx) => (
                  <li key={idx}><Icon icon="mdi:check" className={styles.list_icon} /> {t.trim().replace(/<[^>]*>?/gm, '')}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.biz_benefits}>
        <div className={styles.benefits_left}>
          <h2 dangerouslySetInnerHTML={{ __html: pageData?.sections?.[2]?.title || "What Pay10 WPS offers" }} />
          <div className={styles.pill_group}>
            {pillLabels.map((label, i) => (
              <span key={i} className={styles.pill_gradient}>
                <Icon icon={pillIcons[i % pillIcons.length]} className={styles.pill_icon} /> {label}
              </span>
            ))}
          </div>
        </div>
        <div className={styles.benefits_grid}>
          {benefits.map((item) => (
            <div key={item.num} className={styles.benefit_card}>
              <span className={styles.benefit_num}>{item.num}</span>
              <div className={styles.benefit_icon}>{item.icon}</div>
              <h3>{item.title}</h3>
              <p className={styles.benefit_desc}>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.who_is_for_section}>
        <div className={styles.who_container}>
          <h2 className={styles.section_title} dangerouslySetInnerHTML={{ __html: pageData?.sections?.[3]?.title || "Banked vs Unbanked Worker Journeys" }} />
          
          <div className={styles.who_grid}>
            {/* Banked Employees Column */}
            <div className={styles.who_col}>
              <h3>{bankedCard.title}</h3>
              <p dangerouslySetInnerHTML={{ __html: bankedCard.description || bankedCard.content }} />
              <ul className={styles.feature_list}>
                {(bankedCard.tags || "").split(',').map((t, idx) => (
                  <li key={idx}><Icon icon="mdi:check" className={styles.list_icon} /> {t.trim().replace(/<[^>]*>?/gm, '')}</li>
                ))}
              </ul>
            </div>

            {/* Unbanked Employees Column */}
            <div className={styles.who_col}>
              <h3>{unbankedCard.title}</h3>
              <p dangerouslySetInnerHTML={{ __html: unbankedCard.description || unbankedCard.content }} />
              <ul className={styles.feature_list}>
                {(unbankedCard.tags || "").split(',').map((t, idx) => (
                  <li key={idx}><Icon icon="mdi:check" className={styles.list_icon} /> {t.trim().replace(/<[^>]*>?/gm, '')}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.steps_section}>
        <svg width="0" height="0" style={{ position: 'absolute' }}>
          <linearGradient id="pay10_grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--yellow)" />
            <stop offset="100%" stopColor="var(--red)" />
          </linearGradient>
        </svg>
        <div className={styles.steps_container}>
          <div className={styles.steps_header}>
            <h2 dangerouslySetInnerHTML={{ __html: pageData?.sections?.[4]?.title || "Getting started: 6 simple steps" }} />
            <p dangerouslySetInnerHTML={{ __html: pageData?.sections?.[4]?.subtitle || "Simple onboarding. Faster than you think." }} />
          </div>
          
          <div className={styles.steps_grid}>
            {steps.map((step, index) => (
              <div key={index} className={styles.step_card}>
                <div className={styles.step_icon_wrapper}>
                  {renderIcon(step.icon, styles.step_icon)}
                </div>
                <h3><span>{step.num}</span> {step.title}</h3>
                <p>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.comparison_section}>
        <div className={styles.comparison_container}>
          <div className={styles.comparison_header}>
            <h2 dangerouslySetInnerHTML={{ __html: pageData?.sections?.[5]?.title || "Competitive comparison" }} />
            <p dangerouslySetInnerHTML={{ __html: pageData?.sections?.[5]?.subtitle || "Pay10 is competing against exchange houses and established salary card providers. This table makes the case without naming anyone directly." }} />
          </div>

          <div className={styles.table_responsive}>
            <table className={styles.compare_table}>
              <thead>
                <tr>
                  <th>What matters</th>
                  <th>Traditional WPS providers</th>
                  <th className={styles.highlight_col}>Pay10 WPS</th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row, idx) => (
                  <tr key={idx}>
                    <td>{row.feature}</td>
                    <td>
                      {row.trad.type === 'check' && <Icon icon="mdi:check-circle" className={styles.icon_check} />}
                      {row.trad.type === 'cross' && <Icon icon="mdi:close-circle" className={styles.icon_cross} />}
                      {row.trad.text}
                    </td>
                    <td className={styles.highlight_col}>
                      {row.pay10.type === 'check' && <Icon icon="mdi:check-circle" className={styles.icon_check} />}
                      {row.pay10.type === 'cross' && <Icon icon="mdi:close-circle" className={styles.icon_cross} />}
                      {row.pay10.text}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <ConsumerFeatureSection
          heading={pageData?.sections?.[6]?.title || "Ensuring minimal disruption to your existing salary processing"}
          subheading={subHeadingText2}
          points={points2}
          imageSrc={pageData?.sections?.[6]?.images?.[0] || "/images/prod_imports/wps-02-bubble.png"}
          imageAlt="Minimal Disruption"
          isReversed={true}
          isGreyBg={true}
        />

      <section className={styles.final_combo}>
        <span className={styles.combo_ring} aria-hidden="true" />
        <span className={styles.combo_ring_small} aria-hidden="true" />

        <div className={styles.combo_cta}>
          <h2 className={styles.combo_heading} dangerouslySetInnerHTML={{ __html: pageData?.sections?.[7]?.title || "Ready to pay your employees the smarter way?" }} />
          <p className={styles.combo_sub} dangerouslySetInnerHTML={{ __html: pageData?.sections?.[7]?.subtitle || "Contact our sales team we'll handle registration, account setup, and your first salary run." }} />
          <Link href="/contact-us?type=Enterprise+Sales" className={styles.combo_btn}>Enterprise Sales</Link>
        </div>

        <div className={styles.combo_divider} aria-hidden="true" />

        <div className={styles.combo_download}>
          <h2 className={styles.combo_heading}>Merchant App</h2>
          <div className={styles.combo_badges}>
            <a
              href="https://apps.apple.com/us/app/pay10-biz-bahrain/id6758454998"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.app_qr_card}
            >
              <Image src="/images/prod_imports/biz-app-store-qr.png" alt="Scan to download on the App Store" width={140} height={140} />
              <div>
                <Icon icon="ic:baseline-apple" width={20} color="#000" />
                <span>Download on the App Store</span>
              </div>
            </a>
            <a
              href="https://play.google.com/store/apps/details?id=bh.pay10.merchant.app"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.app_qr_card}
            >
              <Image src="/images/prod_imports/biz-play-store-qr.png" alt="Scan to get it on Google Play" width={140} height={140} />
              <div>
                <Icon icon="logos:google-play-icon" width={18} />
                <span>Get it on Google Play</span>
              </div>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
};

export default WPSPayrollClient;
