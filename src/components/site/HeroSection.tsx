import Link from 'next/link';
import Image from 'next/image';
import { Banner } from '@/types';

export default function HeroSection({ banner }: { banner: Banner }) {
  return (
    <section className="container-p py-6 md:py-10">
      <div className="relative h-[62vh] min-h-[420px] rounded-xl overflow-hidden">
        <Image src={banner.image} alt={banner.title} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute bottom-8 left-6 right-6 text-white">
          <h1 className="text-3xl md:text-5xl font-semibold mb-2">{banner.title}</h1>
          <p className="text-sm md:text-base mb-4">{banner.subtitle}</p>
          <Link href={banner.ctaLink} className="inline-block border border-white px-4 py-2 text-sm">{banner.ctaLabel}</Link>
        </div>
      </div>
    </section>
  );
}
