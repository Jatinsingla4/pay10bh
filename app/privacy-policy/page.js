import React from "react";
import PrivacyClient from "./PrivacyClient";

export const metadata = {
  title: "Privacy Policy \u2013 Pay 10",
  description: "Read the Privacy Policy of Pay10 to understand how we collect, use, protect, and handle your personal data.",
  alternates: {
    canonical: "https://pay10.bh/privacy-policy",
  },
};

export default function PrivacyPolicyPage() {
  return <PrivacyClient />;
}
