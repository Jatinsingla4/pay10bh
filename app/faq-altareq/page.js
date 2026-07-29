import FaqsAltareqClient from './FaqsAltareqClient';

export const metadata = {
  title: 'Merchant Terms and Conditions | Pay10',
  description: 'Merchant Terms and Conditions governing the use of Pay10 Services by merchants in the Kingdom of Bahrain.',
};

export default function FaqAltareqPage() {
  return (
    <main style={{ backgroundColor: '#ffffff', paddingTop: '80px', paddingBottom: '80px' }}>
      <FaqsAltareqClient />
    </main>
  );
}
