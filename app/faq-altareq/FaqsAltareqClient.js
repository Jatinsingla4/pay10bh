"use client";

import merchantTcsData from './merchantTcsData';
import styles from '../terms-of-service/terms_and_conditions.module.scss';
import { sanitizeHtml } from '../lib/sanitizeHtml';

export default function FaqsAltareqClient() {
  const activeTab = merchantTcsData[0];

  return (
    <div className={styles.terms_container}>
      <h1 className={styles.title} data-animation="fade-up">MERCHANT TERMS AND CONDITIONS</h1>

      <div className={styles.layout}>
        <aside className={styles.sidebar} data-animation="fade-up">
          <button className={`${styles.tab_pill} ${styles.active}`}>{activeTab?.tabName}</button>
        </aside>

        <main className={styles.content_panel}>
          <div
            className={styles.legal_content}
            dangerouslySetInnerHTML={{ __html: sanitizeHtml(activeTab?.content || '') }}
          />
        </main>
      </div>
    </div>
  );
}
