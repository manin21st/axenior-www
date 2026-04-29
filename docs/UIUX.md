---
project: axenior-www
type: spec
version: 1.0
status: draft
created: 2026-04-29
last_updated: 2026-04-29
source_of_truth: code
---

# axenior-www UI/UX 사양 (v1)

본 문서는 *현재 구현된 모습 기준*으로 일괄 생성됨 (노트 #58 Phase 3-B). axenior-www 는 AXENIOR(AI Transformation 시니어 파트너) 의 마케팅 랜딩 사이트 — Next.js + Tailwind v4 기반.

브랜드 정의는 `BRAND_GUIDE_SUMMARY.md` 와 `axenior-brand-identity-v2.html` 가 진실의 원천. 본 UIUX.md 는 그 결정의 *기술 매핑*.

## 1. Principles

1. **Trendy / Simple / High-end** — 브랜드 가이드의 3대 원칙. 과한 장식 회피.
2. **Deep space + 그라디언트** — 우주적 어두운 배경 위에 AX Blue→Violet 그라디언트로 브랜드 정체성.
3. **타이포그래피로 위계 구축** — 컬러 대비 대신 폰트 패밀리·웨이트 대비 우선.
4. **모바일 동등 경험** — 마케팅 사이트의 절반 이상은 모바일 유입.
5. **스크롤 중심 스토리텔링** — 섹션 단위 페이드/리빌 애니메이션.

## 2. Foundations (Design Tokens)

토큰은 `app/globals.css` 의 Tailwind v4 `@theme` 블록에 정의.

### 2.1 Color (브랜드 팔레트)

| 토큰 | CSS 변수 | 값 | 용도 |
|---|---|---|---|
| `color.bg.deep-space` | `--color-deep-space` | `#0A0E17` | 페이지 배경 (메인) |
| `color.bg.navy` | `--color-navy` | `#0F1628` | 카드 / 섹션 배경 |
| `color.accent.blue` | `--color-ax-blue` | `#3B82F6` | 1차 액션, 그라디언트 시작 |
| `color.accent.violet` | `--color-ax-violet` | `#8B5CF6` | 그라디언트 끝점 |
| `color.fg.silver` | `--color-silver` | `#94A3B8` | 본문 텍스트 (다크 위) |
| `color.fg.white` | `--color-ax-white` | `#F8F9FC` | 헤더 / 강조 |
| `color.fg.light` | `--color-ax-light` | `#E8EDF5` | 보조 강조 |
| `gradient.brand` | `linear-gradient(135deg, #3B82F6, #8B5CF6)` | — | 텍스트·버튼 그라디언트 |

→ `body { background-color: #0A0E17; color: #94A3B8; }` 가 글로벌 기본값.

### 2.2 Typography (4-family system)

| 토큰 | 폰트 | 용도 |
|---|---|---|
| `font.family.bebas` | Bebas Neue (`--font-bebas`) | **로고 only** |
| `font.family.sora` | Sora (`--font-sora`) | 영문 헤딩 / 슬로건 |
| `font.family.noto` | Noto Sans KR (`--font-noto`) | 한글 본문 / 헤딩 |
| `font.family.mono` | JetBrains Mono (`--font-jetbrains`) | 기술/코드/모노 |

→ **로고 외 본문에는 Bebas Neue 금지** (브랜드 일관성).

### 2.3 Spacing

Tailwind 기본 4px grid. 마케팅 섹션은 큰 간격 선호 (`py-20 ~ py-32`).

### 2.4 Radius / Shadow / Motion

- Radius: Tailwind `rounded-md / lg / 2xl / full`
- Shadow: 다크 배경 위에서는 그라디언트 글로우(`box-shadow: 0 0 N px ax-blue/violet`)로 대체
- Motion:
  - `html { scroll-behavior: smooth; }` (전역)
  - `pulse-node` 3s ease-in-out infinite (그리드 배경의 노드)
  - `ScrollFade.tsx` 컴포넌트로 섹션 진입 페이드
  - 호버 시 `transition` 200-300ms

### 2.5 Background Patterns

- **Grid bg** — `.grid-bg` 클래스. 48px 그리드, AX Blue 4% 알파 라인. (globals.css L29-35)
- **Gradient text** — `.gradient-text` 클래스. 텍스트에 브랜드 그라디언트 적용.

## 3. Components

### 3.1 Navigation (`components/Nav.tsx`)
- 상단 고정 네비. 다크 배경 위 sticky.

### 3.2 Footer (`components/Footer.tsx`)
- 페이지 하단. 회사 정보 / 네비 링크 / 소셜.

### 3.3 ScrollFade (`components/ScrollFade.tsx`)
- 자식 요소를 스크롤 위치에 따라 페이드인. 섹션 진입 효과.

### 3.4 Sections (`components/sections/`)
- 페이지를 구성하는 섹션 단위 컴포넌트들. App Router (`app/page.tsx`) 에서 조합.

## 4. Patterns

### 4.1 섹션 단위 페이지 합성
- `app/page.tsx` 는 `<Nav>` + 섹션들 + `<Footer>` 조합. 각 섹션은 fullwidth + 자체 패딩.

### 4.2 그라디언트 텍스트 강조
- 슬로건/핵심 메시지는 `.gradient-text` 또는 인라인 그라디언트로 처리.

### 4.3 다국어 (한/영 혼용)
- 영문은 Sora, 한글은 Noto Sans KR. 같은 문단 내 혼용 시 폰트 스택 자동 선택.

### 4.4 다크 only
- 라이트 모드 미지원 (브랜드 정체성 = deep space).

## 5. Accessibility

- **WCAG target**: 2.2 AA (글로벌 디폴트 인용)
- **Color contrast**: `#94A3B8 (silver) on #0A0E17 (deep)` 대비 5.7:1 — 본문 통과
- **헤딩 위계**: `<h1>` 페이지당 1개. 섹션은 `<h2>` 부터.
- **키보드 네비게이션**: 모든 링크/버튼 포커스 가능. 네비 메뉴는 Tab 순회.
- **Reduced motion**: `prefers-reduced-motion` 시 `pulse-node` / `ScrollFade` 애니메이션 비활성화 (현재 미구현 — 다음 라운드).
- **Alt text**: 이미지에 의미 있는 alt 필수. 장식 이미지는 `alt=""`.

## 6. Constraints (axenior-www 전용)

- **Bebas Neue 는 로고 전용** — 본문/헤딩에 사용 금지.
- **다크 only** — 라이트 모드 도입 금지 (브랜드 정체성).
- **AX Blue → Violet 그라디언트는 1차 강조에만** — 모든 곳에 그라디언트 남발 금지.
- **Next.js App Router** — Pages Router 도입 금지.
- **마케팅 사이트 = SSG/SSR** — 클라이언트 hydration 비용 최소화. 사용자 인터랙션이 적은 섹션은 서버 컴포넌트.
- **외부 폰트는 `next/font`** — 폰트 임포트는 layout.tsx 에서 통제. CDN `<link>` 직접 사용 금지.
- **그리드 배경 (`.grid-bg`) 은 hero 섹션에만** — 페이지 전체에 적용 금지 (밀도 과대).

## 7. References

### 글로벌 디폴트 인용
- **WCAG 2.2 AA** (스킬 §10)
- **W3C DTCG 키 명명** — 본 문서 §2 토큰 키
- **Single Source of Truth = code** — `app/globals.css` + 컴포넌트

### 브랜드 진실의 원천 (이 사이트 한정)
- `BRAND_GUIDE_SUMMARY.md` — 브랜드 정체성
- `axenior-brand-identity-v2.html` — 브랜드 가이드 시각 레퍼런스

### 외부
- [Next.js App Router](https://nextjs.org/docs/app)
- [Tailwind CSS v4](https://tailwindcss.com/)
- [Bebas Neue / Sora / Noto Sans KR / JetBrains Mono — Google Fonts](https://fonts.google.com/)

### 프로젝트 내부
- 토큰: `app/globals.css` (`@theme` 블록)
- 컴포넌트: `components/Nav.tsx`, `Footer.tsx`, `ScrollFade.tsx`, `sections/`
- 진입점: `app/page.tsx`, `app/layout.tsx`
