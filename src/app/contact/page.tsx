import Header from '@/components/site/Header';
import Footer from '@/components/site/Footer';

export default function ContactPage() {
  return (
    <>
      <Header />
      <main className="container-p py-12 max-w-xl">
        <h1 className="text-3xl md:text-5xl mb-6">Contact</h1>
        <form className="space-y-4">
          <input className="w-full border border-line p-3 bg-white" placeholder="Name" />
          <input className="w-full border border-line p-3 bg-white" placeholder="Email" type="email" />
          <textarea className="w-full border border-line p-3 h-40 bg-white" placeholder="Message" />
          <button className="border border-ink px-4 py-2">Send</button>
        </form>
      </main>
      <Footer />
    </>
  );
}
