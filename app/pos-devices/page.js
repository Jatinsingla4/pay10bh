import React from "react";
import { fetchPageData, fetchPageMeta } from "../lib/fetchPageData";
import { isEmptyHtml } from "../lib/sanitizeHtml";
import PosDevicesClient from "./PosDevicesClient";

export async function generateMetadata() {
  return fetchPageMeta('pos-devices', {
    title: "POS Devices – Pay 10",
    description: "The new way to pay at every counter in the UAE.",
    alternates: { canonical: "https://pay10.bh/pos-devices" },
  });
}

export default async function page() {
  const [data, homeData] = await Promise.all([
    fetchPageData('pos-devices'),
    fetchPageData('homepage'),
  ]);
  const testimonialSection = homeData?.sections?.find(s => s.title?.includes("Don't take our word") || s.title?.includes('merchants themselves')) || homeData?.sections?.[5] || {};
  const testimonialVideos = testimonialSection.videos || [];
  const testimonialTitle = testimonialSection.title || "Don't take our word for it. Hear it from the merchants themselves.";
  const testimonialContent = !isEmptyHtml(testimonialSection.content) ? testimonialSection.content : "<p>From small retailers to enterprise brands, businesses across the UAE are choosing Pay10 for faster settlements, lower costs, and support that actually shows up.</p>";
  
  const logosSection = homeData?.sections?.find(s => s.title?.includes('Logos') || s.title?.includes('Get Started Today'));
  const merchantLogos = logosSection?.images || [];
  return <PosDevicesClient pageData={data} testimonialVideos={testimonialVideos} testimonialTitle={testimonialTitle} testimonialContent={testimonialContent} merchantLogos={merchantLogos} />;
}
