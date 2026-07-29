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
  const [data, homeData] = await Promise.all([
    fetchPageData('pay10-biz-uae-app'),
    fetchPageData('homepage'),
  ]);
  const testimonialVideos = homeData?.sections?.[5]?.videos || [];
  const logosSection = homeData?.sections?.find(s => s.title?.includes('Logos') || s.title?.includes('Get Started Today'));
  const merchantLogos = logosSection?.images || [];
  return <MerchantAppClient pageData={data} testimonialVideos={testimonialVideos} merchantLogos={merchantLogos} />;
}
