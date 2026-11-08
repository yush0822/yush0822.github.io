import { useEffect, useRef, useState, type ReactNode } from 'react'
import { profile, projects, resumeSections, skills, type Project } from './data'

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d={diagonal ? 'M6 18 18 6M6 6h12v12' : 'M4 12h16m-6-6 6 6-6 6'} /></svg>
}

function ExternalLink({ href, children, className = '' }: { href: string; children: ReactNode; className?: string }) {
  return <a href={href} target="_blank" rel="noreferrer" className={className}>{children}<Arrow diagonal /><span className="sr-only"> (새 탭)</span></a>
}

const navigation = [{ id: 'projects', label: '프로젝트' }, { id: 'skills', label: '기술 역량' }, { id: 'about', label: '소개' }, { id: 'resume', label: '이력 및 자격' }, { id: 'contact', label: '연락처' }]

function ProjectVisual({ variant }: { variant: string }) {
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
      <div className="visual-bottomline"><span>AWS · DB · Network</span><span>구조 개념도</span></div>
    </div>
  )
}

function ProjectCard({ project }: { project: Project }) {
  const [expanded, setExpanded] = useState(false)
  return (
    <article className="project-card">
      <div className="project-overview">
        <ProjectVisual variant={project.id} />
        <div className="project-copy">
          <div className="flex items-center justify-between gap-4"><span className="eyebrow">{project.category}</span><span className="project-number">/{project.number}</span></div>
          <h3>{project.name}</h3>
          <p className="project-subtitle">{project.subtitle}</p>
          <p className="project-role"><span>담당</span>{project.role}</p>
          {project.period && <p className="project-role"><span>기간</span>{project.period}</p>}
          <p className="project-description">{project.description}</p>
          <div className="flex flex-wrap gap-2" aria-label="프로젝트 기술 및 주제">{project.stack.map(tech => <span className="tag" key={tech}>{tech}</span>)}</div>
          {(Boolean(project.repositories?.length) || project.demo) && <div className="project-links">{project.repositories?.map(repository => <ExternalLink key={repository.url} href={repository.url} className="text-link">{repository.label}</ExternalLink>)}{project.demo && <ExternalLink href={project.demo} className="text-link">서비스 보기</ExternalLink>}</div>}
          {project.repositoryNote && <p className="repository-note">{project.repositoryNote}</p>}
          <button className="details-button" aria-expanded={expanded} aria-controls={`${project.id}-details`} onClick={() => setExpanded(!expanded)}><span>{expanded ? '프로젝트 상세 접기' : '기여한 내용 자세히 보기'}</span><span aria-hidden="true" className="text-xl">{expanded ? '−' : '+'}</span></button>
        </div>
      </div>
      <div id={`${project.id}-details`} className="project-details" data-expanded={expanded}>
        <div><h4>직접 기여한 부분</h4><div className="contributions">{project.contributions.map((item, index) => <div key={item.title}><span className="mono">0{index + 1}</span><div><h5>{item.title}</h5><p>{item.description}</p></div></div>)}</div></div>
        <div className="project-takeaway"><h4>구현 결과와 경험</h4><p>{project.outcome}</p><p>{project.reflection}</p></div>
      </div>
    </article>
  )
}

function SectionHeading({ number, title, subtitle }: { number: string; title: string; subtitle: string }) {
  return <div className="section-heading"><div><p className="eyebrow">{number} / {subtitle}</p><h2>{title}</h2></div></div>
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [copyStatus, setCopyStatus] = useState('')
  const [activeSection, setActiveSection] = useState('')
  const menuButton = useRef<HTMLButtonElement>(null)
  const resetTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => { if (entry.isIntersecting) setActiveSection(entry.target.id) })
    }, { rootMargin: '-15% 0px -60% 0px' })
    navigation.forEach(({ id }) => { const section = document.getElementById(id); if (section) observer.observe(section) })
    return () => { observer.disconnect(); clearTimeout(resetTimer.current) }
  }, [])

  async function copyEmail() {
    clearTimeout(resetTimer.current)
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopyStatus('이메일 주소를 복사했습니다.')
    } catch {
      setCopyStatus('복사하지 못했습니다. 위 이메일 주소를 선택해 복사해 주세요.')
    }
    resetTimer.current = setTimeout(() => setCopyStatus(''), 5000)
  }

  return (
    <>
      <a href="#main" className="skip-link">본문으로 바로가기</a>
      <header className="site-header">
        <div className="shell header-inner">
          <a className="wordmark" href="#" aria-label="유승환 포트폴리오 처음으로">ys<span className="brand-dot">.</span><span className="wordmark-name">유승환</span></a>
          <button ref={menuButton} className="mobile-menu" aria-label={menuOpen ? '메뉴 닫기' : '메뉴 열기'} aria-expanded={menuOpen} aria-controls="site-nav" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? '닫기 −' : '메뉴 +'}</button>
          <nav id="site-nav" aria-label="주요 메뉴" className={menuOpen ? 'site-nav is-open' : 'site-nav'} onKeyDown={event => { if (event.key === 'Escape') { setMenuOpen(false); menuButton.current?.focus() } }}>
            {navigation.map(item => <a key={item.id} href={`#${item.id}`} aria-current={activeSection === item.id ? 'location' : undefined} onClick={() => setMenuOpen(false)}>{item.label}</a>)}
            <ExternalLink href={profile.github} className="nav-github">GitHub</ExternalLink>
          </nav>
        </div>
      </header>

      <main id="main" className="shell">
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-copy">
            <div className="availability"><span /> BACKEND & FULLSTACK DEVELOPER</div>
            <h1 id="hero-title">화면 너머,<br />서비스의 흐름을<br /><span>연결합니다.</span></h1>
            <p className="hero-intro">안녕하세요, 개발자 <strong>{profile.name}</strong>입니다.<br />서비스 설계부터 화면 개발, 배포 환경 구성까지.<br className="desktop-break" /> 전체 흐름을 이해하며 필요한 기능을 구현합니다.</p>
            <div className="hero-actions"><a href="#projects" className="button button-dark">프로젝트 살펴보기 <Arrow /></a><button onClick={() => window.print()} className="button button-outline">이력서 인쇄 / PDF <svg aria-hidden="true" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M12 3v12m-5-5 5 5 5-5M5 16v5h14v-5" /></svg></button></div>
          </div>
          <aside className="developer-card" aria-label="프로필 요약">
            <div className="card-top"><span className="mono">DEVELOPER PROFILE</span><span className="profile-index">/ 01</span></div>
            <div className="code-art" aria-hidden="true"><span className="art-bracket">{'{'}</span><div><span className="art-small">think.</span><strong>build<span>_</span></strong><span className="art-small">connect.</span></div><span className="art-bracket">{'}'}</span><span className="art-orbit" /></div>
            <div className="profile-name"><h2>{profile.name}<span className="hanja-name">{profile.hanjaName}</span></h2><span className="mono">{profile.englishName}</span></div>
            <dl className="profile-facts"><div><dt>FOCUS</dt><dd>{profile.role}</dd></div><div><dt>EDUCATION</dt><dd>{profile.education}<span>졸업</span></dd></div><div><dt>LOCATION</dt><dd>{profile.location}</dd></div></dl>
            <div className="card-footer"><span className="small-status-dot" /> 작은 기능부터, 하나의 서비스까지.</div>
          </aside>
        </section>

        <div className="intro-strip"><span className="eyebrow">FROM INTERFACE TO SERVER</span><p>사용자의 화면과 서버의 동작을 함께 이해하는 개발자</p><span aria-hidden="true">↓</span></div>

        <section id="projects" className="section-block" aria-labelledby="projects-heading">
          <div className="section-heading"><div><p className="eyebrow">01 / SELECTED WORK</p><h2 id="projects-heading">프로젝트로 보여드립니다<span className="heading-period">.</span></h2></div><span className="section-caption">구현한 기능과 직접 맡은 역할을 중심으로</span></div>
          <div className="space-y-7">{projects.map(project => <ProjectCard key={project.id} project={project} />)}</div>
          <div className="projects-footnote"><span>더 많은 코드는 GitHub에서 확인할 수 있습니다.</span><ExternalLink href={profile.github} className="text-link">GitHub 둘러보기</ExternalLink></div>
        </section>

        <section id="skills" className="section-block" aria-label="기술 역량">
          <SectionHeading number="02" title="경험으로 쌓아가는 기술" subtitle="TECH STACK" />
          <div className="skills-grid">{skills.map(skill => <article className="skill-item" key={skill.title}><div className="flex items-center justify-between gap-3"><span className="mono skill-number">{skill.number}</span><span className={skill.label === '학습 중' ? 'skill-label learning' : 'skill-label'}>{skill.label}</span></div><h3>{skill.title}</h3><div className="flex flex-wrap gap-2">{skill.technologies.map(tech => <span key={tech} className="skill-tech">{tech}</span>)}</div><p>{skill.description}</p></article>)}</div>
        </section>

        <section id="about" className="section-block about-section" aria-label="소개와 학력">
          <div><SectionHeading number="03" title="기술을 배우고, 서비스로 연결합니다" subtitle="A LITTLE ABOUT ME" /><p className="about-description">충북대학교에서 소프트웨어를 전공했습니다. 철도 유지보수 자동화 플랫폼에서는 설계와 프론트엔드를, 동아리 홈페이지에서는 프론트엔드·백엔드·DB·네트워크 개발과 관리를 맡았습니다.</p><p className="about-description">백엔드와 풀스택 개발을 목표로, 기능 하나가 사용자에게 도달하기까지의 과정을 이해하고 구현하는 개발자로 성장하고자 합니다.</p></div>
          <div className="education"><span className="eyebrow">EDUCATION</span><div className="education-content"><span className="education-marker" /><div><span className="education-status">2020.03 ~ 2026.02 · 졸업</span><h3>충북대학교</h3><p>소프트웨어학과 · 학사</p></div></div></div>
        </section>

        <section id="resume" className="resume-section" aria-labelledby="resume-heading">
          <div className="section-heading"><div><p className="eyebrow">04 / EXPERIENCE & QUALIFICATIONS</p><h2 id="resume-heading">이력 및 자격<span className="heading-period">.</span></h2></div><span className="section-caption">교육과 경험, 그리고 쌓아온 성취</span></div>
          <div className="resume-grid">{resumeSections.map(section => <article className="resume-card" key={section.id} aria-labelledby={`${section.id}-heading`}><p className="eyebrow">{section.label}</p><h3 id={`${section.id}-heading`}>{section.title}</h3><ul className="resume-list">{section.items.map(item => <li key={item.title}>{item.period && <p className="resume-period mono">{item.period}</p>}<h4>{item.title}</h4><p className="resume-detail">{item.detail}</p></li>)}</ul></article>)}</div>
        </section>

        <section id="contact" className="contact-section" aria-labelledby="contact-heading">
          <div><p className="eyebrow">05 / LET’S CONNECT</p><h2 id="contact-heading">함께 만들 다음 서비스를<br />기대합니다<span>.</span></h2><p>프로젝트와 개발 경험에 대해 더 이야기 나누고 싶습니다.</p></div>
          <div className="contact-actions"><a className="email-link" href={`mailto:${profile.email}`}>{profile.email}<Arrow diagonal /></a><div className="flex flex-wrap items-center gap-6"><button className="contact-copy" onClick={copyEmail}>이메일 주소 복사 <span aria-hidden="true">⧉</span></button><ExternalLink href={profile.github} className="contact-copy">GitHub</ExternalLink></div><p className="copy-status" role="status" aria-live="polite">{copyStatus}</p></div>
        </section>
      </main>

      <footer className="shell site-footer"><p>© {new Date().getFullYear()} {profile.englishName}</p><span>생각을 코드로, 코드를 서비스로.</span><a href="#">맨 위로 ↑</a></footer>
    </>
  )
}
