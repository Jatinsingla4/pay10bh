import React from "react";
import { fetchPageData, fetchPageMeta } from "../lib/fetchPageData";
import ChannelPartnersClient from "./ChannelPartnersClient";

export async function generateMetadata() {
  return fetchPageMeta('channel-partners', {
    title: "Channel Partners – Pay 10",
    description: "Unlock new revenue by adding Pay10's payment methods to your platform.",
    alternates: { canonical: "https://pay10.bh/channel-partners" },
  });
}

export default async function page() {
  const data = await fetchPageData('channel-partners');
  return <ChannelPartnersClient pageData={data} />;
}
