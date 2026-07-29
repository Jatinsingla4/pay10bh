import { defaultMetadata } from "../../lib/metadata";
import { API_BASE, API_HEADERS } from "../../lib/fetchPageData";
import EventDetailClient from "./EventDetailClient";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  try {
    const res = await fetch(`${API_BASE}/events/${slug}`, {
      next: { revalidate: 60 },
      headers: API_HEADERS,
      signal: AbortSignal.timeout(15000),
    });
    if (res.ok) {
      const data = await res.json();
      if (data?.data) {
        return {
          ...defaultMetadata,
          title: `${data.data.title} | Pay10`,
          description: data.data.subtitle || defaultMetadata.description,
        };
      }
    }
  } catch (error) {}
  
  return {
    ...defaultMetadata,
    title: "Event | Pay10",
  };
}

async function getEventData(slug) {
  try {
    const res = await fetch(`${API_BASE}/events/${slug}`, {
      next: { revalidate: 60 },
      headers: API_HEADERS,
      signal: AbortSignal.timeout(15000),
    });
    if (!res.ok) return null;
    const json = await res.json();
    return json?.data || null;
  } catch (error) {
    return null;
  }
}

export default async function EventDetail({ params }) {
  const { slug } = await params;
  const data = await getEventData(slug);
  
  return (
    <>
      <EventDetailClient initialData={data} />
    </>
  );
}
