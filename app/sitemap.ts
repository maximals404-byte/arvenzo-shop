import { MetadataRoute } from 'next';
import { getAllProducts } from '@/lib/shopify';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await getAllProducts();

  const productUrls: MetadataRoute.Sitemap = products.map(p => ({
    url: `https://www.arvenzo.be/products/${p.handle}`,
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  return [
    { url: 'https://www.arvenzo.be', changeFrequency: 'weekly', priority: 1.0 },
    { url: 'https://www.arvenzo.be/products', changeFrequency: 'daily', priority: 0.9 },
    ...productUrls,
    { url: 'https://www.arvenzo.be/about', changeFrequency: 'monthly', priority: 0.7 },
    { url: 'https://www.arvenzo.be/faq', changeFrequency: 'monthly', priority: 0.7 },
    { url: 'https://www.arvenzo.be/contact', changeFrequency: 'monthly', priority: 0.7 },
    { url: 'https://www.arvenzo.be/shipping', changeFrequency: 'monthly', priority: 0.5 },
    { url: 'https://www.arvenzo.be/returns', changeFrequency: 'monthly', priority: 0.5 },
    { url: 'https://www.arvenzo.be/sizing', changeFrequency: 'monthly', priority: 0.5 },
  ];
}
