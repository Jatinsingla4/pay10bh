import React from "react";
import { fetchPageData, fetchPageMeta } from "../lib/fetchPageData";
import PaymentGatewayClient from "./PaymentGatewayClient";

export async function generateMetadata() {
  return fetchPageMeta('payment-gateway', {
    title: "Payment Gateway – Pay 10",
    description: "The UAE's most trusted checkout buttons now on your store.",
    alternates: { canonical: "https://pay10.bh/payment-gateway" },
  });
}

export default async function page() {
  const data = await fetchPageData('payment-gateway');
  return <PaymentGatewayClient pageData={data} />;
}
