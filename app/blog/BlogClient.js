"use client";

import React from "react";
import Link from "next/link";
import Style from "./blog.module.scss";
import { Icon } from "@iconify/react";
import { sanitizeHtml } from "../lib/sanitizeHtml";
import ComingSoon from "../components/ui/ComingSoon";


const formatDate = (dateStr) => {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return date.toLocaleDateString('en-US', options);
};

// Simple strip HTML function for summary
const stripHtml = (html) => {
  if (!html) return "";
  return html.replace(/<[^>]+>/g, '').substring(0, 150) + "...";
};

export default function BlogClient({ initialBlogs = [] }) {
  if (initialBlogs.length === 0) {
    return <ComingSoon />;
  }

  const featuredPost = initialBlogs[0];
  const restPosts = initialBlogs.slice(1);

  return (
    <main className={Style.blogListing}>
      <div className={Style.blog_banner}>
        <div className={Style.wrapper}>
          <div className={Style.blog_content}>
            <div className={Style.blog_banner_headings}>
              <h5 data-animation="opacity-up">Pay10 Blog</h5>
              <h2 data-animation="opacity-up">
                Get the latest tips and guides on how to stay ahead in the world
                of digital payments
              </h2>
            </div>

            <div className={Style.blog_banner_content}>
              <div className={Style.blog_banner_left_img}>
                {featuredPost.website_banner && (
                  <img
                    src={featuredPost.website_banner}
                    alt={featuredPost.title}
                    className={Style.latestPostImage}
                    data-animation="scale-up"
                    style={{ width: "100%", height: "auto", borderRadius: "12px", objectFit: "cover" }}
                  />
                )}
              </div>
              <div
                className={Style.blog_banner_right_content}
                data-animation="opacity-up"
              >
                <h6>{featuredPost.author || "Pay10"} &nbsp;|&nbsp; {formatDate(featuredPost.published_date)}</h6>
                <h3>{featuredPost.title}</h3>
                <p>{featuredPost.subtitle || stripHtml(featuredPost.summary)}</p>
                <div className={Style.featuredBottom}>
                  <Link
                    href={`/blog/${featuredPost.slug}`}
                    className={Style.blog_content_icon}
                  >
                    <Icon icon="carbon:arrow-right" width={20} height={20} />
                  </Link>
                  <div className={Style.shareRow}>
                    <span>Share:</span>
                    <a
                      href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`https://www.pay10.bh/blog/${featuredPost.slug}`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={Style.shareBtn}
                      aria-label="Share on LinkedIn"
                    >
                      <Icon icon="mdi:linkedin" />
                    </a>
                    <a
                      href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(`https://www.pay10.bh/blog/${featuredPost.slug}`)}&text=${encodeURIComponent(featuredPost.title)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={Style.shareBtn}
                      aria-label="Share on X"
                    >
                      <Icon icon="ri:twitter-x-fill" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {restPosts.length > 0 && (
        <section className={Style.wrapper}>
          <div className={Style.blog_boxes_main}>
            {restPosts.map((post, idx) => (
              <div
                key={post.id}
                className={Style.blog_box_content}
                data-animation="opacity-up"
                data-anim-delay={Math.min(idx * 100, 600)}
              >
                <div className={Style.blog_img}>
                  {post.website_banner && (
                    <img
                      src={post.website_banner}
                      alt={post.title}
                      className={Style.blogCardImage}
                      style={{ width: "100%", height: "240px", objectFit: "cover", borderRadius: "12px" }}
                    />
                  )}
                </div>
                <p className={Style.blog_smalltxt}>
                  {post.category || "General"} &nbsp;|&nbsp; {formatDate(post.published_date)}
                </p>
                <h3 className={Style.blog_heading}>{post.title}</h3>
                <p className={Style.blog_desc}>{post.subtitle || stripHtml(post.summary)}</p>
                <div className={Style.cardFooter}>
                  <Link href={`/blog/${post.slug}`} className={Style.readMoreLink}>
                    <span>Read More</span>
                    <Icon icon="fa6-solid:angle-right" />
                  </Link>
                  <div className={Style.shareRow}>
                    <span>Share:</span>
                    <a
                      href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`https://www.pay10.bh/blog/${post.slug}`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={Style.shareBtn}
                      aria-label="Share on LinkedIn"
                    >
                      <Icon icon="mdi:linkedin" />
                    </a>
                    <a
                      href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(`https://www.pay10.bh/blog/${post.slug}`)}&text=${encodeURIComponent(post.title)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={Style.shareBtn}
                      aria-label="Share on X"
                    >
                      <Icon icon="ri:twitter-x-fill" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
