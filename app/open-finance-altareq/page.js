import React from "react";
import { fetchPageData, fetchPageMeta } from "../lib/fetchPageData";
import OpenFinanceAltareqClient from "./OpenFinanceAltareqClient";

export async function generateMetadata() {
  return fetchPageMeta('open-finance-altareq', {
    title: "Open Finance Al Tareeq \u2013 Pay 10",
    description: "Connect to the Open Finance Al Tareeq platform by Pay10 for secure financial data sharing and interoperability in the UAE.",
    alternates: { canonical: "https://pay10.bh/open-finance-altareq" },
  });
}

export default async function page() {
  const data = await fetchPageData('open-finance-altareq');
  return <OpenFinanceAltareqClient pageData={data} />;
}
