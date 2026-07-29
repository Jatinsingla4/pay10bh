"use client";

import SimpleLayout from "@/app/components/ui/product/pacb-india/SimpleLayout";
import TwoColLayout from "@/app/components/ui/product/pacb-india/TwoColLayout";
import GetStarted from "@/app/components/ui/GetStarted";
import { TextCenterAppCard } from "@/app/components/ui/TextCenterBlock";
import Style from "./page.module.scss";
import { sanitizeHtml, isEmptyHtml } from "@/app/lib/sanitizeHtml";

const firstNonEmptyHtml = (...vals) => vals.find(v => !isEmptyHtml(v)) ?? vals[vals.length - 1];

/** Plain-text CMS descriptions (e.g. with \\r\\n) vs HTML snippets for dangerouslySetInnerHTML. */
function normalizeCmsDescriptionHtml(description) {
  if (description == null) return "";
  const s = String(description).trim();
  if (!s) return "";
  if (/<\s*[a-z]/i.test(s)) return sanitizeHtml(s);
  const blocks = s.split(/\r?\n\r?\n/).map((b) => b.trim()).filter(Boolean);
  const esc = (t) =>
    t
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  if (!blocks.length) return "";
  return blocks
    .map((block) => `<p>${esc(block).replace(/\r?\n/g, "<br />")}</p>`)
    .join("");
}

/** Intro band below hero (fallback when CMS has no section2.list[0]). */
const ALTAREQ_CONNECTED_INTRO = {
  Title: "The future of finance is connected",
  Image: "/images/prod_imports/altareq-logo.png",
  Description: `
<p>AlTareq is now live in your Pay10 UAE, giving you seamless, secure access to your bank account, add money, and pay directly from your bank account.</p>
<p>AlTareq is the UAE's national Open Finance gateway launched by the Central Bank of Bahrain to securely connect licensed financial institutions, and third-party providers.</p>
`.trim(),
};

/** Matches design: English link + Arabic FAQ line accent (see .altareqArabicFaqLink). */
const ALTAREQ_LINK_STYLE = `color:var(--red);font-family:'semibold',sans-serif;text-decoration:none;`;

const OPEN_FINANCE_ALTAREQ_SIMPLE_ROWS = [
  {
    Title: "",
    Image: "/images/temp/a1.png",
    Description: `
<p>Pay10 enabled AlTareq, to safely and securely make payments from your bank account for purchases, top-ups, or sending money to contacts giving you frictionless access to a world of services and insights.</p>
<p>AlTareq and Pay10 bring innovative ways to access and use financial services in the UAE:</p>
<ul>
<li>Connect your bank accounts with your Pay10 Wallet.</li>
<li>Make payments faster than ever before.</li>
<li>Experience real-time, secure connections with Pay10 for streamlined and personalized services.</li>
<li>Track and monitor all linked accounts and transactions conveniently within your Pay10 Wallet.</li>
</ul>
`.trim(),
  },
  {
    Title: "Real-time visibility",
    Image: "/images/temp/a2.png",
    Description:
      "<p>Track and monitor your purchases, top ups and money movements in real-time from your Pay10 Wallet.</p>",
  },
  {
    Title: "A New Era in Payments by AlTareq",
    Image: "/images/temp/a3.png",
    Description: `
<p>Enjoy paying with your bank account at online checkout on your own rules and terms.</p>
<p>No more entering card details or credentials. Securely authorize each transaction through your banking app with AlTareq and Pay10.</p>
`.trim(),
  },
  {
    Title: "You're in control, always",
    Image: "/images/temp/a4.png",
    Description: `
<p>Set your payment limits, frequency, and the duration of your account permission with full transparency.<br />Your account. Your control. Manage all your accounts in one app, download Pay10 now.</p>
`.trim(),
  },
  {
    Title: "Secure by design",
    Image: "/images/temp/a5.png",
    Description:
      "<p>Regulated by the Central Bank of Bahrain, your data and financial services are protected with world-class encryption.</p>",
  },

  {
    Title: "Start accepting account-to-account payments for your business.",
    Image: "/images/temp/a6.png",
    Description: `
<p>AlTareq and Pay10's Merchant Payment Acceptance Solution enables you to offer a new real-time payment method in the UAE.</p>
<p>Your customers can pay instantly and securely using their bank accounts powered by AlTareq.</p>
<p>For More Information: <a href="https://pay10.bh/wp-content/uploads/2026/04/Nebras-Open-Finance-FAQs-English.pdf" target="_blank" style="${ALTAREQ_LINK_STYLE}">Nebras Open Finance FAQ</a></p>
<p dir="rtl" lang="ar" class="altareqArabicFaqNote">
  <span class="altareqArabicFaqGray">للمزيد من المعلومات</span><br />
  <a class="altareqArabicFaqLink" href="https://pay10.bh/wp-content/uploads/2026/04/Nebras-Open-Finance-FAQs-Arabic.pdf" target="_blank" style="${ALTAREQ_LINK_STYLE}">الأسئلة الشائعة حول التمويل المفتوح من نبراس</a>
</p>
`.trim(),
  },
];

// Always use the local transparent AlTareq logo
const connectedIntroItem = {
  ...ALTAREQ_CONNECTED_INTRO,
  Image: "/images/prod_imports/altareq-logo.png",
};

const OpenFinanceAltareqClient = ({ pageData = null }) => {
  // Override ALTAREQ_CONNECTED_INTRO if CMS data exists
  const cmsIntroItem = pageData?.sections?.[0] ? {
    Title: pageData.sections[0].title,
    Image: pageData.sections[0].images?.[0] || "/images/prod_imports/altareq-logo.png",
    Description: firstNonEmptyHtml(pageData.sections[0].content, pageData.sections[0].subtitle, ""),
  } : null;

  const connectedIntroItemToUse = cmsIntroItem || connectedIntroItem;

  // Build Simple Rows from sections[1] onwards
  const cmsSimpleRows = pageData?.sections?.length > 1 
    ? pageData.sections.slice(1).map(sec => ({
        Title: sec.title || "",
        Image: sec.images?.[0] || "",
        Description: firstNonEmptyHtml(sec.content, sec.subtitle, ""),
      }))
    : OPEN_FINANCE_ALTAREQ_SIMPLE_ROWS;

  return (
    <main className={Style.mainWrapper}>
      <section 
        className={Style.altareq_hero}
        style={{
          '--desktop-bg': pageData?.banner_image ? `url(${pageData.banner_image})` : undefined,
          '--mobile-bg': pageData?.mobile_image ? `url(${pageData.mobile_image})` : (pageData?.banner_image ? `url(${pageData.banner_image})` : undefined)
        }}
      >
        <div className={Style.altareq_hero_text}>
          <h2 dangerouslySetInnerHTML={{ __html: firstNonEmptyHtml(pageData?.page_title, "Real-time Payments via AlTareq") }} />
          <p dangerouslySetInnerHTML={{ __html: firstNonEmptyHtml(pageData?.page_subtitle, pageData?.page_description, "Discover new ways to access financial services in your Pay10 UAE with AlTareq, the UAE's open finance initiative.") }} />
        </div>
      </section>

      <section className={Style.connected_finance_intro}>
        <TwoColLayout item={connectedIntroItemToUse} imageBase="" reverse unoptimized />
      </section>

      <div className={Style.section_spacing}>
        <SimpleLayout
          items={cmsSimpleRows}
          imageBase=""
          startWithImageLeft={true}
          useBackgroundCircle={true}
        />
      </div>

      <TextCenterAppCard />

      <GetStarted />
    </main>
  );
};

export default OpenFinanceAltareqClient;
