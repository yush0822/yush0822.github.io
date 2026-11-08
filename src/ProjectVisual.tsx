export default function ProjectVisual({ variant }: { variant: string }) {
  if (variant === 'adoption') return (
    <div className="project-visual adoption-visual" role="img" aria-label="With Pet 기능 개념도: AI 이미지 생성, 맞춤 품종 추천, 반려동물 정보 챗봇">
      <div className="visual-topline"><span>WITH PET / AI SERVICE</span><span className="mini-dot" /></div>
      <div className="adoption-window"><svg aria-hidden="true" viewBox="0 0 100 90" fill="currentColor"><ellipse cx="28" cy="27" rx="9" ry="13" transform="rotate(-25 28 27)" /><ellipse cx="50" cy="20" rx="9" ry="13" /><ellipse cx="72" cy="27" rx="9" ry="13" transform="rotate(25 72 27)" /><path d="M25 62c0-12 15-27 25-27s25 15 25 27c0 16-15 13-25 10S25 78 25 62" /></svg><p>함께할 모습을 그리고,<br />새로운 만남을 잇다.</p><div className="adoption-features"><span>AI 이미지 생성</span><span>맞춤 품종 추천</span><span>반려동물 챗봇</span></div></div>
      <div className="visual-bottomline"><span>React · TypeScript · Python</span><span>기능 개념도</span></div>
    </div>
  )
  return variant === 'raildock' ? (
    <div className="project-visual rail-visual" role="img" aria-label="RailDock 개념도: 지도 위 결함 위치와 Bounding Box를 확인하고 분석 결과를 조회하는 관리 화면">
      <div className="visual-topline"><span>RAILDOCK / MAINTENANCE</span><span className="mini-dot" /></div>
      <div className="rail-map" aria-hidden="true">
        <svg viewBox="0 0 340 150" fill="none"><path className="map-road" d="M-10 35 110 75 205 15 350 60M35-10 85 65 55 160M230-10 250 70 335 160M-10 130 125 100 240 130 350 105" /><path className="map-track" d="M-10 115C85 115 90 45 175 65S260 110 350 25" /><path className="map-track-inner" d="M-10 115C85 115 90 45 175 65S260 110 350 25" /><rect x="139" y="39" width="61" height="50" rx="4" className="defect-box"/><circle cx="169" cy="63" r="6" className="defect-marker"/><circle cx="270" cy="76" r="4" className="map-marker"/></svg>
        <span className="map-caption">OpenLayers · 결함 위치</span>
      </div>
      <div className="analysis-flow"><span>결함 위치</span><span aria-hidden="true">→</span><span>탐지 결과</span><span aria-hidden="true">→</span><span>검토·수정</span></div>
      <div className="visual-bottomline"><span>React · TypeScript</span><span>기능 개념도</span></div>
    </div>
  ) : (
    <div className="project-visual club-visual" role="img" aria-label="동아리 홈페이지 구조 개념도: React와 Spring Boot API, Spring Security 인증·인가 및 USER, OPERATOR, ADMIN 역할 구분">
      <div className="visual-topline"><span>CLUB / WEB SERVICE</span><span className="mini-dot" /></div>
      <div className="access-window"><div className="window-dots" aria-hidden="true"><i /><i /><i /></div><p className="access-heading">역할에 맞는 접근 권한</p><div className="role-list"><span>USER</span><span>OPERATOR</span><span>ADMIN</span></div><div className="security-layer">Spring Security · 인증 / 인가</div><div className="architecture-flow"><span>React</span><span aria-hidden="true">↔</span><span>Spring Boot API</span></div></div>
      <div className="visual-bottomline"><span>AWS · MySQL · Network</span><span>구조 개념도</span></div>
    </div>
  )
}

