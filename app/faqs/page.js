import { Suspense } from 'react';
import FaqsClient from './FaqsClient';

export const metadata = {
  title: "Faqs \u2013 Pay 10",
  description: "Find answers to frequently asked questions about Pay10 bill payments, card issuing, fraud reporting, WPS salary transfer, and apps.",
  alternates: {
    canonical: "https://pay10.bh/faqs",
  },
};

export default function FaqsPage() {
  return (
    <main style={{ backgroundColor: 'var(--body-bg)', paddingTop: '80px', paddingBottom: '80px' }}>
      <Suspense fallback={<div style={{ textAlign: 'center', padding: '100px 0' }}>Loading FAQs...</div>}>
        <FaqsClient />
      </Suspense>
    </main>
  );
}
