import React from "react";
import { fetchPageData, fetchPageMeta } from "../lib/fetchPageData";
import WPSPayrollClient from "./WPSPayrollClient";

export async function generateMetadata() {
  return fetchPageMeta('wps-payroll', {
    title: "WPS & Payroll – Pay 10",
    description: "UAE's seamless solution for salary compliance.",
    alternates: { canonical: "https://pay10.bh/wps-payroll" },
  });
}

export default async function page() {
  const data = await fetchPageData('wps-payroll');
  return <WPSPayrollClient pageData={data} />;
}
