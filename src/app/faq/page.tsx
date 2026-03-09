import Header from '@/components/site/Header';
import Footer from '@/components/site/Footer';
import { faqs } from '@/lib/mock-data';

export default function FaqPage() {
  return (
    <>
      <Header />
      <main className="container-p py-12 max-w-3xl">
        <h1 className="text-3xl md:text-5xl mb-6">FAQ</h1>
        <div className="space-y-4">
          {faqs.map(f => (
            <details key={f.id} className="border border-line p-4 bg-white">
              <summary className="cursor-pointer font-medium">{f.question}</summary>
              <p className="mt-3 text-muted">{f.answer}</p>
            </details>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
