"use client";

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import faqData from './faqData';
import styles from './faqs.module.scss';
import { sanitizeHtml } from '../lib/sanitizeHtml';

export default function FaqsClient() {
  const searchParams = useSearchParams();
  const categoryQuery = searchParams.get('category');

  const [activeTabName, setActiveTabName] = useState(
    categoryQuery && faqData.some(tab => tab.tabName === categoryQuery) 
      ? categoryQuery 
      : faqData[0]?.tabName || ''
  );
  const [openIndex, setOpenIndex] = useState(null);

  useEffect(() => {
    if (categoryQuery && faqData.some(tab => tab.tabName === categoryQuery)) {
      setActiveTabName(categoryQuery);
      setOpenIndex(null);
    }
  }, [categoryQuery]);

  const handleTabChange = (tabName) => {
    setActiveTabName(tabName);
    setOpenIndex(null); // Close any open accordion items when switching tabs
  };

  const toggleAccordion = (index) => {
    if (openIndex === index) {
      setOpenIndex(null); // Collapse if clicking the already open item
    } else {
      setOpenIndex(index); // Expand the clicked item and collapse others
    }
  };

  const activeTab = faqData.find((tab) => tab.tabName === activeTabName) || faqData[0];

  return (
    <div className={styles.faqs_container}>
      <h1 className={styles.title} data-animation="opacity-up">FREQUENTLY ASKED QUESTIONS</h1>

      <div className={styles.layout}>
        {/* Left Sidebar on Desktop / Scrollable Pills Row on Mobile */}
        <aside className={styles.sidebar} data-animation="opacity-up" data-anim-delay="100">
          {faqData.map((tab) => {
            const isActive = tab.tabName === activeTabName;
            return (
              <button
                key={tab.tabName}
                className={`${styles.tab_pill} ${isActive ? styles.active : styles.inactive}`}
                onClick={() => handleTabChange(tab.tabName)}
              >
                {tab.tabName}
              </button>
            );
          })}
        </aside>

        {/* Right Content Panel */}
        {/* No scroll-triggered animation here — this panel's height varies
            with the active tab's FAQ count and can be very tall, and the
            global IntersectionObserver's ratio-based threshold (0.1) never
            reliably fires for a container that tall, leaving it stuck
            invisible. Render it plainly instead. */}
        <div className={styles.content_panel}>
          <h2 className={styles.tab_heading}>{activeTab?.tabName}</h2>
          
          <div className={styles.accordion_list}>
            {activeTab?.faqs.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div key={index} className={styles.accordion_item}>
                  <button
                    className={`${styles.accordion_trigger} ${isOpen ? styles.active_trigger : ''}`}
                    onClick={() => toggleAccordion(index)}
                    aria-expanded={isOpen}
                  >
                    <h3>{faq.question}</h3>
                    <div className={styles.icon_wrapper}>
                      <svg
                        xmlns="http://www.w3.org/2005/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </button>
                  
                  <div
                    className={`${styles.accordion_content} ${isOpen ? styles.open_content : ''}`}
                    style={isOpen ? { maxHeight: '1000px' } : { maxHeight: '0px' }}
                  >
                    <p className={styles.answer_text} dangerouslySetInnerHTML={{ __html: sanitizeHtml(faq.answer) }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
