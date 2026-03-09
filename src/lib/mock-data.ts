import { Banner, Collection, Faq, GalleryItem, MenuItem } from '@/types';

export const siteCopy = {
  brand: 'Atelier Quiet',
  heroTitle: 'Seasonal Notes, Curated Slowly.',
  heroSubtitle: '모바일 중심 브랜드 아카이브 쇼케이스'
};

export const menus: MenuItem[] = [
  { id: 'm1', label: 'HOME', path: '/', order: 1, visible: true },
  { id: 'm2', label: 'STORY', path: '/story', order: 2, visible: true },
  { id: 'm3', label: 'COLLECTION', path: '/collection', order: 3, visible: true },
  { id: 'm4', label: 'GALLERY', path: '/gallery', order: 4, visible: true },
  { id: 'm5', label: 'CONTACT', path: '/contact', order: 5, visible: true },
  { id: 'm6', label: 'FAQ', path: '/faq', order: 6, visible: true }
];

export const banners: Banner[] = [
  {
    id: 'b1',
    title: 'Spring Archive 2026',
    subtitle: '절제된 이미지, 조용한 문장, 브랜드의 기록',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=80',
    ctaLabel: 'View Collection',
    ctaLink: '/collection',
    visible: true
  }
];

export const collections: Collection[] = [
  {
    id: 'c1',
    slug: 'soft-utility',
    title: 'Soft Utility',
    season: 'SS26',
    summary: '기능성과 감성의 균형을 담은 시즌 라인.',
    cover: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1000&q=80',
    visible: true
  },
  {
    id: 'c2',
    slug: 'quiet-layers',
    title: 'Quiet Layers',
    season: 'FW25',
    summary: '레이어링 중심의 차분한 컬렉션.',
    cover: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1000&q=80',
    visible: true
  }
];

export const gallery: GalleryItem[] = [
  { id: 'g1', image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=700&q=80', caption: 'daily mood #01', visible: true },
  { id: 'g2', image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=700&q=80', caption: 'daily mood #02', visible: true },
  { id: 'g3', image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=700&q=80', caption: 'daily mood #03', visible: true },
  { id: 'g4', image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=700&q=80', caption: 'daily mood #04', visible: true }
];

export const faqs: Faq[] = [
  { id: 'f1', question: '쇼핑/결제가 가능한가요?', answer: '현재는 브랜드 쇼케이스 및 아카이브 중심 사이트로 운영됩니다.', visible: true },
  { id: 'f2', question: '콘텐츠 업데이트는 누가 하나요?', answer: '관리자 페이지에서 운영자가 직접 배너/메뉴/컬렉션을 수정할 수 있습니다.', visible: true }
];
