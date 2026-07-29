"use client";

import React from "react";
import Link from "next/link";
import ConsumerFeatureSection from "@/app/components/ui/product/ConsumerFeatureSection";
import MerchantTestimonialVideos from "@/app/components/ui/MerchantTestimonialVideos";
import MerchantLogosCTA from "@/app/components/ui/MerchantLogosCTA";
import { Icon } from "@iconify/react";
import styles from "./pos.module.scss";
import { isEmptyHtml } from "@/app/lib/sanitizeHtml";

// CMS "icon" field can be an uploaded image (URL/path) or an iconify name.
const renderIcon = (cmsIcon, className, width) => {
  if (typeof cmsIcon !== 'string' || !cmsIcon.trim()) return null;
  return /^(https?:)?\//.test(cmsIcon)
    ? <img src={cmsIcon} alt="" width={width} height={width} className={className} />
    : <Icon icon={cmsIcon} width={width} className={className} />;
};

// Picks the first non-CKEditor-empty value among `description`/`content`,
// falling back to `def` only when both are genuinely empty.
const firstNonEmptyHtml = (...vals) => vals.find(v => !isEmptyHtml(v)) ?? vals[vals.length - 1];

const PosDevicesClient = ({ pageData = null, testimonialVideos = [], testimonialTitle, testimonialContent, merchantLogos = [] }) => {

  // Consumer Feature Points
  const rawSubHeading = pageData?.sections?.[0]?.description || pageData?.sections?.[0]?.content || "";
  const parts = rawSubHeading.split('---');
  const subHeadingText = parts[0]?.replace(/<[^>]*>?/gm, '')?.trim() || "Every Pay10 device generates a unique Dynamic QR code per transaction — created fresh, linked to the exact amount, confirmed instantly. Not a static sticker. Not a shared code. A live, secure QR generated every single time a customer pays.";
  
  const tagsText = parts[1] || pageData?.sections?.[0]?.cards?.[0]?.tags;
  const consumerFeaturePoints = tagsText
    ? tagsText.split(',').map(t => t.trim().replace(/<[^>]*>?/gm, '')).filter(Boolean)
    : [
        "Dynamic QR generated per transaction - unique, amount-specific, instant",
        "Customer scans with Pay10 UAE, payment confirmed in under 2 seconds",
        "Audio and visual confirmation on device with no ambiguity and no errors",
        "Static QR also supported for merchants who need both options",
        "Sound box confirmation with an audible payment alert in any environment",
        "UAE's first device family to bring DQR to in-store payments at scale"
      ];

  // Compare Section
  const defaultDevices = [
    {
      name: 'P5',
      tagline: 'Elegant Design Meets Advanced Payment Capability.',
      bestFor: 'Retail counters, restaurants, salons, and lifestyle stores where design matters as much as function. Pay10\'s flagship tabletop terminal — built on RTOS for rock-solid stability.',
      design: 'Proprietary Pay10 premium minimalist, gold accent',
      display: { customer: '3.98" full-colour + 1" merchant', merchant: '1" monochrome LCD' },
      payment: { dqr: '✓ Unique QR per transaction', sqr: 'Supported', tap: 'DQR+Card variant only', dip: 'DQR+Card variant only' },
      variants: 'P5 DQR\nP5 DQR+Card',
      hardware: { os: 'RTOS — built for payment stability', keypad: 'Tilted keypad for fast, accessible input', battery: '2600 mAh Li-ion extended uptime', charging: 'USB Type-C' },
      connectivity: { sim: '✓ Micro SIM — pre-installed', wifi: 'NA', gps: 'NA' },
      alerts: { audio: '✓ Loudspeaker sound box', visual: '✓ On-screen confirmation' },
      management: { ota: '✓ Remote software push', config: 'Via Pay10 Biz portal', pci: 'Level 1 certified', app: 'Register and manage via app' }
    },
    {
      name: 'POS10',
      tagline: 'Smart, Simple, and Secure QR Payments for Every Counter.',
      bestFor: 'Small businesses, quick-service counters, and retail merchants who need a reliable, QR-focused countertop terminal — compact, affordable, and built to run all day.',
      design: 'Compact countertop — small footprint, no gold accent',
      display: { customer: '3.98" full-colour customer', merchant: '1" monochrome LCD' },
      payment: { dqr: '✓ Unique QR per transaction', sqr: 'Supported', tap: 'N/A', dip: 'NA' },
      variants: 'POS10 DQR',
      hardware: { os: 'RTOS — built for payment stability', keypad: 'Standard tactile keypad', battery: '2600 mAh — all-day performance', charging: 'USB Type-C' },
      connectivity: { sim: '✓ Micro SIM — pre-installed', wifi: 'NA', gps: 'GPS / GNSS' },
      alerts: { audio: '✓ Loudspeaker sound box', visual: '✓ RGB LED strip + on-screen' },
      management: { ota: '✓ Remote software push', config: 'Via Pay10 Biz portal', pci: 'Level 1 certified', app: 'Register and manage via app' }
    },
    {
      name: 'P10',
      tagline: 'Rugged Mobility for Payments on the Go. (Coming Soon)',
      bestFor: 'Delivery fleets, logistics operators, in-flight transactions, and field sales agents who need a durable, Android-powered payment device that works wherever business happens.',
      design: 'Rugged handheld — durable mobile form factor',
      display: { customer: 'Full colour high-visibility screen', merchant: 'N/A — single screen device' },
      payment: { dqr: '✓ Unique QR per transaction', sqr: 'NA', tap: 'DQR+Card variant only', dip: 'DQR+Card variant only' },
      variants: 'P10 DQR\nP10 DQR+Card',
      hardware: { os: 'Android — familiar, flexible, app-ready', keypad: 'Integrated — fast delivery payment entry', battery: 'High-capacity Li-ion — extended mobile use', charging: 'USB Type-C' },
      connectivity: { sim: '✓ Micro SIM — pre-installed', wifi: '✓ Built-in Wi-Fi', gps: 'NA' },
      alerts: { audio: '✓ Built-in loudspeaker', visual: '✓ On-screen confirmation' },
      management: { ota: '✓ Remote software push', config: 'Via Pay10 Biz portal', pci: 'Level 1 certified', app: 'Register and manage via app' }
    }
  ];

  const devices = pageData?.sections?.[1]?.cards?.length > 0 
    ? pageData.sections[1].cards.map((c, i) => {
        // Fallback to default structure for deep nested fields if CMS doesn't provide them
        const def = defaultDevices[i] || defaultDevices[0];
        return {
          ...def,
          name: c.title || def.name,
          tagline: c.subtitle || def.tagline,
          // Device cards have no dedicated "images" field in the CMS — the
          // "icon" slot doubles as the product-photo upload here.
          image: c.icon || c.images?.[0],
          bestFor: c.description || c.content || def.bestFor
        };
      })
    : defaultDevices;

  // Guarantee Section
  const guarantees = pageData?.sections?.[2]?.cards?.map((c) => ({
    title: c.title,
    desc: (c.description || c.content || "").replace(/<[^>]*>?/gm, '').trim(),
    icon: c.icon
  })) || [
    { title: '1 Dynamic QR on every device', desc: "UAE's first DQR device family — unique QR per transaction, every time." },
    { title: '2 OTA updates', desc: 'Software pushed remotely — no engineer visit, no downtime, always current.' },
    { title: '3 Remote configuration', desc: 'Manage all devices centrally from the Pay10 Biz portal — any location.' },
    { title: '4 PCI-DSS certified', desc: 'Every device ships pre-certified — compliance built in, not bolted on.' },
    { title: '5 Audio confirmation', desc: 'Loudspeaker alert on every payment — no ambiguity, no silent failures.' },
    { title: '6 SIM pre-installed', desc: 'Ships ready to connect — dedicated 4G SIM pre-installed, no setup needed.' },
    { title: '7 Delivered & installed', desc: 'Pay10 team delivers and sets up your device at your premises — you just start accepting.' },
    { title: '8 Pay10 Biz App linked', desc: 'Every device links to the Pay10 Biz UAE — one tap to register, manage, and monitor.' }
  ];

  // Flow Ecosystem
  const flowCards = pageData?.sections?.[3]?.cards?.map((c) => ({
    title: c.title,
    desc: c.subtitle,
    icon: c.icon
  })) || [
    { title: 'DQR Device', desc: 'POS10 • P5 • P10' },
    { title: 'Pay10 Biz App', desc: 'Manage • Monitor • Link' },
    { title: 'Merchant Portal', desc: 'Transactions • VAT • Reports' },
    { title: 'Instant Settlement', desc: 'T+0 • Same day • Always' },
    { title: '24/7 Support', desc: 'Human • Multi-language' }
  ];

  // Getting Started Steps
  const steps = pageData?.sections?.[4]?.cards?.map((c, i) => ({
    num: `${i + 1}`,
    title: c.title,
    desc: (c.description || c.content || "").replace(/<[^>]*>?/gm, '').trim(),
    icon: c.icon
  })) || [
    { num: '1', title: 'Power on', desc: 'Charge fully. Hold Power button 3 seconds. Device boots and displays registration QR on customer screen.' },
    { num: '2', title: 'Open Pay10 Biz UAE', desc: 'Login with your merchant credentials. Tap Manage Devices on the home screen.' },
    { num: '3', title: 'Register the device', desc: 'Select your device from the list. Tap Register. Scan the QR on the device screen. Confirm. Status changes to Active.' },
    { num: '4', title: 'Verify & start accepting', desc: 'Run a test transaction: AED amount, Dynamic QR generated, customer scans, audio + visual confirmation. You\'re live.' }
  ];

  return (
    <main className={styles.pos_page}>
      {/* Hero Banner Section */}
      <section className={styles.altareq_section}>
        <div
          className={styles.altareq_hero}
          style={{
            ...(pageData?.banner_image ? { '--bg-desktop': `url(${pageData.banner_image})` } : {}),
            ...(pageData?.mobile_image ? { '--bg-mobile': `url(${pageData.mobile_image})` } : (pageData?.banner_image ? { '--bg-mobile': `url(${pageData.banner_image})` } : {})),
            ...(pageData?.mobile_image ? { '--bg-mobile': `url(${pageData.mobile_image})` } : {}),
          }}
        >
          <div className={styles.altareq_hero_content}>
            <h1 dangerouslySetInnerHTML={{ __html: pageData?.page_title || "The new way to pay<br />at every counter in the UAE." }} />
            <p dangerouslySetInnerHTML={{ __html: pageData?.page_description || "Three devices. One ecosystem. All connected to the Pay10 Biz App, instant settlement, and 24/7 human support." }} />
          </div>
        </div>
      </section>

      <ConsumerFeatureSection
          heading={
            <>
              <div className={styles.uae_label} dangerouslySetInnerHTML={{ __html: pageData?.sections?.[0]?.subtitle || "🇦🇪 UAE FIRST &middot; DYNAMIC QR TECHNOLOGY" }} />
              <span className={styles.gradient_heading} dangerouslySetInnerHTML={{ __html: pageData?.sections?.[0]?.title || "The UAE's first Dynamic QR POS device.<br/>A new era of in-person payments." }} />
            </>
          }
          subheading={subHeadingText}
          points={consumerFeaturePoints}
          imageSrc={pageData?.sections?.[0]?.images?.[0] || "/images/prod_imports/consumer-app-phone.png"}
          imageAlt="Dynamic QR Technology"
          isReversed={false}
          isGreyBg={true}
        />

      <section className={styles.compare_section}>
        <div className={styles.container}>
          <div className={styles.compare_header}>
            <h2 className={styles.gradient_heading} dangerouslySetInnerHTML={{ __html: pageData?.sections?.[1]?.title || "Choose the right device for your business" }} />
            <p dangerouslySetInnerHTML={{ __html: pageData?.sections?.[1]?.subtitle || "Whether you need an elegant countertop solution or a rugged mobile device, we have you covered." }} />
          </div>
          
          <div className={styles.compare_grid}>
            {devices.map((device, idx) => (
              <div key={idx} className={styles.device_card}>
                <div className={styles.card_header}>
                  <h3>{device.name}</h3>
                  <p className={styles.tagline}>{device.tagline}</p>
                  <div className={styles.device_image_wrap}>
                    <img src={device.image} alt={device.name} className={styles.device_image} />
                  </div>
                </div>

                <div className={styles.section_block}>
                  <div className={styles.feature_item}>
                    <span className={styles.lbl}>Best for</span>
                    <span className={styles.val} dangerouslySetInnerHTML={{ __html: device.bestFor }} />
                  </div>
                  <div className={styles.feature_item}>
                    <span className={styles.lbl}>Design</span>
                    <span className={styles.val}>{device.design}</span>
                  </div>
                  <div className={styles.feature_item}>
                    <span className={styles.lbl}>Variants</span>
                    <span className={styles.val} style={{whiteSpace: 'pre-line'}}>{device.variants}</span>
                  </div>
                </div>

                <div className={styles.section_title}>DISPLAY</div>
                <div className={styles.section_block}>
                  <div className={styles.feature_item}>
                    <span className={styles.lbl}>Customer</span>
                    <span className={styles.val}>{device.display.customer}</span>
                  </div>
                  <div className={styles.feature_item}>
                    <span className={styles.lbl}>Merchant</span>
                    <span className={styles.val}>{device.display.merchant}</span>
                  </div>
                </div>

                <div className={styles.section_title}>PAYMENT METHODS</div>
                <div className={styles.section_block}>
                  <div className={styles.feature_item}>
                    <span className={styles.lbl}>Dynamic QR</span>
                    <span className={styles.val}>{device.payment.dqr}</span>
                  </div>
                  <div className={styles.feature_item}>
                    <span className={styles.lbl}>Static QR</span>
                    <span className={styles.val}>{device.payment.sqr}</span>
                  </div>
                  <div className={styles.feature_item}>
                    <span className={styles.lbl}>TAP (Contactless)</span>
                    <span className={styles.val}>{device.payment.tap}</span>
                  </div>
                  <div className={styles.feature_item}>
                    <span className={styles.lbl}>DIP (Chip)</span>
                    <span className={styles.val}>{device.payment.dip}</span>
                  </div>
                </div>

                <div className={styles.section_title}>HARDWARE & CONNECTIVITY</div>
                <div className={styles.section_block}>
                  <div className={styles.feature_item}>
                    <span className={styles.lbl}>OS</span>
                    <span className={styles.val}>{device.hardware.os}</span>
                  </div>
                  <div className={styles.feature_item}>
                    <span className={styles.lbl}>Keypad</span>
                    <span className={styles.val}>{device.hardware.keypad}</span>
                  </div>
                  <div className={styles.feature_item}>
                    <span className={styles.lbl}>Battery</span>
                    <span className={styles.val}>{device.hardware.battery}</span>
                  </div>
                  <div className={styles.feature_item}>
                    <span className={styles.lbl}>Connectivity</span>
                    <span className={styles.val}>{device.connectivity.sim}<br/>{device.connectivity.wifi !== 'NA' ? device.connectivity.wifi : ''}</span>
                  </div>
                </div>

                <div className={styles.section_title}>ALERTS & MANAGEMENT</div>
                <div className={styles.section_block}>
                  <div className={styles.feature_item}>
                    <span className={styles.lbl}>Audio/Visual</span>
                    <span className={styles.val}>{device.alerts.audio}<br/>{device.alerts.visual}</span>
                  </div>
                  <div className={styles.feature_item}>
                    <span className={styles.lbl}>Compliance</span>
                    <span className={styles.val}>{device.management.pci}<br/>{device.management.app}</span>
                  </div>
                </div>

              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.guarantee_section}>
        <div className={styles.guarantee_container}>
          <div className={styles.guarantee_header}>
            <h2 className={styles.gradient_heading} dangerouslySetInnerHTML={{ __html: pageData?.sections?.[2]?.title || "Every Pay10 device. The same guarantee." }} />
            <p dangerouslySetInnerHTML={{ __html: pageData?.sections?.[2]?.subtitle || "Whether you choose the POS10, P5, or P10 — every device ships with the same core capabilities, the same security standards, and the same Pay10 commitment." }} />
          </div>

          <div className={styles.guarantee_grid}>
            {guarantees.map((item, idx) => (
              <div key={idx} className={styles.guarantee_card}>
                <div className={styles.icon_wrap}>
                  {renderIcon(item.icon, styles.card_icon, 18)}
                </div>
                <h4>{item.title}</h4>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.ecosystem_flow_section}>
        <div className={styles.container}>
          <div className={styles.flow_header}>
            <div className={styles.flow_gradient_block}>
              <span className={styles.flow_h2} dangerouslySetInnerHTML={{ __html: pageData?.sections?.[3]?.title || "Your device is the start." }} />
              <span className={styles.flow_h3} dangerouslySetInnerHTML={{ __html: pageData?.sections?.[3]?.subtitle || "The ecosystem is what makes it powerful." }} />
            </div>
            <p dangerouslySetInnerHTML={{ __html: firstNonEmptyHtml(pageData?.sections?.[3]?.description, pageData?.sections?.[3]?.content, "Every Pay10 POS device connects into a complete merchant ecosystem — the Pay10 Biz UAE, the Merchant Portal, instant settlement, and 24/7 human support. It's not a standalone terminal. It's the physical entry point to Pay10's full payment infrastructure.") }} />
          </div>

          <div className={styles.flow_container}>
            {flowCards.map((card, idx) => (
              <React.Fragment key={idx}>
                <div className={styles.flow_card}>
                  {renderIcon(card.icon, styles.flow_icon, 32)}
                  <h4>{card.title}</h4>
                  <span dangerouslySetInnerHTML={{ __html: card.desc }} />
                </div>
                {idx < flowCards.length - 1 && (
                  <Icon icon="mdi:arrow-right" className={styles.flow_arrow} />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.getting_started}>
        <div className={styles.getting_started_left}>
          <h2 className={styles.gradient_heading} dangerouslySetInnerHTML={{ __html: pageData?.sections?.[4]?.title || "Lets get you Started" }} />
          <p className={styles.getting_started_tagline} dangerouslySetInnerHTML={{ __html: pageData?.sections?.[4]?.subtitle || "From box to first payment. In 4 steps." }} />
          <p className={styles.getting_started_desc} dangerouslySetInnerHTML={{ __html: firstNonEmptyHtml(pageData?.sections?.[4]?.description, pageData?.sections?.[4]?.content, "Pay10 delivers and sets up your device. Here's what happens after it arrives, straight from the device manual.") }} />
        </div>
        
        <div className={styles.getting_started_grid}>
          {steps.map((item) => (
            <div key={item.num} className={styles.step_card}>
              <span className={styles.step_num}>{item.num}</span>
              <div className={styles.step_icon}>
                {renderIcon(item.icon, undefined, 28)}
              </div>
              <h3>{item.title}</h3>
              <p className={styles.step_desc}>{item.desc}</p>
              <span className={styles.step_arrow}>→</span>
            </div>
          ))}
        </div>
      </section>

      <MerchantTestimonialVideos
        title={testimonialTitle || "Don't take our word for it. Hear it from the merchants themselves."}
        content={testimonialContent || "<p>From small retailers to enterprise brands, businesses across the UAE are choosing Pay10 for faster settlements, lower costs, and support that actually shows up.</p>"}
        videos={testimonialVideos}
      />
      <MerchantLogosCTA showCta={false} images={merchantLogos} />

      <section className={styles.final_combo}>
        <span className={styles.combo_ring} aria-hidden="true" />
        <span className={styles.combo_ring_small} aria-hidden="true" />

        <div className={styles.combo_cta}>
          <h2 className={styles.combo_heading} dangerouslySetInnerHTML={{ __html: pageData?.sections?.[5]?.title || "Ready to accept payments<br/>the new UAE way?" }} />
          <p className={styles.combo_sub} dangerouslySetInnerHTML={{ __html: pageData?.sections?.[5]?.subtitle || "Our team delivers, installs, and activates your DQR device. You start accepting payments instantly. Lowest MDR. Same-day settlement. 24/7 human support. CBB licensed." }} />
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
              className={styles.app_badge}
              aria-label="Download on the App Store"
            >
              <Icon icon="ic:baseline-apple" width={28} />
              <div>
                <span>Download on the</span>
                <strong>App Store</strong>
              </div>
            </a>
            <a
              href="https://play.google.com/store/apps/details?id=bh.pay10.merchant.app"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.app_badge}
              aria-label="Get it on Google Play"
            >
              <Icon icon="logos:google-play-icon" width={24} />
              <div>
                <span>GET IT ON</span>
                <strong>Google Play</strong>
              </div>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
};

export default PosDevicesClient;
