# homepage_new

모바일 중심 브랜드 쇼케이스 + 관리자(Admin) MVP입니다.  
배포는 **Vercel 기준**이며 일반 Next.js(App Router) 서버 배포 구조입니다.

## 1) 기술 개요
- Next.js 14 (App Router) + TypeScript + Tailwind
- Supabase (Auth / Postgres / Storage)
- Vercel Git 연동 자동 배포

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
- `/admin/login` (Supabase Auth 로그인)
- `/admin/dashboard`
- `/admin/settings` (브랜드명/홈 카피 수정)
- `/admin/menu` (DB CRUD)
- `/admin/banners` (DB CRUD + Storage 업로드)
- `/admin/collections` (DB CRUD + Storage 업로드)

## 3) 로컬 실행 방법
### Step 1. 의존성 설치
```bash
npm install
```

### Step 2. 환경변수 파일 생성
```bash
cp .env.example .env.local
```

### Step 3. Supabase 테이블 생성
1. Supabase 프로젝트 생성
2. SQL Editor에서 `supabase/schema.sql` 실행
3. Storage 버킷 `media` 생성 확인

### Step 4. 관리자 계정 생성
Supabase Dashboard > Authentication > Users > Add user

### Step 5. 개발 서버 실행
```bash
npm run dev
```

브라우저: http://localhost:3000

## 4) package.json 스크립트 (Vercel 표준)
```bash
npm run dev
npm run build
npm run start
```

## 5) 환경변수
필수:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

선택:
- `RESEND_API_KEY`
- `CONTACT_RECEIVER_EMAIL`

## 6) Vercel 배포 방법 (Git Push 자동 배포)
1. Vercel 프로젝트가 GitHub 저장소와 연결되어 있는지 확인
2. Vercel > Project Settings > General
   - Framework Preset: **Next.js**
   - Root Directory: **repo root (`/`)**
3. Vercel > Project Settings > Environment Variables에 `.env.local` 값 등록
4. main 브랜치에 push하면 자동 재배포

## 7) NOT_FOUND 트러블슈팅
- Vercel 프로젝트의 Root Directory가 하위 폴더로 잘못 지정되면 `/`에서 NOT_FOUND가 발생할 수 있습니다.
- Framework Preset이 Other로 되어 있으면 Next.js 라우팅이 정상 인식되지 않을 수 있습니다.
- 이 저장소는 `src/app/page.tsx`가 루트 페이지이며, 별도 Pages 전용(basePath/assetPrefix/export) 설정을 사용하지 않습니다.

- `Could not find the table 'public.collections' in the schema cache` 에러가 뜨면, Supabase SQL Editor에서 `supabase/schema.sql`을 반드시 실행해야 합니다.
- `Could not find the table 'public.menus'` 또는 `public.banners` 에러가 뜨면, 동일하게 `supabase/schema.sql`을 실행한 뒤 페이지를 새로고침해야 합니다.

- `/admin/settings`에서 `public.site_settings` 에러가 계속 뜨면, `supabase/site_settings_fix.sql`을 실행하고 마지막에 `NOTIFY pgrst, 'reload schema';`를 실행하세요.

- Security Advisor의 `RLS allows anonymous users` 경고는 공개 홈페이지 읽기 정책 때문에 발생할 수 있습니다(오류가 아니라 운영 정책 경고).

## 8) 구조
- `src/app`: App Router 페이지
- `src/app/api/admin/*`: 관리자 CRUD API
- `src/lib/supabase/*`: Supabase client/server
- `src/lib/data/content.ts`: 프론트 데이터 로딩 (Supabase + fallback)
- `supabase/schema.sql`: 초기 DB/Policy 스키마
- `vercel.json`: Vercel Framework 강제 설정


## 9) 필수 파일 존재 확인
```bash
bash scripts/verify-required-files.sh
```


## 10) Supabase 테이블 누락 즉시 해결 (menus / banners / collections)
관리자 화면에서 아래 에러가 나오면:
- `Could not find the table 'public.menus' in the schema cache`
- `Could not find the table 'public.banners' in the schema cache`
- `Could not find the table 'public.collections' in the schema cache`

바로 아래 순서로 처리하세요.
1. Supabase Dashboard 접속
2. 좌측 **SQL Editor** 이동
3. 저장소의 `supabase/schema.sql` 파일 전체를 복사해서 붙여넣기
4. **Run** 실행
5. 관리자 페이지 새로고침

> 핵심: 테이블을 수동 생성한 것이 아니라면, `schema.sql` 실행 전에는 메뉴/배너/컬렉션 CRUD가 동작하지 않습니다.


## 11) 운영자가 실제로 바꿀 수 있는 항목
- `/admin/settings`: 브랜드명, 홈 히어로 문구, 섹션 타이틀
- `/admin/menu`: 메뉴 추가/삭제
- `/admin/banners`: 메인 배너 이미지/카피/CTA
- `/admin/collections`: 컬렉션 카드/상세 기본 데이터

> 변경이 반영되지 않으면 Vercel 배포 환경변수(Supabase 키)와 Supabase 테이블 생성 여부를 먼저 확인하세요.


## 12) "뭐가 바뀌었는지 모르겠을 때" (운영자 체크리스트)
1. `/admin/diagnostics` 접속
2. Environment 3개가 모두 `OK`인지 확인
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
3. Tables 항목이 모두 `OK`인지 확인
4. `MISSING`/에러가 있으면 Supabase SQL Editor에서 `supabase/schema.sql` 전체 실행
5. Vercel에서 최신 배포가 main 최신 커밋인지 확인 후 새로고침

> 이제 관리자에서 변경 가능한 핵심은 `/admin/settings`, `/admin/menu`, `/admin/banners`, `/admin/collections` 입니다.
- `/admin/settings` 오류 시, 페이지 안의 **Copy Fix SQL** 버튼으로 복구 SQL을 바로 복사해 Supabase SQL Editor에서 실행할 수 있습니다.
