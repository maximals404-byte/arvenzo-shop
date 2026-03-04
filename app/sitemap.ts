import { MetadataRoute } from 'next';
import { getAllProducts } from '@/lib/shopify';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await getAllProducts();
  const now = new Date();

  const productUrls: MetadataRoute.Sitemap = products.map(p => ({
    url: `https://www.arvenzo.be/products/${p.handle}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  return [
    { url: 'https://www.arvenzo.be', lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
    { url: 'https://www.arvenzo.be/products', lastModified: now, changeFrequency: 'daily', priority: 0.9 },
    ...productUrls,
    { url: 'https://www.arvenzo.be/about', lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: 'https://www.arvenzo.be/faq', lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: 'https://www.arvenzo.be/contact', lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: 'https://www.arvenzo.be/shipping', lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    { url: 'https://www.arvenzo.be/returns', lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    { url: 'https://www.arvenzo.be/sizing', lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
  ];
}
