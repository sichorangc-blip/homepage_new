import Header from '@/components/site/Header';
import Footer from '@/components/site/Footer';
import { gallery } from '@/lib/mock-data';
import Image from 'next/image';

export default function GalleryPage() {
  return (
    <>
      <Header />
      <main className="container-p py-12">
        <h1 className="text-3xl md:text-5xl mb-8">Gallery</h1>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {gallery.map(g => (
            <figure key={g.id}>
              <div className="relative aspect-square rounded overflow-hidden"><Image src={g.image} alt={g.caption} fill className="object-cover" /></div>
              <figcaption className="text-xs text-muted mt-2">{g.caption}</figcaption>
            </figure>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
