import TermsClient from './TermsClient';

export const metadata = {
  title: "Terms of Service \u2013 Pay 10",
  description: "Read the Terms of Service for Pay10 Payment Services Provider LLC, covering general consumer terms, bill payment, cards, and WPS employee rules.",
  alternates: {
    canonical: "https://pay10.bh/terms-of-service",
  },
};

export default function TermsOfServicePage() {
  return (
    <main style={{ backgroundColor: '#ffffff', paddingTop: '80px', paddingBottom: '80px' }}>
      <TermsClient />
    </main>
  );
}
