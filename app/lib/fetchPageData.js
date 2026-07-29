export const API_BASE = process.env.NEXT_PUBLIC_API;
const API_KEY = process.env.BACKEND_AUTH_KEY;

export const API_HEADERS = {
  'X-Api-Key': API_KEY,
  'Origin': process.env.BACKEND_ORIGIN_OVERRIDE || API_BASE?.replace('/api', ''),
};

export async function fetchPageData(slug) {
  try {
    const res = await fetch(`${API_BASE}/pages/${slug}`, {
      next: { revalidate: 0 },
      headers: API_HEADERS,
    });
    if (!res.ok) return null;
    return (await res.json())?.data ?? null;
  } catch {
    return null;
  }
}

export async function fetchPageMeta(slug, fallback) {
  try {
    const data = await fetchPageData(slug);
    if (data?.seo) return { title: data.seo.title, description: data.seo.description };
  } catch {}
  return fallback;
}
