import React from "react";
import EventsClient from "./EventsClient";
import { API_BASE, API_HEADERS, fetchPageData } from "../lib/fetchPageData";

export const metadata = {
  title: "Events | Pay10",
  description: "Discover the events and conferences where Pay10 connects, innovates, and leads the future of digital payments.",
};

async function getEvents() {
  try {
    const res = await fetch(`${API_BASE}/events`, {
      next: { revalidate: 60 }, // Revalidate every 60 seconds
      headers: API_HEADERS,
      signal: AbortSignal.timeout(15000),
    });
    
    if (!res.ok) {
      console.error("Failed to fetch events:", res.statusText);
      return [];
    }

    const json = await res.json();
    return json?.data || [];
  } catch (error) {
    console.error("Error fetching events:", error);
    return [];
  }
}

export default async function EventsPage() {
  const events = await getEvents();
  const pageData = await fetchPageData('event-conferences');
  
  return <EventsClient initialEvents={events} pageData={pageData} />;
}
