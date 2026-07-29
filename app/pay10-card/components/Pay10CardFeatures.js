import React from "react";
import Style from "./Pay10CardFeatures.module.scss";

const UaeCardIcon = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="6" width="20" height="12" rx="2" stroke="url(#orange-grad)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M2 10h20" stroke="url(#orange-grad)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M8 15h3" stroke="url(#orange-grad)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M14 15l2-1.5 2 1.5-.5-2.5 2-1.5h-2.5L16 8.5l-1 2.5h-2.5l2 1.5-.5 2.5z" stroke="url(#orange-grad)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <defs>
      <linearGradient id="orange-grad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#f79d00" />
        <stop offset="100%" stopColor="#eb1e23" />
      </linearGradient>
    </defs>
  </svg>
);

const SecurityIcon = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="url(#orange-grad)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M9 12l2 2 4-4" stroke="url(#orange-grad)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <defs>
      <linearGradient id="orange-grad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#f79d00" />
        <stop offset="100%" stopColor="#eb1e23" />
      </linearGradient>
    </defs>
  </svg>
);

const TerminalIcon = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="6" y="4" width="12" height="16" rx="2" stroke="url(#orange-grad)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M6 15h12" stroke="url(#orange-grad)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="10" cy="18" r="1" fill="url(#orange-grad)" />
    <circle cx="14" cy="18" r="1" fill="url(#orange-grad)" />
    <path d="M10 4V2h4v2" stroke="url(#orange-grad)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <defs>
      <linearGradient id="orange-grad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#f79d00" />
        <stop offset="100%" stopColor="#eb1e23" />
      </linearGradient>
    </defs>
  </svg>
);

const Pay10CardFeatures = ({ data = null }) => {
  const defaultCards = [
    {
      id: "01",
      icon: <UaeCardIcon />,
      title: "Made in the UAE",
      description: "Jaywan is the UAE's national card scheme - owned, operated, and governed locally by the Central Bank of Bahrain."
    },
    {
      id: "02",
      icon: <TerminalIcon />,
      title: "Accepted nationwide",
      description: "Over 90% of UAE POS terminals and all major ATMs accept Jaywan - covering retail, hospitality, electronics, and more."
    },
    {
      id: "03",
      icon: <SecurityIcon />,
      title: "Built-in security",
      description: "Payment data is stored within the UAE - local security, local governance, global standards."
    }
  ];

  const cards = data?.cards?.length > 0 ? data.cards.map((card, index) => ({
    id: `0${index + 1}`,
    icon: index === 0 ? <UaeCardIcon /> : index === 1 ? <TerminalIcon /> : <SecurityIcon />,
    title: card.title,
    description: card.description || card.subtitle
  })) : defaultCards;

  return (
    <section className={Style.feature_grid_section}>
      <div className={Style.container}>
        
        {/* Left Content */}
        <div className={Style.left_content}>
          <span className={Style.eyebrow} data-animation="opacity-up">Built by the UAE. For the UAE.</span>
          <h2 data-animation="opacity-up" data-anim-delay="100">{data?.title || "Accepted everywhere that matters."}</h2>
          <p data-animation="opacity-up" data-anim-delay="200">
            {data?.subtitle || "Pay10 Card runs on Jaywan - the UAE's first domestic card payment scheme, launched by Al Etihad Payments, a subsidiary of the Central Bank of Bahrain. Jaywan means \"precious pearl\" in Arabic - a nod to the UAE's heritage and its vision for a sovereign, future-ready financial system."}
          </p>
        </div>

        {/* Right Grid */}
        <div className={Style.right_grid}>
          {cards.map((card, index) => (
            <div key={card.id} className={Style.feature_card} data-animation="opacity-up" data-anim-delay={`${100 * (index + 1)}`}>
              <div className={Style.card_header}>
                <div className={Style.icon}>{card.icon}</div>
                <span className={Style.number}>{card.id}</span>
              </div>
              <h3 className={Style.card_title}>{card.title}</h3>
              <p className={Style.card_desc}>{card.description}</p>
            </div>
          ))}

          {/* 04 Image Card */}
          <div className={`${Style.feature_card} ${Style.image_card}`} data-animation="opacity-up" data-anim-delay="400">
            <span className={Style.number_overlay}>04</span>
            <img src={data?.images?.[0] || "/images/prod_imports/jaywan-cards-mockup.png"} alt="Jaywan Pay10 Card" />
          </div>
        </div>

      </div>
    </section>
  );
};

export default Pay10CardFeatures;
