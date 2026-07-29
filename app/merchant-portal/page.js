import React from "react";
import { fetchPageData, fetchPageMeta } from "../lib/fetchPageData";
import MerchantPortalClient from "./MerchantPortalClient";

export async function generateMetadata() {
  return fetchPageMeta('merchant-portal', {
    title: "Merchant Portal – Pay 10",
    description: "A dedicated merchant portal with your own secure credentials giving you complete visibility of transactions, settlements, VAT reports, and live API integration with your ERP system.",
    alternates: { canonical: "https://pay10.bh/merchant-portal" },
  });
}

export default async function page() {
  const data = await fetchPageData('merchant-portal');
  return <MerchantPortalClient pageData={data} />;
}
