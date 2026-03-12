import Link from 'next/link';
import Image from 'next/image';
import { Collection } from '@/types';

export default function CollectionCard({ item }: { item: Collection }) {
  return (
    <Link href={`/collection/${item.slug}`} className="block group">
      <div className="relative aspect-[3/4] overflow-hidden rounded-lg">
        <Image src={item.cover} alt={item.title} fill className="object-cover group-hover:scale-105 transition" />
      </div>
      <div className="pt-3">
        <p className="text-xs text-muted">{item.season}</p>
        <h3 className="font-medium">{item.title}</h3>
      </div>
    </Link>
  );
}
