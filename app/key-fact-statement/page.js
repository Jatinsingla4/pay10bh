import KfsClient from './KfsClient';

export const metadata = {
  title: "Key Fact Statement \u2013 Pay 10",
  description: "Read the Key Fact Statement for Pay10 Customer Wallet and Bizz App to understand the transaction fees, limits, and product guidelines.",
  alternates: {
    canonical: "https://pay10.bh/key-fact-statement",
  },
};

export default function KeyFactStatementPage() {
  return (
    <main style={{ backgroundColor: '#ffffff', paddingTop: '80px', paddingBottom: '80px' }}>
      <KfsClient />
    </main>
  );
}
