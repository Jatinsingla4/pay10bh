import React from "react";
import { fetchPageData, fetchPageMeta } from "../lib/fetchPageData";
import MerchantAppClient from "./MerchantAppClient";

export async function generateMetadata() {
  return fetchPageMeta('pay10-biz-uae-app', {
    title: "Pay10 Biz UAE \u2013 Pay 10",
    description: "Download the Pay10 Bizz App to manage your merchant account, track transactions, and accept digital payments.",
    alternates: { canonical: "https://pay10.ae/pay10-biz-uae-app" },
  });
}

export default async function page() {
  const data = await fetchPageData('pay10-biz-uae-app');
  return <MerchantAppClient pageData={data} />;
}
