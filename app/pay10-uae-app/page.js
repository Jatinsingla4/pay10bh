import React from "react";
import { fetchPageData } from "../lib/fetchPageData";
import Pay10UAEAppClient from "./Pay10UAEAppClient";

export async function generateMetadata() {
  const data = await fetchPageData('pay10-uae-app');
  if (data?.seo) {
    return {
      title: data.seo.title || "Pay10 UAE | Pay10 UAE",
      description: data.seo.description || "Download the Pay10 UAE to manage your bills, cards, and WPS salary transfers on the go.",
      alternates: { canonical: "https://pay10.ae/pay10-uae-app" },
    };
  }
  return {
    title: "Pay10 UAE | Pay10 UAE",
    description: "Download the Pay10 UAE to manage your bills, cards, and WPS salary transfers on the go.",
    alternates: { canonical: "https://pay10.ae/pay10-uae-app" },
  };
}

export default async function Page() {
  const data = await fetchPageData('pay10-uae-app');
  return <Pay10UAEAppClient pageData={data} />;
}
