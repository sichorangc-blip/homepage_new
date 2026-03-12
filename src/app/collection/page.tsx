export const dynamic = 'force-dynamic';

import Header from '@/components/site/Header';
import Footer from '@/components/site/Footer';
import CollectionCard from '@/components/site/CollectionCard';
import { getCollections } from '@/lib/data/content';

export default async function CollectionListPage() {
  const collections = await getCollections();

  return (
    <>
      <Header />
      <main className="container-p py-12">
        <h1 className="text-3xl md:text-5xl mb-6">Collection</h1>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">{collections.map(c => <CollectionCard key={c.id} item={c} />)}</div>
      </main>
      <Footer />
    </>
  );
}
