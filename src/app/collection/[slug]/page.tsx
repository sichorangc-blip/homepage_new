import Header from '@/components/site/Header';
import Footer from '@/components/site/Footer';
import { collections } from '@/lib/mock-data';
import Image from 'next/image';
import { notFound } from 'next/navigation';

export default function CollectionDetailPage({ params }: { params: { slug: string } }) {
  const item = collections.find(c => c.slug === params.slug);
  if (!item) return notFound();

  return (
    <>
      <Header />
      <main className="container-p py-10">
        <div className="relative aspect-[4/5] md:aspect-[16/7] rounded-xl overflow-hidden mb-6">
          <Image src={item.cover} alt={item.title} fill className="object-cover" />
        </div>
        <p className="text-muted text-sm">{item.season}</p>
        <h1 className="text-3xl md:text-5xl mb-3">{item.title}</h1>
        <p className="max-w-2xl leading-7">{item.summary}</p>
      </main>
      <Footer />
    </>
  );
}
