export const dynamic = 'force-dynamic';

import Header from '@/components/site/Header';
import Footer from '@/components/site/Footer';

export default function StoryPage() {
  return (
    <>
      <Header />
      <main className="container-p py-12 md:py-20 max-w-3xl">
        <h1 className="text-3xl md:text-5xl mb-6">Story</h1>
        <p className="text-muted leading-7">Atelier Quiet는 라이프스타일 장면을 수집해, 계절마다 컬렉션과 에디토리얼로 기록하는 브랜드 아카이브입니다.</p>
      </main>
      <Footer />
    </>
  );
}
