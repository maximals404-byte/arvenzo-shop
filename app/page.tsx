import { getAllProducts } from '@/lib/shopify';
import Hero from '@/components/Hero';
import Marquee from '@/components/Marquee';
import TrustBar from '@/components/TrustBar';
import FeaturedProducts from '@/components/FeaturedProducts';
import CollectionSpotlight from '@/components/CollectionSpotlight';
import BrandStory from '@/components/BrandStory';
import Reviews from '@/components/Reviews';
import Newsletter from '@/components/Newsletter';

export const revalidate = 300;

export default async function HomePage() {
  const products = await getAllProducts();

  return (
    <>
      <Hero />
      <Marquee />
      <TrustBar />
      <FeaturedProducts products={products} />
      <CollectionSpotlight products={products} />
      <BrandStory />
      <Reviews />
      <Newsletter />
    </>
  );
}
