export const dynamic = 'force-dynamic';

import Header from '@/components/site/Header';
import Footer from '@/components/site/Footer';
import HeroSection from '@/components/site/HeroSection';
import CollectionCard from '@/components/site/CollectionCard';
import { getBanners, getCollections, getGallery, getSiteSettings } from '@/lib/data/content';
import { banners as fallbackBanners } from '@/lib/mock-data';
import Image from 'next/image';

export default async function HomePage() {
  const [banners, collections, gallery, settings] = await Promise.all([getBanners(), getCollections(), getGallery(), getSiteSettings()]);
  const heroBanner = banners[0] ?? fallbackBanners[0];

  return (
    <>
      <Header />
      <HeroSection banner={heroBanner} />
      <section className="container-p py-8">
        <p className="text-sm text-muted mb-2">Brand Message</p>
        <h2 className="text-2xl md:text-4xl max-w-3xl">{settings.heroTitle}</h2>
        <p className="mt-3 text-muted">{settings.heroSubtitle}</p>
      </section>
      <section className="container-p py-8">
        <h2 className="text-xl mb-4">{settings.featuredTitle}</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">{collections.map(c => <CollectionCard key={c.id} item={c} />)}</div>
      </section>
      <section className="container-p py-8">
        <h2 className="text-xl mb-4">{settings.galleryTitle}</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {gallery.map(g => (
            <div key={g.id} className="relative aspect-square rounded overflow-hidden bg-stone-100">
              <Image src={g.image} alt={g.caption} fill className="object-cover" unoptimized />
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </>
  );
}
