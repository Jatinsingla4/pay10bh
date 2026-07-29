"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Icon } from "@iconify/react";
import styles from "./news-room.module.scss";
import { isEmptyHtml } from "../lib/sanitizeHtml";

const firstNonEmptyHtml = (...vals) => vals.find(v => !isEmptyHtml(v)) ?? vals[vals.length - 1];

const FALLBACK_IMAGE = "/images/news_images/news_banner_img.png";

// Dynamic news list passed from server component

function formatDisplayDate(dateInput) {
  const parsed = new Date(dateInput);
  if (Number.isNaN(parsed.getTime())) return "DATE TBA";

  const day = parsed.getDate();
  const month = parsed.toLocaleString("en-US", { month: "long" }).toUpperCase();
  const year = parsed.getFullYear();

  const suffix =
    day % 10 === 1 && day % 100 !== 11 ? "ST"
    : day % 10 === 2 && day % 100 !== 12 ? "ND"
    : day % 10 === 3 && day % 100 !== 13 ? "RD"
    : "TH";

  return `${day}${suffix} ${month}, ${year}`;
}

export default function NewsRoomClient({ initialNews = [], pageData = null }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm.trim().toLowerCase());
    }, 350);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  const items = debouncedSearch
    ? initialNews.filter(
        (item) =>
          item.title?.toLowerCase().includes(debouncedSearch) ||
          item.content?.toLowerCase().includes(debouncedSearch)
      )
    : initialNews;

  return (
    <main className={styles.newsRoomMain}>
      <section 
        className={styles.bannerSection}
        style={{
          ...(pageData?.banner_image ? { '--bg-desktop': `url(${pageData.banner_image})` } : {}),
          ...(pageData?.mobile_image ? { '--bg-mobile': `url(${pageData.mobile_image})` } : (pageData?.banner_image ? { '--bg-mobile': `url(${pageData.banner_image})` } : {})),
        }}
      >
        <div className={styles.bannerOverlay} />
        <div className={styles.bannerContent}>
          <h1 dangerouslySetInnerHTML={{ __html: firstNonEmptyHtml(pageData?.page_title, "Press Releases") }} />
          <p dangerouslySetInnerHTML={{ __html: firstNonEmptyHtml(pageData?.page_subtitle, "Stay informed with the latest news, strategic announcements, and media updates directly from the Pay10 ecosystem.") }} />
        </div>
      </section>

      <section className={styles.wrapper}>
        <div className={styles.searchRow} data-animation="scale-up">
          <label htmlFor="news-room-search" className={styles.searchField}>
            <Icon icon="mdi:magnify" aria-hidden="true" />
            <input
              id="news-room-search"
              type="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search press releases, news, and announcements..."
              aria-label="Search press releases"
            />
          </label>
        </div>

        <div className={styles.cardsGrid}>
          {items.length === 0 ? (
            <div className={styles.emptyState}>No press releases found.</div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className={styles.newsCard}
                data-animation="opacity-up"
              >
                <div className={styles.cardMedia}>
                  <img
                    src={item.image || FALLBACK_IMAGE}
                    alt={item.title || "News Article"}
                    className={styles.cardImage}
                  />
                </div>
                <div className={styles.cardBody}>
                  <p className={styles.cardDate}>{formatDisplayDate(item.posted_date)}</p>
                  <h3>{item.title}</h3>
                  <div 
                    className={styles.cardDesc} 
                    dangerouslySetInnerHTML={{ __html: item.content }} 
                  />
                  <div className={styles.cardFooter}>
                    {item.slug && (
                      <a
                        href={`/news-room/${item.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.readMoreBtn}
                      >
                        <span>Read More</span>
                        <Icon icon="fa6-solid:angle-right" />
                      </a>
                    )}
                    <div className={styles.shareRow}>
                      <span>Share:</span>
                      <a
                        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(item.slug ? `https://www.pay10.bh/news-room/${item.slug}` : 'https://www.pay10.bh/news-room')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.shareBtn}
                        aria-label="Share on LinkedIn"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Icon icon="mdi:linkedin" />
                      </a>
                      <a
                        href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(item.slug ? `https://www.pay10.bh/news-room/${item.slug}` : 'https://www.pay10.bh/news-room')}&text=${encodeURIComponent(item.title)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.shareBtn}
                        aria-label="Share on X"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Icon icon="ri:twitter-x-fill" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </main>
  );
}
