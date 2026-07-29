import Style from '../../coming-soon/coming-soon.module.scss';

// Shown when a CMS-driven listing (blog/news/events) has no items yet.
// Switches to real content automatically once the backend returns data —
// the pages themselves already gate on array length, this is just the empty view.
export default function ComingSoon() {
  return (
    <section className={Style.wrapper}>
      <div className={Style.coming_soon_main}>
        <div className={Style.coming_soon_content}>
          <h2 data-animation="opacity-up">Coming soon</h2>
          <h3 data-animation="opacity-up">Something exciting is on the way!</h3>
          <p data-animation="opacity-up">
            Our new page is under construction, stay tuned for updates and get ready for what&rsquo;s coming next.
          </p>
        </div>

        <div className={Style.coming_soon_img} data-animation="scale-up">
          <img src="/images/coming_soon_img/comingsoon.svg" alt="Coming soon" />
        </div>
      </div>
    </section>
  );
}
