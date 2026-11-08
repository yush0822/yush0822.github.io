# 유승환 | 백엔드 · 풀스택 개발 포트폴리오

충북대학교 소프트웨어학과 졸업생의 취업용 포트폴리오입니다. 기존 HTML 페이지의 프로젝트 정보를 바탕으로 React + TypeScript + Tailwind CSS + Vite로 개편했습니다.

## 로컬 실행

Node.js 22.12 이상이 필요합니다. CI에서는 Node.js 22를 사용합니다.

```sh
npm ci
npm run dev
```

- 개발 서버: 터미널에 표시되는 주소(기본 `http://127.0.0.1:5173`)
- 타입 검사 및 정적 빌드: `npm run build`
- 빌드 결과 확인: `npm run preview`
- 브라우저 테스트: `npm run test:e2e` (Microsoft Edge 설치 필요, 먼저 빌드)

## GitHub Pages 배포

대상 주소: https://yush0822.github.io/

1. GitHub 저장소 **Settings → Pages → Build and deployment → Source**를 **GitHub Actions**로 설정합니다.
2. 변경 파일과 `package-lock.json`을 `main`에 커밋·푸시합니다.
3. **Actions → Deploy portfolio to GitHub Pages**의 성공 여부를 확인합니다.

워크플로는 `npm ci` → 타입 검사·Vite 빌드 → `dist` 배포를 수행합니다. PR에서는 빌드만 검증하고 배포하지 않습니다. 이 저장소는 사용자 사이트이므로 Vite의 `base`는 `/`입니다. 섹션 이동은 해시 앵커를 사용해 별도 서버 라우팅이 필요 없습니다. 기존 Jekyll `_config.yml`은 제거했습니다.

설정 근거: [Vite GitHub Pages 배포 문서](https://vite.dev/guide/static-deploy.html#github-pages), [GitHub Pages 사용자 지정 워크플로](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages), [Tailwind CSS Vite 통합](https://tailwindcss.com/docs/installation/using-vite).

## 수정 위치

| 파일 | 내용 |
| --- | --- |
| `src/data.ts` | 공개 프로필, 프로젝트, 기술 경험, 수상·자격증·교육·경력·어학·병역 |
| `src/App.tsx` | 화면 구성, 프로젝트 펼치기, 모바일 메뉴, 이메일 복사 |
| `src/styles.css` | Tailwind CSS, 반응형 스타일, 인쇄 레이아웃 |
| `index.html` | 제목, 검색 설명, Open Graph 메타데이터 |
| `.github/workflows/deploy.yml` | GitHub Pages 자동 빌드·배포 |
| `tests/portfolio.spec.ts` | 화면 크기별 넘침, 메뉴, 상세 보기, 클립보드, 인쇄 검사 |

프로젝트의 `repositories`에 `{ label, url }` 목록을, `demo`에 서비스 URL을 넣으면 상세 영역에 링크가 표시됩니다. RailDock은 제공된 프론트엔드·백엔드 저장소를 연결했으며 백엔드는 팀 저장소로 표시합니다. 동아리 홈페이지는 주소를 제공받지 않아 링크를 생략했습니다. 프로젝트 그림은 담당 영역과 데이터 흐름을 설명하는 **개념도**이며 실제 서비스 화면이 아닙니다.

‘이력서 인쇄 / PDF’는 브라우저 인쇄 창을 엽니다. PDF로 저장을 선택하면 됩니다. 인쇄 시 모든 프로젝트 상세 내용을 펼치고 메뉴와 장식 이미지는 숨깁니다. 현재 구성은 상세 포트폴리오 출력이며, 한 장짜리 이력서가 필요하면 별도 요약본으로 편집하는 편이 좋습니다.

## 이력 정보

영문 이름은 `Seung Hwan, YU`, 한자는 `柳 承 桓`으로 표기합니다. 제공된 학력 기간과 수상·교육·경력·어학·병역을 반영했으며, SQLD·ADsP·정보처리기사는 취득일 정보 없이 보유 자격으로 표시합니다. 공개 연락처는 이메일·GitHub이며 거주 지역은 청주시까지만 표시합니다.

최종 학력은 충북대학교 소프트웨어학과 학사 졸업입니다. 원본 이력서의 ‘대학원 재학 중’은 잘못 들어간 문구로 확인했습니다. RailDock 개발 기간은 확인된 `2026.01 ~ 2026.03`으로 표시합니다. 수상 내역은 특정 프로젝트와의 관계가 확인되기 전까지 독립된 이력으로 표시합니다.

## 대표 프로젝트

- **RailDock:** 철도 유지보수 자동화 플랫폼. 본인 역할은 설계와 프론트엔드 개발이며, React / TypeScript 관리 화면, OpenLayers 결함 위치 시각화, Bounding Box 조회·수정 UI, AI 탐지 결과 및 분석 상태 조회를 소개합니다. LLM / RAG 보고서 자동화는 설계 범위로 표기합니다.
- **동아리 홈페이지:** 설계부터 React 프론트엔드, Spring Boot REST API, DB 및 네트워크 개발·관리, AWS 배포 구성까지 담당한 프로젝트입니다. Spring Security 인증·인가와 USER / OPERATOR / ADMIN 기반 RBAC를 소개합니다.

내용은 사용자가 제공한 역할과 기능을 기준으로 작성했습니다. RailDock 저장소 내용은 이번 작업 환경에서 조회하지 못했으므로 코드 수준의 검증을 완료한 것은 아닙니다. 동아리 홈페이지 개발 기간, 팀 규모, 성과 수치, 구체적인 DB 제품과 AWS 서비스는 확인 전까지 기재하지 않습니다.

### 추가할 수 있는 자료

- 동아리 이름과 저장소·서비스 주소, 각 프로젝트의 실제 화면과 시연 자료.
- 동아리 홈페이지 개발 기간과 각 프로젝트 팀 규모, 직접 작성한 코드·PR 및 설계 자료.
- RailDock의 지도·Bounding Box UI 구현 사례와 보고서 자동화 설계도.
- 동아리 홈페이지의 역할별 권한표, API 명세, ERD와 배포 구성도.
- 실제 문제 해결 사례와 테스트·측정 결과. 수치를 추가할 때는 측정 조건과 방법도 함께 기록합니다.

### 프로젝트 상세 작성 틀

각 대표 프로젝트에 아래 내용을 실제 근거와 함께 1~2개씩만 채워도 설득력이 높아집니다.

1. **상황:** 어떤 사용자 또는 기술적 문제가 있었는가?
2. **제약:** 시간, 인프라, API, 모델, 팀 구성에 어떤 제약이 있었는가?
3. **판단:** 어떤 대안을 비교했고 왜 이 방식을 골랐는가?
4. **구현:** 내가 변경한 코드·설계와 직접 맡은 범위는 무엇인가?
5. **검증:** 테스트·로그·측정·시연으로 무엇을 확인했는가?
6. **회고:** 남은 한계와 다음 개선은 무엇인가?

예: ‘결함 분석 결과 조회에서 **[실제 문제]** 발생 → **[비교한 대안]** 검토 → **[선택 이유]**로 **[직접 구현]** → **[측정 조건]**에서 **[결과]** 확인.’ 대괄호는 작성 안내이며 공개 페이지에 넣을 성과가 아닙니다.
