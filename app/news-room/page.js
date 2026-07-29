import NewsRoomClient from "./NewsRoomClient";
import { API_BASE, API_HEADERS, fetchPageData } from "../lib/fetchPageData";

export const metadata = {
  title: "News Room | Pay10",
  description:
    "Explore Pay10 press releases, strategic announcements, and media updates from the Pay10 ecosystem.",
};

async function getNews() {
  try {
    const res = await fetch(`${API_BASE}/news`, {
      next: { revalidate: 60 },
      headers: API_HEADERS,
      signal: AbortSignal.timeout(15000),
    });

    if (!res.ok) {
      return [];
    }

    const data = await res.json();
    if (data.success && data.data) {
      return data.data;
    }
    return [];
  } catch (error) {
    console.error("Failed to fetch news:", error);
    return [];
  }
}

export default async function page() {
  const newsList = await getNews();
  const pageData = await fetchPageData('news-room');

  return (
    <>
      <NewsRoomClient initialNews={newsList} pageData={pageData} />
    </>
  );
}
