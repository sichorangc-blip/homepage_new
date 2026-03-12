# 모바일 중심 브랜드 쇼케이스형 홈페이지 구현 설계서

## 추천 기술 스택

실무에서 빠르게 오픈하면서도 운영 안정성을 확보하기 위한 기본 전제는 **"프론트와 관리자 일원화 + 서버리스 백엔드 + 파일 스토리지 분리"**입니다.

### 1) 프론트엔드 프레임워크
- **Next.js 14+ (App Router, TypeScript)**
- 이유
  - SEO 친화적 SSR/SSG/ISR 하이브리드 가능
  - 콘텐츠 중심 페이지에 필요한 메타데이터 API 제공
  - 관리자/프론트를 단일 레포에서 운영 가능

### 2) 스타일링 방식
- **Tailwind CSS + 디자인 토큰(CSS Variables) + clsx/cva**
- 이유
  - 빠른 UI 제작 및 일관된 spacing/typography 적용 용이
  - 에디토리얼 레이아웃 실험 속도 높음

### 3) CMS/관리자 구현 방식
- **Custom Admin (Next.js 내부 `/admin`)**
- 이유
  - 요구사항(메뉴/배너/카피/정렬/공개설정)에 특화 UX 구현 가능
  - 운영자 중심 워크플로우(드래그정렬, 미리보기) 커스터마이즈에 유리

### 4) 백엔드 구성
- **Next.js Route Handlers + Server Actions + Supabase SDK**
- 이유
  - 별도 백엔드 서버 없이 CRUD/API 처리
  - 권한/인증/스토리지/DB를 단일 BaaS로 단순화

### 5) 데이터베이스
- **PostgreSQL (Supabase Managed)**
- 이유
  - 구조화된 콘텐츠 모델(컬렉션, 아카이브, 저널)에 적합
  - JSONB를 통해 block 기반 본문 확장 용이

### 6) 이미지 저장 방식
- **Supabase Storage + Next/Image 최적화 + CDN 캐시**
- 이유
  - 커버/썸네일/갤러리 자산 분리 저장
  - signed/public URL 정책 분리 가능

### 7) 배포 방식
- **Vercel (Web) + Supabase (DB/Storage/Auth)**
- 이유
  - CI/CD 단순
  - Preview 배포 기반 협업 용이

### 8) SEO 대응 방식
- Next Metadata API + 동적 sitemap/robots + OG image route

### 9) 폼/문의 처리 방식
- Contact Form -> `/api/contact` -> DB 저장 + 이메일 알림(Resend)

### 10) 유지보수 편의성
- 단일 모노레포(사실상 싱글앱)
- 타입 공유(Zod 스키마)
- 관리자/프론트 공통 컴포넌트 재사용

---

## 추천 아키텍처

후보를 비교한 뒤 최종 1안을 제시합니다.

### 후보 비교

1. **Next.js + Headless CMS(Sanity/Strapi/Payload)**
- 장점: 콘텐츠 모델/에디터 UI 빠르게 구축
- 단점: 커스텀 운영 요구(메뉴 드래그정렬, 섹션별 제어, 인스타 fallback) 구현 시 추가 커스터마이징 비용 증가

2. **Next.js + Supabase + Custom Admin**
- 장점: 제작 속도/운영 UX/디자인 자유도 균형 우수
- 단점: CMS 기본 기능(버전관리 등)을 직접 일부 구현해야 함

3. **Supabase 중심(저코드 관리자) + 별도 프론트**
- 장점: 백오피스 초기 속도 빠름
- 단점: 브랜딩 강한 관리자 UX 설계 어려움

### 평가 기준별 결론
- 제작 속도: 2안 우세
- 운영 편의성: 2안 우세(요구사항 맞춤)
- 디자인 자유도: 2안 우세
- SEO: 1안/2안 동급(Next 기준)
- 모바일 성능: 2안 우세(불필요 런타임 최소)
- 확장성: 2안 우세
- 인스타 대응: 2안 우세(수동 큐레이션 fallback 내장 용이)
- 쇼핑 기능 확장: 2안 우세(상품/주문 테이블 확장 가능)

### 최종 추천 1안
**Next.js(App Router) + Supabase(Postgres/Auth/Storage) + Custom Admin + Vercel 배포**

---

## 폴더 구조

```txt
homepage_new/
├─ src/
│  ├─ app/
│  │  ├─ (site)/
│  │  │  ├─ page.tsx                    # /
│  │  │  ├─ story/page.tsx
│  │  │  ├─ collection/page.tsx
│  │  │  ├─ collection/[slug]/page.tsx
│  │  │  ├─ archive/page.tsx
│  │  │  ├─ archive/[slug]/page.tsx
│  │  │  ├─ journal/page.tsx
│  │  │  ├─ journal/[slug]/page.tsx
│  │  │  ├─ gallery/page.tsx
│  │  │  ├─ contact/page.tsx
│  │  │  └─ faq/page.tsx
│  │  ├─ admin/
│  │  │  ├─ login/page.tsx
│  │  │  ├─ dashboard/page.tsx
│  │  │  ├─ collections/page.tsx
│  │  │  ├─ journal/page.tsx
│  │  │  ├─ banners/page.tsx
│  │  │  ├─ menu/page.tsx
│  │  │  └─ settings/page.tsx
│  │  ├─ api/
│  │  │  ├─ contact/route.ts
│  │  │  ├─ instagram/sync/route.ts
│  │  │  └─ admin/...                   # CRUD route handlers
│  │  ├─ sitemap.ts
│  │  └─ robots.ts
│  ├─ components/
│  │  ├─ site/
│  │  ├─ admin/
│  │  └─ common/
│  ├─ features/
│  │  ├─ collection/
│  │  ├─ archive/
│  │  ├─ journal/
│  │  ├─ gallery/
│  │  └─ settings/
│  ├─ lib/
│  │  ├─ supabase/
│  │  ├─ seo/
│  │  ├─ validators/
│  │  └─ utils/
│  ├─ styles/
│  └─ types/
├─ supabase/
│  ├─ migrations/
│  └─ seeds/
├─ public/
├─ docs/
└─ package.json
```

---

## 라우팅 구조

### 프론트
- `/`
- `/story`
- `/collection`
- `/collection/[slug]`
- `/archive`
- `/archive/[slug]`
- `/journal`
- `/journal/[slug]`
- `/gallery`
- `/contact`
- `/faq`

### 관리자
- `/admin` (권한 체크 후 `/admin/dashboard` 리다이렉트)
- `/admin/login`
- `/admin/dashboard`
- `/admin/collections`
- `/admin/journal`
- `/admin/banners`
- `/admin/menu`
- `/admin/settings`

---

## 데이터 모델

아래 스키마는 Postgres 기준입니다.

### 1) Site Settings
| 필드명 | 타입 | 필수 | 설명 |
|---|---|---:|---|
| id | uuid | Y | PK |
| site_name | text | Y | 사이트/브랜드명 |
| site_description | text | Y | 기본 설명 |
| default_seo_title | text | Y | 기본 SEO 제목 |
| default_seo_description | text | Y | 기본 SEO 설명 |
| og_image_url | text | N | 기본 OG 이미지 |
| contact_email | text | N | 대표 메일 |
| social_links | jsonb | N | 인스타/유튜브 등 |
| updated_at | timestamptz | Y | 수정일 |

### 2) Menu
| 필드명 | 타입 | 필수 | 설명 |
|---|---|---:|---|
| id | uuid | Y | PK |
| label | text | Y | 메뉴명 |
| path | text | Y | 링크 경로 |
| order_index | int | Y | 정렬순서 |
| visible | boolean | Y | 노출 여부 |
| target | text | N | `_self`/`_blank` |
| created_at | timestamptz | Y | 생성일 |

### 3) Banner
| 필드명 | 타입 | 필수 | 설명 |
|---|---|---:|---|
| id | uuid | Y | PK |
| title | text | N | 배너 제목 |
| subtitle | text | N | 보조 카피 |
| media_url | text | Y | 이미지/영상 URL |
| media_type | text | Y | image/video |
| cta_label | text | N | 버튼 문구 |
| cta_link | text | N | 버튼 링크 |
| order_index | int | Y | 정렬 |
| visible | boolean | Y | 노출 |
| start_at | timestamptz | N | 시작일 |
| end_at | timestamptz | N | 종료일 |

### 4) Collection
| 필드명 | 타입 | 필수 | 설명 |
|---|---|---:|---|
| id | uuid | Y | PK |
| slug | text | Y | URL slug(unique) |
| title | text | Y | 컬렉션명 |
| season | text | N | 시즌 |
| summary | text | N | 요약 |
| cover_image | text | Y | 커버 이미지 |
| thumbnail | text | Y | 리스트 썸네일 |
| body_blocks | jsonb | Y | 본문 블록 데이터 |
| status | text | Y | draft/published/private |
| seo_title | text | N | SEO 제목 |
| seo_description | text | N | SEO 설명 |
| published_at | timestamptz | N | 발행일 |
| order_index | int | Y | 정렬 |

### 5) Collection Item (or Product)
| 필드명 | 타입 | 필수 | 설명 |
|---|---|---:|---|
| id | uuid | Y | PK |
| collection_id | uuid | Y | FK(collection) |
| name | text | Y | 아이템명 |
| code | text | N | 내부 코드 |
| description | text | N | 설명 |
| image_url | text | N | 대표 이미지 |
| order_index | int | Y | 정렬 |
| visible | boolean | Y | 노출 |

### 6) Archive / Editorial
| 필드명 | 타입 | 필수 | 설명 |
|---|---|---:|---|
| id | uuid | Y | PK |
| type | text | Y | lookbook/editorial |
| slug | text | Y | unique slug |
| title | text | Y | 제목 |
| excerpt | text | N | 요약 |
| cover_image | text | Y | 커버 |
| body_blocks | jsonb | Y | 본문 |
| related_collection_id | uuid | N | 연관 컬렉션 |
| status | text | Y | draft/published/private |
| seo_title | text | N | SEO |
| seo_description | text | N | SEO |
| published_at | timestamptz | N | 발행일 |

### 7) Journal Post
| 필드명 | 타입 | 필수 | 설명 |
|---|---|---:|---|
| id | uuid | Y | PK |
| slug | text | Y | unique slug |
| title | text | Y | 제목 |
| category | text | N | 카테고리 |
| tags | text[] | N | 태그 |
| excerpt | text | N | 요약 |
| cover_image | text | N | 썸네일 |
| body_html | text | Y | 본문(에디터 결과) |
| status | text | Y | draft/published/private |
| seo_title | text | N | SEO |
| seo_description | text | N | SEO |
| published_at | timestamptz | N | 발행일 |

### 8) Gallery Item
| 필드명 | 타입 | 필수 | 설명 |
|---|---|---:|---|
| id | uuid | Y | PK |
| source_type | text | Y | manual/instagram |
| image_url | text | Y | 이미지 URL |
| caption | text | N | 캡션 |
| hashtag_list | text[] | N | 해시태그 |
| source_post_url | text | N | 원본 링크 |
| visible | boolean | Y | 노출 |
| order_index | int | Y | 정렬 |
| curated | boolean | Y | 큐레이션 승인 여부 |

### 9) FAQ
| 필드명 | 타입 | 필수 | 설명 |
|---|---|---:|---|
| id | uuid | Y | PK |
| category | text | N | 카테고리 |
| question | text | Y | 질문 |
| answer | text | Y | 답변 |
| order_index | int | Y | 정렬 |
| visible | boolean | Y | 노출 |

### 10) Contact Inquiry
| 필드명 | 타입 | 필수 | 설명 |
|---|---|---:|---|
| id | uuid | Y | PK |
| name | text | Y | 이름 |
| email | text | Y | 이메일 |
| subject | text | N | 제목 |
| message | text | Y | 문의 내용 |
| consent_privacy | boolean | Y | 개인정보 동의 |
| status | text | Y | new/checked/replied |
| created_at | timestamptz | Y | 접수일 |

### 11) Instagram Feed Settings
| 필드명 | 타입 | 필수 | 설명 |
|---|---|---:|---|
| id | uuid | Y | PK |
| mode | text | Y | api_hashtag/account_filter/manual |
| access_token | text | N | 암호화 저장 |
| ig_user_id | text | N | 비즈 계정 id |
| hashtag_filters | text[] | N | 노출 필터 |
| sync_interval_min | int | N | 동기화 주기 |
| last_synced_at | timestamptz | N | 마지막 동기화 |
| fallback_manual | boolean | Y | 실패 시 수동 fallback |

---

## 관리자 기능 설계

### 1) 메뉴 관리
- 화면 구성: 메뉴 리스트 + 정렬 패널 + 생성/수정 모달
- 입력 필드: label, path, visible, order
- 저장 방식: `menus` 테이블 upsert + order_index 일괄 갱신
- 권한: Admin/Editor(편집 가능, 삭제는 Admin 권장)
- UX 주의: 드래그 후 자동저장 + 되돌리기(undo 1회)

### 2) 배너 관리
- 화면 구성: 배너 썸네일 리스트 + 미리보기 + 일정 설정
- 입력 필드: title, subtitle, media, CTA, 노출기간, visible
- 저장 방식: media 업로드 후 `banners` 저장
- 권한: Admin/Editor
- UX 주의: 모바일/PC 크롭 프리뷰 제공

### 3) 컬렉션 관리
- 화면 구성: 리스트/필터 + 에디터(블록 기반)
- 입력 필드: slug, title, season, summary, cover, body_blocks, status, SEO
- 저장 방식: draft 자동저장 + publish 전 유효성 검증
- 권한: Admin/Editor
- UX 주의: slug 중복 체크, 대표 이미지 필수 경고

### 4) 게시글 관리(Archive/Journal)
- 화면 구성: 타입 탭 + 리스트 + 작성 폼
- 입력 필드: title, excerpt, body, tags/type, status, seo
- 저장 방식: 타입별 테이블 저장
- 권한: Admin/Editor
- UX 주의: 예약 발행 시간대(타임존) 명시

### 5) 갤러리 관리
- 화면 구성: 소스별 탭(manual/instagram) + 큐레이션 승인함
- 입력 필드: image, caption, hashtag, visible, order
- 저장 방식: `gallery_items` 저장, `curated=true`만 노출
- 권한: Admin/Editor
- UX 주의: 대량 업로드 시 백그라운드 처리

### 6) 카피 수정
- 화면 구성: 페이지별 copy dictionary 편집기
- 입력 필드: key, value, locale(optional)
- 저장 방식: `site_copy`(key-value) 저장 + 캐시 무효화
- 권한: Admin/Editor
- UX 주의: 실시간 미리보기 제공

### 7) 공개/비공개
- 화면 구성: 상태 토글 + 일괄 변경
- 입력 필드: status
- 저장 방식: draft/published/private enum
- 권한: Admin/Editor (최종 발행은 Admin 정책 가능)
- UX 주의: 공개 전 SEO 누락 체크

### 8) 정렬 변경
- 화면 구성: Sortable list (DnD)
- 입력 필드: order_index
- 저장 방식: 트랜잭션 일괄 업데이트
- 권한: Admin/Editor
- UX 주의: 저장 실패 시 원복 처리

### 9) SEO 설정
- 화면 구성: 페이지별 SEO 패널
- 입력 필드: seo_title, seo_description, og_image
- 저장 방식: 각 콘텐츠 레코드에 저장
- 권한: Admin/Editor
- UX 주의: 글자수 가이드(Title 50~60, Desc 120~160)

### 10) 인스타그램 설정
- 화면 구성: 연동모드 선택 + 토큰/필터 + 동기화 로그
- 입력 필드: mode, token, user_id, hashtags, fallback
- 저장 방식: `instagram_feed_settings` + sync job
- 권한: Admin only
- UX 주의: 토큰 만료 알림, 실패 시 자동 manual fallback

---

## 인스타그램 연동 전략

### A. 공식 해시태그 API
- 필요한 인증/권한
  - Meta App + Instagram Business Account + 관련 permission 심사
- 구현 흐름
  1. 특정 hashtag id 조회
  2. hashtag recent media 조회
  3. 정제 후 gallery_items 적재
- 장애 포인트
  - 권한 심사 지연/반려, API 정책 변경, rate limit
- 유지보수 난이도: 높음
- 추천 여부: 핵심 기능으로는 비추천

### B. 브랜드 계정 게시물 수집 + 해시태그 필터
- 필요한 인증/권한
  - 브랜드 IG Business 계정 토큰
- 구현 흐름
  1. 계정 미디어 주기 수집
  2. 캡션에서 hashtag 파싱
  3. 필터 매칭 항목만 큐에 등록
- 장애 포인트
  - 토큰 만료, 캡션 규칙 불일치
- 유지보수 난이도: 중간
- 추천 여부: 실무형 추천

### C. 관리자 수동 업로드 fallback
- 필요한 인증/권한
  - 없음(내부 관리자 권한만)
- 구현 흐름
  1. 운영자가 이미지/원본링크 등록
  2. 큐레이션 승인 후 노출
- 장애 포인트
  - 운영 리소스 필요
- 유지보수 난이도: 낮음
- 추천 여부: 강력 추천(가장 안정적)

### 최종 권장안
**C안을 기본 운영 모드로 채택하고, B안을 보조 자동수집으로 붙이는 하이브리드 구조**가 가장 안전합니다.
- 이유: API 정책 이슈가 발생해도 사이트 운영이 중단되지 않음

---

## UI 컴포넌트 구조

### 프론트 공통 컴포넌트
- `Header`: 글로벌 네비게이션
- `MobileMenu`: 모바일 풀스크린 메뉴
- `HeroSection`: 메인 배너/카피
- `CollectionCard`: 컬렉션 요약 카드
- `EditorialCard`: 아카이브 카드
- `JournalCard`: 저널 카드
- `GalleryGrid`: 이미지 그리드
- `CTASection`: 전환 유도
- `Footer`: 하단 정보
- `SectionTitle`: 섹션 타이틀 일관화
- `FadeIn`: 절제된 인터랙션

### 관리자 공통 컴포넌트
- `AdminLayout`: 상단/사이드바/콘텐츠 래퍼
- `Sidebar`: 메뉴 이동
- `DataTable`: 목록 조회
- `AdminForm`: 입력 폼 공통 래퍼
- `ImageUploader`: 업로드 + 크롭 프리뷰
- `SortableList`: 드래그 정렬
- `StatusToggle`: 공개/비공개 전환
- `SEOFields`: SEO 전용 필드 묶음
- `RichTextEditor`: 저널/에디토리얼 작성
- `PublishPanel`: 상태/발행일 제어

---

## SEO/운영 전략

### SEO 기본
- 메타 제목/설명: 페이지/콘텐츠별 개별 설정 + 기본값 fallback
- Open Graph: title/description/image/type 지정
- Sitemap: 동적 생성(컬렉션/아카이브/저널 포함)
- robots: admin 차단, public 허용
- 이미지 alt: 필수 입력(관리자에서 누락 경고)
- 구조화 데이터: 최소 `Organization`, `WebSite`, 게시글에 `Article` 적용 권장

### 페이지별 제목 체계
- HOME: 브랜드명 | 핵심 슬로건
- LIST 페이지: 섹션명 | 브랜드명
- DETAIL 페이지: 콘텐츠 제목 | 섹션명 | 브랜드명

### 에디토리얼/저널 SEO 운영 팁
- 제목에 시즌/주제 키워드 자연 삽입
- excerpt 1~2문장 고정 패턴 운영
- 본문 H2/H3 구조 유지
- 내부 링크(관련 컬렉션/아카이브) 연결

---

## 개발 순서

1. 디자인 토큰/타이포/레이아웃 시스템 세팅
2. 공통 컴포넌트(프론트 + 관리자) 구축
3. 정적 라우팅 페이지 골격 구현
4. DB 스키마/마이그레이션 작성
5. 관리자 인증/권한 적용
6. 콘텐츠 CRUD(메뉴/배너/컬렉션/저널/FAQ)
7. 갤러리 및 인스타 연동(B/C 하이브리드)
8. SEO(메타/OG/sitemap/robots) 완성
9. 성능 최적화(이미지/font/lazy)
10. QA(모바일 우선) 및 배포

---

## MVP 범위

### 꼭 필요한 기능
- 브랜드 프론트 페이지 전체 라우팅
- 관리자 로그인/권한(Admin, Editor)
- 메뉴/배너/컬렉션/아카이브/저널/FAQ CRUD
- 공개/비공개, 정렬(DnD), SEO 필드
- 갤러리 수동 큐레이션(C안)
- contact 문의 저장 + 이메일 알림

### 있으면 좋은 기능
- 인스타 B안 자동 수집 + 승인 큐
- 예약 발행
- 버전 히스토리(최근 5개)

### 나중에 붙여도 되는 기능
- 다국어
- 쇼핑 기능(상품/장바구니/결제)
- 고급 검색/추천
- 멤버십/북마크

