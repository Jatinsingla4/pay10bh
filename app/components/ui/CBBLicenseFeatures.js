import React from "react";
import Style from "./CBBLicenseFeatures.module.scss";

const ArrowIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 12H19" stroke="var(--red)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 5L19 12L12 19" stroke="var(--red)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const WalletIcon = () => <img src="/images/home/cbuae-icon-1.png" alt="" width="24" height="24" style={{imageRendering:'crisp-edges'}} />;
const POSIcon    = () => <img src="/images/home/cbuae-icon-2.png" alt="" width="28" height="24" style={{imageRendering:'crisp-edges'}} />;
const BankIcon   = () => <img src="/images/home/cbuae-icon-3.png" alt="" width="24" height="24" style={{imageRendering:'crisp-edges'}} />;
const GlobeIcon  = () => <img src="/images/home/cbuae-icon-4.png" alt="" width="24" height="24" style={{imageRendering:'crisp-edges'}} />;

const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0, marginTop: '4px' }}>
    <defs>
      <linearGradient id="check-grad" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="var(--red)"/>
        <stop offset="40%" stopColor="var(--orange)"/>
        <stop offset="100%" stopColor="var(--yellow)"/>
      </linearGradient>
    </defs>
    <path d="M5 12L10 17L20 7" stroke="url(#check-grad)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const CBBLicenseFeatures = ({ 
  eyebrow = "CBB Licensed · Our Credibility",
  title = "Built on the strongest regulatory foundation in the UAE.",
  content = "",
  cardsData = [],
  logo
}) => {
  const cards = [
    {
      id: "01",
      icon: <WalletIcon />,
      title: "Stored Value Facility",
      description: "The license that lets us hold and manage your money - legally, safely, under CBB supervision.",
      hoverData: {
        title: "Your money, secured and accessible anytime.",
        subtitle: "WHAT THIS LICENSE ENABLES",
        features: [
          "Digital wallet issuance",
          "Store of value management",
          "Peer-to-peer money transfers",
          "User fund safeguarding",
          "Cash-in and cash-out operations"
        ]
      }
    },
    {
      id: "02",
      icon: <POSIcon />,
      title: "Retail Payment Services - RPS-II",
      description: "The license that puts us directly inside the UAE payment ecosystem - for merchants, QR, gateways, and more.",
      hoverData: {
        title: "We don't rely on another bank to process your payments. We do it directly.",
        subtitle: "WHAT THIS LICENSE ENABLES",
        features: [
          "Merchant payment acceptance",
          "QR code payment processing",
          "Payment gateway operations",
          "Merchant acquiring services",
          "End-to-end settlement"
        ]
      }
    },
    {
      id: "03",
      icon: <BankIcon />,
      title: "Open Finance",
      description: "One of the UAE's newest regulatory frameworks - enabling us to connect your finances across banks and institutions.",
      hoverData: {
        title: "The future of finance is connected. Pay10 is already licensed for it.",
        subtitle: "WHAT THIS LICENSE ENABLES",
        features: [
          "Secure financial data sharing (with consent)",
          "Bank & institution integrations",
          "Account aggregation across providers",
          "Smart budgeting & lending insights",
          "Embedded finance innovation"
        ]
      }
    },
    {
      id: "04",
      icon: <GlobeIcon />,
      title: "Cross-Border Remittance",
      description: "The license that lets you send money internationally from the UAE - legally, instantly, at scale.",
      hoverData: {
        title: "Sending money home shouldn't require paperwork, waiting, or worrying.",
        subtitle: "WHAT THIS LICENSE ENABLES",
        features: [
          "Send money from UAE internationally",
          "Receive inbound remittances",
          "Global money transfer network access",
          "Multi-corridor cross-border transfers",
          "Forex conversion at competitive rates"
        ]
      }
    }
  ];

  const parseContent = (htmlString) => {
    if (!htmlString) return { __html: "" };
    // Replace [gradient]...[/gradient] with a span containing the global gradient-text class
    const parsed = htmlString.replace(/\[gradient\](.*?)\[\/gradient\]/g, '<span class="gradient-text">$1</span>');
    return { __html: parsed };
  };

  return (
    <section className={Style.feature_grid_section}>
      <div className={Style.container}>
        
        {/* Left Content */}
        <div className={Style.left_content}>
          {eyebrow && <span className={Style.eyebrow} data-animation="opacity-up">{eyebrow}</span>}
          {title && <h2 data-animation="opacity-up" data-anim-delay="100">{title}</h2>}
          
          {content ? (
            <div className={Style.cms_content} data-animation="opacity-up" data-anim-delay="200" dangerouslySetInnerHTML={parseContent(content)} />
          ) : (
            <>
              <p data-animation="opacity-up" data-anim-delay="200">
                Pay10 holds four Central Bank of Bahrain licenses - SVF, RPS-II, Open Finance, and Remittance. Together they make Pay10 a fully regulated fintech solution provider to both merchants and consumers catering to all financial alternative payment methods.
              </p>
              <div className={Style.highlight_text} data-animation="opacity-up" data-anim-delay="300">
                Most fintechs hold 1, maybe 2. Pay10 holds all 4.
              </div>
            </>
          )}
          
          {logo && (
            <div className={Style.logo_wrapper} data-animation="opacity-up" data-anim-delay="400">
              <img src={logo} alt="Central Bank of Bahrain" className={Style.cbuae_logo} />
            </div>
          )}
        </div>

        {/* Right Grid */}
        <div className={Style.right_grid}>
          {cardsData && cardsData.map((card, index) => (
            <div key={index} className={Style.feature_card} data-animation="opacity-up" data-anim-delay={`${100 * (index + 1)}`}>
              <div className={Style.card_content}>
                <div className={Style.card_header}>
                  <div className={Style.icon}>
                    {card.icon && <img src={card.icon} alt="" width="24" height="24" style={{imageRendering:'crisp-edges', objectFit:'contain'}} />}
                  </div>
                  <span className={Style.number}>{(index + 1).toString().padStart(2, '0')}</span>
                </div>
                <h3 className={Style.card_title}>{card.title}</h3>
                {card.subtitle && <p className={Style.card_desc}>{card.subtitle}</p>}
                <div className={Style.arrow_wrapper}>
                  <ArrowIcon />
                </div>
              </div>
              
              {/* Hover Overlay */}
              <div className={Style.card_hover_overlay}>
                {card.content && (
                  <div className={Style.hover_cms_content} dangerouslySetInnerHTML={{ __html: card.content }} />
                )}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default CBBLicenseFeatures;
