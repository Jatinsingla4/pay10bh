import Image from 'next/image';
import styles from './TextCenterBlock.module.scss';
import Link from 'next/link';

const gridBoxes = [
  {
    heading: 'Merchant App',
    img1: '/images/foo-app1.svg',
    img2: '/images/foo-app2.svg',
    appleHref: 'https://apps.apple.com/us/app/pay10-biz-bahrain/id6758454998',
    playHref: 'https://play.google.com/store/apps/details?id=bh.pay10.merchant.app',
  },
  {
    heading: 'Consumer App',
    img1: '/images/foo-app1.svg',
    img2: '/images/foo-app2.svg',
    appleHref: 'https://apps.apple.com/us/app/pay10-bahrain/id6758339638',
    playHref: 'https://play.google.com/store/apps/details?id=bh.payten.wallet.app&hl=en',
  },
];

export default function TextCenterBlock({
  heading = 'The Possibilities are Endless',
  description = 'Protect your time, money, and peace of mind with fast, easy, secure payments and transfers from anywhere in the world. Thanks to the Pay10 UAE, you can spend your time and money on living your best life.',
}) {
  return (
    <section className={styles.banner}>
      <div className={styles.content}>
        <h3 className={styles.kicker} data-animation="opacity-up">{heading}</h3>
        <p className={styles.desc} data-animation="opacity-up">
          {description}
        </p>

        <div className={styles.boxes_grid}>
          {gridBoxes.map((box, idx) => (
            <div key={idx} className={styles.box}>
              <h3>{box.heading}</h3>
              <div className={styles.btns}>
                <Link
                  href={box.appleHref}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image
                    width={151}
                    height={36}
                    loading="eager"
                    src={box.img1}
                    alt="Download on the App Store"
                  />
                </Link>
                <Link
                  href={box.playHref}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image
                    width={129}
                    height={36}
                    loading="eager"
                    src={box.img2}
                    alt="Get it on Google Play"
                  />
                </Link>
              </div>
            </div>
          ))}
        </div>
        {/* <ContactCtaBtn variant="orange" /> */}
      </div>
    </section>
  );
}

/** One gradient pill: title + App Store / Google Play (e.g. consumer app CTA). */
export function TextCenterAppCard({
  title = 'Consumer App',
  appleHref = 'https://apps.apple.com/us/app/pay10-bahrain/id6758339638',
  playHref = 'https://play.google.com/store/apps/details?id=bh.payten.wallet.app&hl=en',
  appStoreImgSrc = '/images/foo-app1.svg',
  googlePlayImgSrc = '/images/foo-app2.svg',
}) {
  return (
    <section className={styles.bannerSingle}>
      <div className={styles.singleCard}>
        <h3 className={styles.singleCardTitle}>{title}</h3>
        <div className={styles.btns}>
          <Link href={appleHref} target="_blank" rel="noopener noreferrer">
            <Image
              width={151}
              height={36}
              loading="eager"
              src={appStoreImgSrc}
              alt="Download on the App Store"
            />
          </Link>
          <Link href={playHref} target="_blank" rel="noopener noreferrer">
            <Image
              width={129}
              height={36}
              loading="eager"
              src={googlePlayImgSrc}
              alt="Get it on Google Play"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
