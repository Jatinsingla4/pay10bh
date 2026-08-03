"use client";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Style from "./about.module.scss";
import JourneySection from "../components/ui/blocks/JourneySection";
import PowerToDreamSection from "../components/ui/about/PowerToDreamSection";
import AboutBanner from "../components/ui/about/AboutBanner";
import AboutSecondSection from "../components/ui/about/AboutSecondSection";
import WhereWeScoreSection from "../components/ui/about/WhereWeScoreSection";
import AboutTeamMember from "../components/ui/about/AboutTeamMember";
import { sanitizeHtml, isEmptyHtml } from "../lib/sanitizeHtml";

const AboutClient = ({ apiData }) => {
  const sections = apiData?.sections || [];

  // --- 0. About Pay10 Bahrain ---
  const aboutPay10SectionApi = sections.find(s => (s.title || '').toLowerCase().includes('about pay10'));
  const aboutHeading = aboutPay10SectionApi?.title || "";
  const aboutContent = isEmptyHtml(aboutPay10SectionApi?.content) ? "" : aboutPay10SectionApi.content;
  const aboutImage = aboutPay10SectionApi?.images?.[0] || aboutPay10SectionApi?.image || null;

  // --- 1. Board Members ---
  const boardSectionApi = sections.find(s => s.title === "Meet Our Board");
  const mergedMembersSection = {
    our_team_list: (boardSectionApi?.cards || []).map(card => ({
      Name: card.title,
      "Designation ": card.subtitle || "",
      // AboutTeamMember renders this as plain text (not dangerouslySetInnerHTML), so strip tags rather than sanitize them.
      Description: card.content ? card.content.replace(/<[^>]*>?/gm, '').trim() : "",
      Image: card.icon, // null if no image
      _isLocal: false
    }))
  };
  const mergedMembersHeading = boardSectionApi?.title || "Meet Our Board";

  // --- 1b. Team Members ---
  const teamSectionApi = sections.find(s => (s.title || '').toLowerCase().includes('meet our team'));
  const mergedTeamSection = {
    our_team_list: (teamSectionApi?.cards || []).map(card => ({
      Name: card.title,
      "Designation ": card.subtitle || "",
      Description: card.content ? card.content.replace(/<[^>]*>?/gm, '').trim() : "",
      Image: card.icon,
      _isLocal: false
    }))
  };
  const mergedTeamHeading = teamSectionApi?.title || "Meet Our Team";

  // --- 2. Journey So Far ---
  const journeySectionApi = sections.find(s => s.title === "Our Journey So Far");
  const journeyData = (journeySectionApi?.cards || []).map(card => ({
    year: card.title,
    description: isEmptyHtml(card.content) ? "" : sanitizeHtml(card.content),
    image: card.icon
  }));

  // --- 3. Power To Dream Big ---
  const dreamBigSectionApi = sections.find(s => s.title === "Giving You the Power to Dream Big");
  const dreamBigHeading = dreamBigSectionApi?.title || "";
  // PowerToDreamSection renders this as plain text (not dangerouslySetInnerHTML), so strip tags rather than sanitize them.
  const dreamBigDesc = dreamBigSectionApi?.content ? dreamBigSectionApi.content.replace(/<[^>]*>?/gm, '').trim() : "";
  const dreamBigImgPrimary = dreamBigSectionApi?.images?.[0] || dreamBigSectionApi?.image || null;
  const dreamBigImgSecondary = dreamBigSectionApi?.images?.[1] || null;

  // --- 4. Where We Score High ---
  const scoreSectionApi = sections.find(s => s.title === "Where We Score High");
  const scoreHeading = scoreSectionApi?.title || "";
  const scoreCards = scoreSectionApi?.cards || [];

  return (
    <main>
      <div className={Style.about_page_bg}>
        <section>
            <AboutBanner
              topHeading={apiData?.page_title}
              topSubHeading={apiData?.page_subtitle}
              topDescription={apiData?.page_description}
              bannerImage={apiData?.banner_image}
              mobileImage={apiData?.mobile_image}
            />
        </section>

        <section className={Style.about_bg_circle}>
          <div className={Style.wrapper}>
            {(aboutHeading || aboutContent || aboutImage) && (
              <AboutSecondSection
                section2Image={aboutImage}
                section2Html={aboutContent ? `<strong>${aboutHeading}</strong><div style="width:56px;height:4px;background:var(--primary-gradient);border-radius:2px;margin:18px auto 28px;"></div>${aboutContent}` : null}
              />
            )}
          </div>

          {mergedMembersSection.our_team_list.length > 0 && (
            <div className={Style.wrapper2}>
              <AboutTeamMember
                section5Heading={mergedMembersHeading}
                section5={mergedMembersSection}
                imageBase=""
              />
            </div>
          )}

          {mergedTeamSection.our_team_list.length > 0 && (
            <div className={Style.wrapper2}>
              <AboutTeamMember
                section5Heading={mergedTeamHeading}
                section5={mergedTeamSection}
                imageBase=""
                variant="compact"
              />
            </div>
          )}

          {journeyData.length > 0 && (
            <JourneySection
              journeyData={journeyData}
              heading={journeySectionApi?.title}
              largeDescriptionText={true}
            />
          )}

          <div className={`${Style.wrapper} ${Style.wrapper_last}`}>
            {(dreamBigHeading || dreamBigDesc) && (
              <PowerToDreamSection
                imgPrimary={dreamBigImgPrimary}
                imgSecondary={dreamBigImgSecondary}
                heading={dreamBigHeading}
                description={dreamBigDesc}
              />
            )}

            {scoreCards.length > 0 && (
              <WhereWeScoreSection
                section3Heading={scoreHeading}
                cards={scoreCards}
              />
            )}
          </div>
        </section>
      </div>
    </main>
  );
};

export default AboutClient;
