# 유승환 | 개발 포트폴리오

서비스 설계부터 화면 개발, 배포 환경 구성까지의 경험을 소개하는 React + TypeScript + Tailwind CSS + Vite 포트폴리오입니다.

## 사이트 구조

- **Home** (`#home`): 개발자 소개, 핵심 역량, 대표 프로젝트 미리보기.
- **About Me** (`#about`): 개발 가치관, 관심 분야, 학력 및 주요 활동.
- **Tech Stack** (`#tech-stack`): 언어·프레임워크·DB·인프라의 활용 경험. Spring Boot / Spring Security는 학습 중임을 표시합니다.
- **Projects** (`#projects`): 전체 프로젝트 목록과 GitHub 링크.
- **Experience** (`#experience`): 교육, 팀 프로젝트, 기타 개발 활동, 수상·자격·어학·병역.
- **Contact** (`#contact`): 이메일, GitHub, 이력서 PDF 다운로드.

프로젝트 상세 페이지:

- RailDock: `/#/projects/raildock`
- 동아리 홈페이지: `/#/projects/club`

상세 페이지는 개요·배경, 기간·팀 구성·역할, 기술 스택·선정 이유, 아키텍처, 주요 기능, 문제 해결, 성능·검증, 결과·회고, GitHub / Demo로 구성합니다. 목차 주소도 공유할 수 있습니다. 예: `/#/projects/raildock/architecture`.

GitHub Pages에서 새로고침과 직접 접속이 가능하도록 해시 라우팅을 사용합니다. 별도 서버 라우팅이나 404 리디렉션은 필요 없습니다. 이전 `#skills`, `#resume` 링크도 새 섹션으로 이동합니다.

## 로컬 실행과 검증

Node.js 22.12 이상을 사용합니다.

```sh
npm ci
npm run dev
npm run build
npm run test:resume
npm run test:e2e
```

- 개발 서버: 출력된 주소(기본 `http://127.0.0.1:5173`).
- `build`: 타입 검사 및 정적 빌드, 루트 이력서 PDF가 있으면 배포 파일에 포함.
- `test:resume`: PDF 없음·추가·잘못된 형식에 대한 격리된 빌드 테스트. 실제 이력서 파일은 변경하지 않습니다.
- `test:e2e`: 빌드 후 실행. Microsoft Edge가 필요합니다. 메인·상세 이동, 직접 링크·새로고침·뒤로 가기, 모바일 메뉴, 이메일 복사, PDF 상태, 화면 넘침 등을 검증합니다.
- Windows PowerShell에서 실행 정책 때문에 `npm`이 차단되면 `npm.cmd`를 사용합니다.

## 이력서 PDF 추가

**이 README 및 package.json과 같은 저장소 루트 폴더**에 다음 이름으로 파일을 추가합니다.

```text
유승환이력서.pdf
```

1. 루트 폴더에 실제 PDF를 넣습니다.
2. `npm run build`로 확인합니다. 개발 서버를 사용 중이라면 재시작합니다.
3. PDF를 커밋·푸시하면 GitHub Actions의 다음 빌드에서 자동으로 배포에 포함됩니다.

`build/resume.ts`가 해당 파일을 `dist/유승환이력서.pdf`로 포함하고 다운로드 버튼을 활성화합니다. 다운로드 URL은 `/유승환이력서.pdf`입니다. 파일이 없으면 링크 대신 비활성화된 ‘이력서 PDF 준비 중’ 버튼을 표시합니다. 브라우저 인쇄로 생성한 페이지를 이력서 파일로 대체하지 않습니다.

## 콘텐츠 수정 위치

| 파일 | 내용 |
| --- | --- |
| `src/data.ts` | 공개 프로필, 프로젝트 상세 데이터, 기술 경험, 수상·자격·교육·어학·병역 |
| `src/HomePage.tsx` | 메인 여섯 섹션, 프로젝트 카드, 이메일 복사 |
| `src/ProjectDetail.tsx` | 프로젝트 상세 페이지와 목차 |
| `src/ProjectVisual.tsx` | 실제 화면과 구분되는 기능 개념도 |
| `src/App.tsx` | 내비게이션, 해시 라우팅, 페이지 제목, 포커스와 스크롤 처리 |
| `src/ui.tsx` | 링크, 기술 태그, PDF 다운로드 등 공통 UI |
| `src/styles.css` | 반응형 스타일과 인쇄 레이아웃 |
| `build/resume.ts` | 루트 PDF 확인 및 Vite 배포 자산 처리 |
| `index.html` | 제목과 검색·Open Graph 설명 |

프로젝트의 `repositories`에 `{ label, url }`을 추가하면 카드와 상세 페이지에 표시됩니다. `demo`에는 실제 공개 서비스 주소만 넣습니다. 동아리 홈페이지는 보안상 비공개 저장소이므로 `repositoryNote`로 안내합니다.

추가 자료를 받으면 `src/data.ts`의 아래 항목을 채웁니다.

- `period`, `team`: 확인된 개발 기간과 팀 구성.
- `technologyNotes[].reason`: 실제 대안 비교와 기술 선정 이유. 현재는 확인된 활용 목적만 표시합니다.
- `architecture`: 공개 가능한 구성도. 현재 그림은 기능과 담당 범위를 요약한 개념도입니다.
- `troubleshooting`: `{ problem, solution, result }` 형태의 실제 문제 해결 사례.
- `validation`: `{ title, description }` 형태의 측정 조건·성능 결과·검증 근거.

현재 RailDock 기간은 `2026.01 ~ 2026.03`입니다. 팀 인원, 동아리 홈페이지 개발 기간, 구체적인 기술 선정 이유, 문제 해결 사례와 성능 수치는 제공되지 않아 추정하지 않았습니다. LLM / RAG 보고서 자동화는 설계 범위로 표시합니다. RailDock 저장소 내용은 작업 환경에서 조회하지 못해 코드 수준의 검증을 완료한 것은 아닙니다.

## 공개 정보

영문 이름은 `Seung Hwan, YU`, 한자는 `柳 承 桓`입니다. 충북대학교 소프트웨어학과 학사 졸업을 표시하며, 연락처는 이메일·GitHub, 거주 지역은 청주시까지만 공개합니다. 경력과 고등학교 이력은 표시하지 않습니다. SQLD·ADsP·정보처리기사는 취득일 없이 보유 자격으로 표시합니다. 수상 내역은 특정 프로젝트와의 관계가 확인되기 전까지 독립된 활동 이력으로 둡니다.

## GitHub Pages 배포

대상: https://yush0822.github.io/

GitHub 저장소의 **Settings → Pages → Source**를 **GitHub Actions**로 설정합니다. `main`에 커밋·푸시하면 `.github/workflows/deploy.yml`이 `npm ci` → 타입 검사·Vite 빌드 → `dist` 배포를 수행합니다. PR에서는 빌드만 검증합니다.
