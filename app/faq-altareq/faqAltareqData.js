import React from 'react';

const faqAltareqData = [
  {
    tabName: 'Introduction to Open Finance',
    faqs: [
      {
        question: '1. What is Open Finance?',
        answer: (
          <p>
            Open Finance gives you control over your financial data and services. With your permission, it lets you securely share your bank, insurance, mortgage, and other financial information and initiate services via regulated providers to access more personalised, innovative, and convenient financial services.
          </p>
        )
      },
      {
        question: '2. What is Open Finance called in the UAE?',
        answer: (
          <div>
            <p>
              Open Finance is known as AlTareq in the UAE. You will see this name and logo when using Open Finance services provided by banks or insurers, exchange houses or brokers, and Third-Party Providers. Examples include:
            </p>
            <ul>
              <li>An insurance comparison website</li>
              <li>An e-wallet and payments app</li>
              <li>A financial aggregation and insights app</li>
              <li>A foreign exchange comparison and money sending service</li>
            </ul>
          </div>
        )
      },
      {
        question: '3. Why was Open Finance introduced and how is it implemented in the UAE?',
        answer: (
          <p>
            The Central Bank of Bahrain (CBB) launched Open Finance to modernise the financial sector and give you more choice and convenience. AlTareq, the name for Open Finance in the UAE, will offer functionality that securely connects all Licensed Financial Institutions and Third-Party Providers/ apps via a central platform. Open Finance will support four key functionalities including data sharing, quote generation, service and transaction initiation, and onboarding to Licensed Financial Institutions. Open Finance is governed by principles that value consumer rights, access to financial data, ease of using services, and enhancing functionality and transparency.
          </p>
        )
      },
      {
        question: '4. Who is involved in Open Finance?',
        answer: (
          <ul>
            <li><strong>Central Bank of Bahrain (CBB):</strong> The regulator ensuring the safety, transparency, and fairness of the Open Finance ecosystem.</li>
            <li><strong>Nebras:</strong> The operator of the central platform for Open Finance and manager of initiative for the UAE.</li>
            <li><strong>Licensed Financial Institutions (LFIs):</strong> Banks, insurers, exchange houses, e-wallets, and finance houses licensed by the CBB to securely share consented user data with Third-Party Providers.</li>
            <li><strong>Third-Party Providers (TPP):</strong> Regulated providers utilising open finance functionalities to provide new ways to use financial services.</li>
            <li><strong>Users:</strong> Consumers and businesses as end users of AlTareq services who benefit from innovative services provided by regulated TPPs.</li>
          </ul>
        )
      },
      {
        question: '5. How does Open Finance work?',
        answer: (
          <p>
            With your explicit consent, Open Finance allows regulated TPPs to securely connect to banks, insurance companies, exchange houses and other organisations. The connection is made via an Application Programming Interface (API); this is the same type of connection your mobile phone uses to connect your photos app to your social media apps. However, we add the highest grade of security to the connection. This enables TPPs to offer enhanced financial products and services tailored to your needs.
          </p>
        )
      }
    ]
  },
  {
    tabName: 'Getting Started',
    faqs: [
      {
        question: '1. Who benefits from Open Finance services?',
        answer: (
          <p>
            Open Finance empowers both individuals and businesses by providing them with access to an enhanced range of financial products and services.
          </p>
        )
      },
      {
        question: '2. How do I start using Open Finance services?',
        answer: (
          <p>
            You can access Open Finance services through regulated TPP apps or platforms once you give consent for data sharing/ service initiation to a specific provider.
          </p>
        )
      },
      {
        question: '3. What is the AlTareq Consent Mobile App?',
        answer: (
          <p>
            The AlTareq Consent Mobile App allows you to give permission and manage what financial data you share through Open Finance. It's a trusted, centralised app that lets you approve payments, share data, and control all your consents, in one place, across LFIs and TPPs.
          </p>
        )
      },
      {
        question: '4. Am I automatically enrolled in Open Finance?',
        answer: (
          <div>
            <p>
              No, Open Finance is completely voluntary. You will need to actively give consent before any data is shared or services are provided. You can manage or cancel your consent at any time through:
            </p>
            <ul>
              <li>Your LFI's platform</li>
              <li>Your TPP's platform</li>
              <li>AlTareq Consent Mobile App</li>
            </ul>
          </div>
        )
      },
      {
        question: '5. How does Open Finance benefit me?',
        answer: (
          <div>
            <p>Open Finance enhances how you access and leverage financial services through:</p>
            <ul>
              <li><strong>Secure data sharing:</strong> Track your spending, get insights, and use financial tools tailored to you.</li>
              <li><strong>Streamlined service initiation:</strong> Make any type of payment, open new accounts, execute contracts, and complete transactions - all in a faster, more streamlined way that's even possible to be embedded within a non-financial service.</li>
              <li><strong>Product and service quote generation:</strong> Compare insurance, banking, and exchange offers quickly and easily and select the best fit for you.</li>
            </ul>
          </div>
        )
      },
      {
        question: '6. Where can I find more information on Open Finance?',
        answer: (
          <p>
            You can find additional details on the Nebras website.
          </p>
        )
      }
    ]
  },
  {
    tabName: 'Open Finance Security Controls',
    faqs: [
      {
        question: '1. Is Open Finance safe?',
        answer: (
          <p>
            Yes, your safety and privacy are at the heart of Open Finance. Only providers that are licensed and regulated by the CBB can access your data, and only with your clear, informed consent. Open Finance is built with world-class levels of protection, using advanced security tools like multi-factor authentication and encryption to ensure your information and the financial services you avail stay private and secure.
          </p>
        )
      },
      {
        question: '2. What security features are in place?',
        answer: (
          <div>
            <p>Open Finance uses multiple layers of protection to ensure security:</p>
            <ul>
              <li><strong>Strict oversight:</strong> All providers are regulated and closely monitored by the CBB to ensure they meet the highest standards of security and reliability.</li>
              <li><strong>Your control, always:</strong> You decide who gets access to your data/ services and for how long. You can pause or revoke your consent at any time.</li>
              <li><strong>Strong identity protection:</strong> Multi-factor authentication offers security every time you give consent or initiate services.</li>
              <li><strong>Private by design:</strong> End-to-end encryption ensures your data is protected whenever using AlTareq-based services.</li>
            </ul>
          </div>
        )
      },
      {
        question: '3. What is multi-factor authentication?',
        answer: (
          <div>
            <p>
              Multi-factor authentication adds an extra layer of security to verify your identity when giving consent to data sharing or service initiation. It requires you to provide at least two of the following forms of identification:
            </p>
            <ol>
              <li>Something you know (like a password),</li>
              <li>Something you have (like an authentication app), or</li>
              <li>Something you are (like facial recognition).</li>
            </ol>
          </div>
        )
      },
      {
        question: '4. How do I give consent?',
        answer: (
          <p>
            Consent will be initiated through your TPP's app and consent authorisation will be confirmed either through your LFI's app or the AlTareq Consent Mobile App. You can view, pause, or cancel your consent at any time through any of the abovementioned platforms.
          </p>
        )
      },
      {
        question: '5. What types of data are shared through Open Finance?',
        answer: (
          <div>
            <p>With your consent, Open Finance allows the sharing of:</p>
            <ul>
              <li>Account details such as account name, account number, account balance, and transaction history.</li>
              <li>Insurance information such as policy numbers, coverage specifics, and claims history.</li>
              <li>Foreign exchange data such as currency types, transaction amounts, exchange rates, and transaction dates.</li>
              <li>Payment details such as direct debits, standing orders, and the updated account balance after each transaction.</li>
              <li>Personal details such as name, address, and employment information.</li>
            </ul>
          </div>
        )
      },
      {
        question: '6. How do I revoke or suspend consent for data sharing or service initiation?',
        answer: (
          <div>
            <p>You can revoke or temporarily suspend consent through:</p>
            <ul>
              <li>Through your LFI/ TPP's app</li>
              <li>Through the AlTareq Consent App</li>
            </ul>
            <p>You can view, pause, or cancel your consent at any time.</p>
          </div>
        )
      },
      {
        question: '7. How long is my consent active?',
        answer: (
          <p>
            Consent automatically expires after one year. You will need to extend consent if you want the AlTareq-based services to continue. You can also temporarily suspend or completely revoke consent at any time through your LFI/ TPP platform or the AlTareq Consent Mobile App, giving you control over your data-sharing preferences and service initiation permissions.
          </p>
        )
      },
      {
        question: '8. Who controls my personal data?',
        answer: (
          <p>
            You have control over your personal data. You decide who sees your data, what they see, and when they can see it. You can stop providing access at any time and when you do, the TPPs are obliged to delete your data which is not required to be retained by law or regulation.
          </p>
        )
      },
      {
        question: '9. Are there regulations/ legislation that protect users?',
        answer: (
          <p>
            Yes, the CBB Open Finance Regulation establishes a comprehensive framework for the licensing, supervision, and operation of Open Finance in the UAE. It outlines the requirements and license conditions for Open Finance Third-Party Providers, ensuring that only regulated organisations can engage in data sharing and service initiation. For more detailed information, please refer to the Open Finance Regulation.
          </p>
        )
      },
      {
        question: '10. What happens if a security breach occurs?',
        answer: (
          <p>
            If a security breach occurs, the bank, insurer, or TPP must notify you immediately and address the issue. Open Finance uses centrally operated security measures to prevent this from happening. There is a comprehensive liability model for AlTareq which compensates users in the event of any performance issue or security breach, in addition to the protection provided by UAE law.
          </p>
        )
      },
      {
        question: '11. What happens if suspicious activity is detected in my account?',
        answer: (
          <p>
            If suspicious activity is detected, the LFI may trigger security protocols, such as requiring additional authentication, temporarily blocking transactions, or notifying the user for manual verification. If fraudulent activity is confirmed, the concerned LFI or TPP must take corrective action.
          </p>
        )
      },
      {
        question: '12. How do I check if a provider is regulated?',
        answer: (
          <p>
            You can find this information in the AlTareq directory on the Nebras website.
          </p>
        )
      }
    ]
  },
  {
    tabName: 'Payments and Transactions',
    faqs: [
      {
        question: '1. What types of payments can I make using Open Finance?',
        answer: (
          <p>
            Open Finance supports initiating a variety of payments with your explicit consent, including single instant payments, recurring transactions, bulk payments, future-dated transfers, and international payments. Your bank or other LFI will still make the payment initiated by the TPP.
          </p>
        )
      },
      {
        question: '2. How can I track the payments I made through Open Finance?',
        answer: (
          <p>
            You can track Open Finance payments through your LFI's platform or the TPP that initiated the transaction. You can check if a payment has been completed, failed, or is still pending through their transaction history.
          </p>
        )
      },
      {
        question: '3. What happens if my Open Finance payment fails?',
        answer: (
          <p>
            If an Open Finance payment fails, the concerned TPP or LFI will immediately notify you of the transaction failure. Possible reasons include insufficient funds, authentication errors, or a processing error at the receiving institution. The TPP or LFI will guide you on corrective actions. You can also check the payment status through their provider's transaction history.
          </p>
        )
      }
    ]
  },
  {
    tabName: 'User Support',
    faqs: [
      {
        question: '1. How does Open Finance ensure a user-friendly experience?',
        answer: (
          <div>
            <p>LFIs and TPPs are required to deliver a consistent and user-friendly digital experience by Nebras. The standardised experience includes helpful features such as:</p>
            <ul>
              <li><strong>Giving consent</strong> - When giving consent to any TPP from any LFI, users will always experience the same customer journey and the same format of information about the consent.</li>
              <li><strong>Managing consent</strong> - You will always be able to easily view, manage, or revoke your permissions with any TPP or LFI.</li>
              <li><strong>Tracking transactions</strong> - Keep track of your transactions so you always know what's happening with your money.</li>
            </ul>
          </div>
        )
      },
      {
        question: '2. How can I address issues arising from Open Finance-related activities?',
        answer: (
          <p>
            To address issues encountered with Open Finance-related activities, you should first raise the concern with the relevant LFI or TPP involved. If the LFI or TPP have a resulting issue between each other, this will be reviewed and determined by Nebras and the CBB. If your issue is still not resolved by these processes, you can escalate the matter to Sanadak for further assistance.
          </p>
        )
      },
      {
        question: '3. What is Sanadak?',
        answer: (
          <p>
            Sanadak is an impartial entity dedicated to investigating and resolving complaints from users in the financial services sector, ensuring a fair and unbiased dispute resolution process. It is the first financial and insurance ombudsman unit in the Middle East and North Africa (MENA) region, setting a new standard for consumer protection in the region.
          </p>
        )
      },
      {
        question: '4. What type of complaints does Sanadak handle in respect to Open Finance?',
        answer: (
          <div>
            <p>Sanadak handles two types of user complaints:</p>
            <ul>
              <li>
                <strong>Data Sharing Issues:</strong>
                <ul>
                  <li>Unauthorised data sharing</li>
                  <li>Data inaccuracies</li>
                  <li>Consent-related issues</li>
                </ul>
              </li>
              <li>
                <strong>Service Initiation Issues:</strong>
                <ul>
                  <li>Unauthorised payments</li>
                  <li>Transaction errors</li>
                  <li>Delayed transactions</li>
                </ul>
              </li>
            </ul>
          </div>
        )
      }
    ]
  },
  {
    tabName: 'Glossary',
    faqs: [
      {
        question: '1. Open Finance',
        answer: (
          <p>
            An initiative where customers can safely share their financial data with apps and services they trust.
          </p>
        )
      },
      {
        question: '2. AlTareq',
        answer: (
          <p>
            The UAE's national Open Finance initiative connecting banks and apps securely.
          </p>
        )
      },
      {
        question: '3. CBB',
        answer: (
          <p>
            Central Bank of the United Arab Emirates, regulator of Open Finance framework.
          </p>
        )
      },
      {
        question: '4. Licensed Financial Institution (LFI)',
        answer: (
          <p>
            A bank or financial institution regulated by the Central Bank of Bahrain.
          </p>
        )
      },
      {
        question: '5. Third-Party Provider (TPP)',
        answer: (
          <p>
            A company regulated by CBB to access financial data or initiate services with customer consent.
          </p>
        )
      },
      {
        question: '6. Consent',
        answer: (
          <p>
            Customer's clear permission before sharing their data or initiating a service.
          </p>
        )
      },
      {
        question: '7. Data Sharing',
        answer: (
          <p>
            The process of sending user-approved financial information to authorised apps or services.
          </p>
        )
      }
    ]
  }
];

export default faqAltareqData;
