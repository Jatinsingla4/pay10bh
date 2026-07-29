import React from "react";
import { fetchPageData } from "../lib/fetchPageData";
import Pay10CardClient from "./Pay10CardClient";

export async function generateMetadata() {
  const data = await fetchPageData('pay10-card');
  if (data?.seo) {
    return {
      title: data.seo.title || "Pay10 Card | Pay10 UAE",
      description: data.seo.description || "The first local Debit Card accredited by the Central Bank of Bahrain - instant, secure, and seamless.",
    };
  }
  return {
    title: "Pay10 Card | Pay10 UAE",
    description: "The first local Debit Card accredited by the Central Bank of Bahrain - instant, secure, and seamless.",
  };
}

export default async function Pay10CardPage() {
  const data = await fetchPageData('pay10-card');
  return <Pay10CardClient pageData={data} />;
}
