import Header from '@/components/site/Header';
import Footer from '@/components/site/Footer';
import HeroSection from '@/components/site/HeroSection';
import CollectionCard from '@/components/site/CollectionCard';
import { collections, gallery, siteCopy } from '@/lib/mock-data';
import Image from 'next/image';

export default function HomePage() {
  return (
    <>
      <Header />
      <HeroSection />
      <section className="container-p py-8">
        <p className="text-sm text-muted mb-2">Brand Message</p>
        <h2 className="text-2xl md:text-4xl max-w-3xl">{siteCopy.heroTitle}</h2>
      </section>
      <section className="container-p py-8">
        <h2 className="text-xl mb-4">Featured Collections</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">{collections.map(c => <CollectionCard key={c.id} item={c} />)}</div>
      </section>
      <section className="container-p py-8">
        <h2 className="text-xl mb-4">Gallery Preview</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {gallery.map(g => (
            <div key={g.id} className="relative aspect-square rounded overflow-hidden">
              <Image src={g.image} alt={g.caption} fill className="object-cover" />
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </>
  );
}
