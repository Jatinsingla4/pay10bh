import React from "react";
import { fetchPageData } from "../lib/fetchPageData";
import BillPaymentClient from "./BillPaymentClient";

export async function generateMetadata() {
  const data = await fetchPageData('bill-payment');
  if (data?.seo) {
    return {
      title: data.seo.title || "Bill Payment | Pay10 UAE",
      description: data.seo.description || "Never miss a bill. Never switch apps again. All your UAE bills paid from one place.",
      alternates: { canonical: "https://pay10.bh/bill-payment" },
    };
  }
  return {
    title: "Bill Payment | Pay10 UAE",
    description: "Never miss a bill. Never switch apps again. All your UAE bills paid from one place.",
    alternates: { canonical: "https://pay10.bh/bill-payment" },
  };
}

export default async function BillPaymentPage() {
  const data = await fetchPageData('bill-payment');
  return <BillPaymentClient pageData={data} />;
}
