import { defaultMetadata } from "../../lib/metadata";
import { API_BASE, API_HEADERS } from "../../lib/fetchPageData";
import BlogDetailClient from "./BlogDetailClient";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  try {
    const res = await fetch(`${API_BASE}/blogs/${slug}`, {
      next: { revalidate: 60 },
      headers: API_HEADERS,
      signal: AbortSignal.timeout(15000),
    });
    if (res.ok) {
      const data = await res.json();
      if (data?.data?.seo) {
        return {
          ...defaultMetadata,
          title: data.data.seo.title || `${data.data.title} | Pay10`,
          description: data.data.seo.description || data.data.subtitle || defaultMetadata.description,
        };
      } else if (data?.data) {
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
    title: "Blog | Pay10",
  };
}

async function getBlogData(slug) {
  try {
    const res = await fetch(`${API_BASE}/blogs/${slug}`, {
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

export default async function BlogDetail({ params }) {
  const { slug } = await params;
  const data = await getBlogData(slug);
  
  return (
    <>
      <BlogDetailClient initialData={data} />
    </>
  );
}
