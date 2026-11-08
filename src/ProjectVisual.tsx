import type { ReactNode } from 'react'

function VisualFrame({ variant, title, label, footer, children }: { variant: string; title: string; label: string; footer: string; children: ReactNode }) {
  return <div className={`project-visual ${variant}-visual`} role="img" aria-label={label}>
    <div className="visual-topline"><span>{title}</span><span className="mini-dot" /></div>
    <div className="visual-content" aria-hidden="true">{children}</div>
    <div className="visual-bottomline"><span>{footer}</span><span>기능 개념도</span></div>
  </div>
}

function PetIllustration({ companion = false }: { companion?: boolean }) {
  return <svg viewBox="0 0 180 110" fill="none">
    <ellipse cx="90" cy="97" rx="65" ry="6" fill="currentColor" opacity=".1" />
    {companion && <g stroke="currentColor" strokeWidth="3" strokeLinecap="round"><circle cx="128" cy="29" r="12" fill="#f7f0df" /><path d="M113 88V61q0-16 15-16t15 16v27M119 96V75m17 21V75M114 60l-14 15" /><path d="m151 23 3-6 3 6 6 3-6 3-3 6-3-6-6-3Z" strokeWidth="1.5" /></g>}
    <g stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round"><path d="M48 87V64q0-17 20-17t20 17v23" fill="#d8bc8e" /><path d="M49 57 38 47l5-24 16 12m25 22 11-10-5-24-16 12" fill="#a48b67" /><rect x="48" y="29" width="39" height="36" rx="17" fill="#e8d2aa" /><path d="M57 88v8m20-8v8M89 81q18-5 15-17" strokeLinecap="round" /><circle cx="60" cy="44" r="1.5" fill="currentColor" /><circle cx="76" cy="44" r="1.5" fill="currentColor" /><path d="m65 52 3 3 3-3m-3 3v5" strokeLinecap="round" /></g>
  </svg>
}

export default function ProjectVisual({ variant }: { variant: string }) {
  if (variant === 'adoption') return <VisualFrame variant="adoption" title="WITH PET / AI ADOPTION" footer="React · FastAPI · AI"
    label="With Pet 기능 개념도: Before & After 및 사용자 동반 이미지 생성, 설문 기반 맞춤 품종 추천과 반려동물 정보 챗봇. 공공데이터 수급 차질 시 게시글 크롤링으로 임시 대응한 뒤 공공데이터로 복귀했습니다.">
    <div className="visual-title"><span>AI로 그리는 새로운 만남</span><strong>함께할 모습을 상상하다.</strong></div>
    <div className="pet-comparison"><div><span className="visual-caption">BEFORE · 유기동물 사진</span><PetIllustration /></div><span className="comparison-arrow">→</span><div><span className="visual-caption">AFTER · AI 이미지</span><PetIllustration companion /></div></div>
    <div className="visual-duo"><div><span className="visual-caption">PERSONAL MATCH</span><strong>맞춤 품종 추천</strong><p>설문 → 특성 분석 → 추천</p></div><div><span className="visual-caption">PET CHATBOT</span><strong>반려동물 챗봇</strong><p>관리 팁 · 품종 정보</p></div></div>
    <div className="visual-note"><span>DATA</span><p>공공데이터 수급 차질 → 크롤링 임시 대응 → 복귀</p></div>
  </VisualFrame>

  if (variant === 'raildock') return <VisualFrame variant="rail" title="RAILDOCK / MAINTENANCE" footer="React · TypeScript · OpenLayers"
    label="RailDock 기능 개념도: 지도에서 결함 위치를 확인하고 이미지의 Bounding Box를 검토·수정합니다. 이미지와 탐지 좌표계의 차이는 좌표 변환으로 해결했으며 LLM/RAG 보고서 자동화는 설계 범위입니다.">
    <div className="visual-title"><span>철도 유지보수 관리</span><strong>탐지 결과를 검토와 조치로.</strong></div>
    <div className="rail-workspace"><div className="rail-location"><span className="visual-caption">01 / 결함 위치</span><svg viewBox="0 0 180 125" fill="none"><path d="m-10 30 200 65M25-10l45 150M140-10l-30 150" stroke="currentColor" strokeWidth="10" opacity=".1" /><path d="M-10 105C45 105 55 20 100 45s60 35 95-30" stroke="#bfd393" strokeWidth="6" /><path d="M-10 105C45 105 55 20 100 45s60 35 95-30" stroke="#344e38" strokeWidth="2" strokeDasharray="4 4" /><circle cx="91" cy="43" r="14" fill="#e5c984" opacity=".15" /><circle cx="91" cy="43" r="5" fill="#e5c984" /></svg><p>OpenLayers 지도</p></div><div className="rail-review"><span className="visual-caption">02 / 탐지 영역 검토</span><svg viewBox="0 0 180 125" fill="none"><path d="m44 125 29-125m41 125L94 0" stroke="currentColor" strokeWidth="5" opacity=".5" /><path d="M66 22h31M61 44h40M56 67h48M50 94h59M43 121h70" stroke="currentColor" strokeWidth="4" opacity=".25" /><path d="m76 48 12 9-9 10 12 7" stroke="#e5c984" strokeWidth="3" /><rect x="63" y="37" width="40" height="49" stroke="#e5c984" strokeWidth="1.5" strokeDasharray="4 3" /><path d="M60 42v-8h8m30 0h8v8m0 39v8h-8m-30 0h-8v-8" stroke="#e5c984" strokeWidth="2" /></svg><p>Bounding Box 조회·수정</p></div></div>
    <div className="visual-process"><span>분석 상태 조회</span><b>→</b><span>결함 검토</span><b>→</b><span>상태 관리</span></div>
    <div className="visual-note"><span>SOLVE</span><p>이미지·탐지 좌표계 변환으로 위치 불일치 해결</p></div>
    <div className="visual-note"><span>DESIGN</span><p>LLM / RAG 보고서 자동화 설계</p></div>
  </VisualFrame>

  return <VisualFrame variant="club" title="SAMMARU / CLUB SERVICE" footer="React · Spring Boot · MySQL"
    label="동아리 홈페이지 기능 개념도: React 사용자 화면, Spring Security 인증·인가, USER·STAFF·ADMIN 권한, Spring Boot API와 MySQL 구성. AWS 비용 문제로 현재 서버 중지 상태이며 학교 내 컴퓨터를 활용한 자체 서버 이전을 검토하고 학교 측 답변을 기다리고 있습니다.">
    <div className="visual-title"><span>동아리의 정보와 운영을 한곳에</span><strong>설계부터 배포까지.</strong></div>
    <div className="club-system"><div className="club-browser"><span className="browser-dots">● ● ●</span><span>sammaru.co.kr</span><span>React</span></div><div className="club-access"><span className="visual-caption">ROLE-BASED ACCESS</span><div className="club-roles"><span>USER</span><span>STAFF</span><span>ADMIN</span></div><p>Spring Security · 인증·인가</p></div><div className="club-services"><span>Spring Boot API</span><b>↔</b><span>MySQL</span></div></div>
    <div className="club-hosting"><div><span className="hosting-dot" /><strong>AWS 서버 중지</strong><span>운영 비용 부담</span></div><p>학교 내 컴퓨터로 자체 서버 이전 검토</p><span className="hosting-pending">학교 측 답변 대기 중</span></div>
  </VisualFrame>
}
