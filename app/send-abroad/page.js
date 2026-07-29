import React from "react";
import { fetchPageData } from "../lib/fetchPageData";
import SendAbroadClient from "./SendAbroadClient";

export async function generateMetadata() {
  const data = await fetchPageData('send-abroad');
  if (data?.seo) {
    return {
      title: data.seo.title || "Send Abroad | Pay10 UAE",
      description: data.seo.description || "Your family shouldn't wait for their money. With Pay10 UAE Send Abroad, your transfer reaches your loved ones the same day - instantly.",
      alternates: { canonical: "https://pay10.bh/send-abroad" },
    };
  }
  return {
    title: "Send Abroad | Pay10 UAE",
    description: "Your family shouldn't wait for their money. With Pay10 UAE Send Abroad, your transfer reaches your loved ones the same day - instantly.",
    alternates: { canonical: "https://pay10.bh/send-abroad" },
  };
}

export default async function SendAbroadPage() {
  const data = await fetchPageData('send-abroad');
  return <SendAbroadClient pageData={data} />;
}
