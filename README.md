# homepage_new

모바일 중심 브랜드 쇼케이스 + 관리자(Admin) MVP입니다.  
배포는 **Vercel 기준**이며, 정적 export(GitHub Pages) 방식이 아닌 일반 Next.js 서버/SSR 구조입니다.

## 1) 기술 개요
- Next.js 14 (App Router) + TypeScript + Tailwind
- Supabase (Auth / Postgres / Storage)
- Vercel 배포

## 2) 현재 구현 범위
### Front
- `/` HOME
- `/story`
- `/collection`
- `/collection/[slug]`
- `/gallery`
- `/contact`
- `/faq`

### Admin
- `/admin/login` (Supabase Auth 실제 로그인)
- `/admin/dashboard`
- `/admin/menu` (DB CRUD)
- `/admin/banners` (DB CRUD + Storage 업로드)
- `/admin/collections` (DB CRUD + Storage 업로드)

## 3) 로컬 실행 방법 (초보자용)

### Step 1. 패키지 설치
```bash
npm install
```

### Step 2. 환경변수 파일 생성
```bash
cp .env.example .env.local
```

`.env.local`에 Supabase 값을 넣습니다.

### Step 3. Supabase 테이블 생성
1. Supabase 프로젝트 생성
2. SQL Editor에서 `supabase/schema.sql` 내용 실행
3. Storage에 `media` 버킷이 생성되었는지 확인

### Step 4. 관리자 계정 생성
Supabase Dashboard > Authentication > Users > Add user 에서
관리자 이메일/비밀번호 계정 생성

### Step 5. 개발 서버 실행
```bash
npm run dev
```

브라우저 접속: http://localhost:3000

## 4) 환경변수 입력 방법
필수:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

설명:
- `NEXT_PUBLIC_*` 값은 클라이언트(브라우저)에서도 사용
- `SUPABASE_SERVICE_ROLE_KEY`는 서버 API(route handler)에서만 사용

## 5) Vercel 배포 방법
1. GitHub 저장소를 Vercel에 Import
2. Project Settings > Environment Variables에 `.env.local` 값 입력
3. Build Command: `npm run build`
4. Deploy

배포 후 Admin 로그인:
- `https://<your-domain>/admin/login`

## 6) Vercel/Next.js 스크립트
```bash
npm run dev
npm run build
npm run start
```

## 7) 폴더 핵심 구조
- `src/app`: 라우트
- `src/app/api/admin/*`: 관리자 CRUD API
- `src/lib/supabase/*`: Supabase 클라이언트
- `src/lib/data/content.ts`: 프론트 데이터 조회(실 DB + fallback)
- `supabase/schema.sql`: 초기 스키마

## 8) 참고
- Supabase 미설정 시 프론트는 `mock-data` fallback으로 렌더링됩니다.
- 관리자 CRUD/API는 Supabase 키가 없으면 동작하지 않습니다.
