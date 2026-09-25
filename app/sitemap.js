export default function sitemap() {
  const base = process.env.SITE_URL || "http://localhost:3000";
  return [{ url: base, lastModified: new Date(), changeFrequency: "weekly", priority: 1 }];
}
