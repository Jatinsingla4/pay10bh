import { fetchPageData } from "../lib/fetchPageData";
import { isEmptyHtml } from "../lib/sanitizeHtml";
import styles from "./careers.module.scss";

export async function generateMetadata() {
  const data = await fetchPageData('careers');
  if (data?.seo) {
    return {
      title: data.seo.title || "Careers - Pay10",
      description: data.seo.description || "Join the Pay10 team. Build your future with Pay10, building smart, secure, and fast payment solutions in the UAE.",
      alternates: { canonical: "https://pay10.bh/careers" },
    };
  }
  return {
    title: "Careers - Pay 10",
    description: "Join the Pay10 team. Build your future with Pay10, building smart, secure, and fast payment solutions in the UAE.",
    alternates: { canonical: "https://pay10.bh/careers" },
  };
}

export default async function CareersPage() {
  const pageData = await fetchPageData('careers');

  return (
    <main className={styles.careers}>
      {(pageData?.banner_image || pageData?.mobile_image) && (
        <section
          className={styles.careersHeroBanner}
          aria-label="Careers"
          style={{
            '--bg-desktop': pageData?.banner_image ? `url(${pageData.banner_image})` : undefined,
            '--bg-mobile': pageData?.mobile_image ? `url(${pageData.mobile_image})` : undefined,
          }}
        >
          <div className={styles.banner_svg}>
            <div className={styles.bannerContent}>
              {pageData?.page_title && <h2>{pageData.page_title}</h2>}
            </div>
          </div>
        </section>
      )}

      <section className="wrapper">
        {(!isEmptyHtml(pageData?.page_subtitle) || !isEmptyHtml(pageData?.page_description)) && (
          <div className={styles.content} data-animation="fade-up">
            {!isEmptyHtml(pageData?.page_subtitle) && <h2>{pageData.page_subtitle}</h2>}
            {!isEmptyHtml(pageData?.page_description) && <div dangerouslySetInnerHTML={{ __html: pageData.page_description }} />}
          </div>
        )}

        {pageData?.sections?.map((section, idx) => (
          <div key={idx} className={styles.content} data-animation="fade-up">
            {section.title && <h2>{section.title}</h2>}
            {!isEmptyHtml(section.content) && <div dangerouslySetInnerHTML={{ __html: section.content }} />}
            {section.image && <img src={section.image} alt={section.title} style={{ maxWidth: '100%', marginTop: '20px' }} />}
          </div>
        ))}

        <div className={styles.jobs_box} data-animation="fade-up" data-anim-delay="300">
          <iframe
            src="https://pay10.webhr.co/hr/careers/"
            style={{ marginTop: "0px", marginLeft: "0px", width: "100%", height: "600px" }}
            frameBorder="0"
            marginHeight="0"
            marginWidth="0"
            scrolling="auto"
          />
        </div>
      </section>
    </main>
  );
}
