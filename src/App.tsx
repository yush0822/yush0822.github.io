import { useEffect, useRef, useState, type ReactNode } from 'react'
import { profile, projects, skills, type Project } from './data'

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d={diagonal ? 'M6 18 18 6M6 6h12v12' : 'M4 12h16m-6-6 6 6-6 6'} /></svg>
}

function ExternalLink({ href, children, className = '' }: { href: string; children: ReactNode; className?: string }) {
  return <a href={href} target="_blank" rel="noreferrer" className={className}>{children}<Arrow diagonal /><span className="sr-only"> (새 탭)</span></a>
}

const navigation = [{ id: 'projects', label: '프로젝트' }, { id: 'skills', label: '기술 역량' }, { id: 'about', label: '소개' }, { id: 'contact', label: '연락처' }]

function ProjectVisual({ variant }: { variant: string }) {
  return variant === 'withpet' ? (
    <div className="project-visual pet-visual" aria-label="WithPet의 담당 영역 개념도: React UI, FastAPI AI 서버, Docker 서비스 구성">
      <div className="visual-topline"><span>WITHPET / DEVELOPMENT</span><span className="mini-dot" /></div>
      <div className="pet-symbol" aria-hidden="true"><svg viewBox="0 0 100 100" fill="currentColor"><ellipse cx="28" cy="30" rx="10" ry="14" transform="rotate(-25 28 30)"/><ellipse cx="50" cy="23" rx="10" ry="14"/><ellipse cx="73" cy="31" rx="10" ry="14" transform="rotate(25 73 31)"/><path d="M25 66c0-13 15-29 25-29s25 16 25 29c0 17-15 14-25 11S25 83 25 66"/></svg></div>
      <p className="visual-title">A little tech.<br />A closer connection.</p>
      <div className="service-nodes"><span>React UI</span><span aria-hidden="true">↔</span><span>FastAPI</span></div>
      <div className="visual-bottomline"><span>Docker · 서비스 구성</span><span>담당 영역 개념도</span></div>
    </div>
  ) : (
    <div className="project-visual messenger-visual" aria-label="메시지 암호화와 복호화의 개념을 표현한 일러스트레이션">
      <div className="visual-topline"><span>007 / SECRET MESSENGER</span><span className="mini-dot" /></div>
      <div className="message-window"><div className="window-dots" aria-hidden="true"><i /><i /><i /></div><div className="message-line"><span className="mono">01</span><span>Hello, world.</span></div><div className="encryption-line"><span aria-hidden="true">↓</span> ENCRYPT</div><div className="cipher-text" aria-hidden="true"># · 7 x / * 0 1</div><div className="encryption-line"><span aria-hidden="true">↓</span> DECRYPT</div><div className="message-line final-message"><span className="mono">02</span><span>Hello, world.</span><span aria-hidden="true">↵</span></div></div>
      <div className="visual-bottomline"><span>메시지의 흐름을 설계하다</span><span>개념 일러스트</span></div>
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
          <p className="project-description">{project.description}</p>
          <div className="flex flex-wrap gap-2" aria-label="프로젝트 기술 및 주제">{project.stack.map(tech => <span className="tag" key={tech}>{tech}</span>)}</div>
          <button className="details-button" aria-expanded={expanded} aria-controls={`${project.id}-details`} onClick={() => setExpanded(!expanded)}><span>{expanded ? '프로젝트 상세 접기' : '기여한 내용 자세히 보기'}</span><span aria-hidden="true" className="text-xl">{expanded ? '−' : '+'}</span></button>
        </div>
      </div>
      <div id={`${project.id}-details`} className="project-details" data-expanded={expanded}>
        <div><h4>직접 기여한 부분</h4><div className="contributions">{project.contributions.map((item, index) => <div key={item.title}><span className="mono">0{index + 1}</span><div><h5>{item.title}</h5><p>{item.description}</p></div></div>)}</div></div>
        <div className="project-takeaway"><h4>결과와 배운 점</h4><p>{project.outcome}</p><p>{project.reflection}</p>{project.repository && <ExternalLink href={project.repository} className="text-link">소스 코드</ExternalLink>}{project.demo && <ExternalLink href={project.demo} className="text-link">서비스 보기</ExternalLink>}</div>
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
            <p className="hero-intro">안녕하세요, 개발자 <strong>{profile.name}</strong>입니다.<br />React 화면부터 FastAPI 서버, Docker 서비스 구성까지.<br className="desktop-break" /> 사용자 경험과 기술을 함께 고민하며 구현합니다.</p>
            <div className="hero-actions"><a href="#projects" className="button button-dark">프로젝트 살펴보기 <Arrow /></a><button onClick={() => window.print()} className="button button-outline">이력서 인쇄 / PDF <svg aria-hidden="true" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M12 3v12m-5-5 5 5 5-5M5 16v5h14v-5" /></svg></button></div>
          </div>
          <aside className="developer-card" aria-label="프로필 요약">
            <div className="card-top"><span className="mono">DEVELOPER PROFILE</span><span className="profile-index">/ 01</span></div>
            <div className="code-art" aria-hidden="true"><span className="art-bracket">{'{'}</span><div><span className="art-small">think.</span><strong>build<span>_</span></strong><span className="art-small">connect.</span></div><span className="art-bracket">{'}'}</span><span className="art-orbit" /></div>
            <div className="profile-name"><h2>{profile.name}</h2><span className="mono">{profile.englishName}</span></div>
            <dl className="profile-facts"><div><dt>FOCUS</dt><dd>{profile.role}</dd></div><div><dt>EDUCATION</dt><dd>{profile.education}<span>졸업</span></dd></div></dl>
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
          <div><SectionHeading number="03" title="기술을 배우고, 서비스로 연결합니다" subtitle="A LITTLE ABOUT ME" /><p className="about-description">충북대학교에서 소프트웨어를 전공했습니다. 프로젝트에서는 화면 개발과 AI 서버 구축, 서비스 구조 설계를 경험했습니다.</p><p className="about-description">백엔드와 풀스택 개발을 목표로, 기능 하나가 사용자에게 도달하기까지의 과정을 이해하고 구현하는 개발자로 성장하고자 합니다.</p></div>
          <div className="education"><span className="eyebrow">EDUCATION</span><div className="education-content"><span className="education-marker" /><div><span className="education-status">졸업</span><h3>충북대학교</h3><p>소프트웨어학과</p></div></div><div className="education-focus"><span className="eyebrow">NEXT CHAPTER</span><p>백엔드 / 풀스택 개발</p></div></div>
        </section>

        <section id="contact" className="contact-section" aria-labelledby="contact-heading">
          <div><p className="eyebrow">04 / LET’S CONNECT</p><h2 id="contact-heading">함께 만들 다음 서비스를<br />기대합니다<span>.</span></h2><p>프로젝트와 개발 경험에 대해 더 이야기 나누고 싶습니다.</p></div>
          <div className="contact-actions"><a className="email-link" href={`mailto:${profile.email}`}>{profile.email}<Arrow diagonal /></a><div className="flex flex-wrap items-center gap-6"><button className="contact-copy" onClick={copyEmail}>이메일 주소 복사 <span aria-hidden="true">⧉</span></button><ExternalLink href={profile.github} className="contact-copy">GitHub</ExternalLink></div><p className="copy-status" role="status" aria-live="polite">{copyStatus}</p></div>
        </section>
      </main>

      <footer className="shell site-footer"><p>© {new Date().getFullYear()} {profile.englishName}</p><span>생각을 코드로, 코드를 서비스로.</span><a href="#">맨 위로 ↑</a></footer>
    </>
  )
}
