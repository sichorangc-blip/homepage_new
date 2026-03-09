# homepage_new

모바일 중심 브랜드 쇼케이스형 홈페이지 MVP 구현본입니다.

## 기술 스택
- Next.js 14 (App Router) + TypeScript
- Tailwind CSS
- 더미 데이터 기반 MVP (향후 Supabase 연동 구조)

## 구현된 MVP 페이지
### Front
- `/` (HOME)
- `/story`
- `/collection`
- `/collection/[slug]`
- `/gallery`
- `/contact`
- `/faq`

### Admin
- `/admin/login`
- `/admin/dashboard`
- `/admin/menu`
- `/admin/banners`
- `/admin/collections`

## 로컬 실행 방법
1. 의존성 설치
```bash
npm install
```

2. 환경변수 설정
```bash
cp .env.example .env.local
```

3. 개발 서버 실행
```bash
npm run dev
```

4. 브라우저 접속
- http://localhost:3000
- 관리자 로그인: http://localhost:3000/admin/login

## 빌드/배포 확인
```bash
npm run build
npm run start
```

## 배포 방법 (Vercel 권장)
1. GitHub 저장소 연결
2. Environment Variables에 `.env.example` 항목 등록
3. Build Command: `npm run build`
4. Output: Next.js 기본 설정 사용

## 구조
- `src/app`: 페이지 라우팅
- `src/components/site`: 프론트 컴포넌트
- `src/components/admin`: 관리자 컴포넌트
- `src/lib/mock-data.ts`: MVP 더미 데이터
- `IMPLEMENTATION_PLAN.md`: 아키텍처/운영 설계 문서

## 다음 단계 (Phase 1.5)
- Supabase Auth/DB/Storage 연결
- 관리자 CRUD 실제 저장
- Contact API + 이메일 연동
- 메뉴/배너 드래그 정렬
