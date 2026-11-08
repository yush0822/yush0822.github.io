import { useEffect, useRef, useState } from 'react'
import { profile, projects, resumeSections, skills, type Project } from './data'
import ProjectVisual from './ProjectVisual'
import { Arrow, ExternalLink, ProjectLinks, ResumeDownload, SectionHeading, Tags } from './ui'

function ProjectCard({ project }: { project: Project }) {
  return <article className="project-card"><ProjectVisual variant={project.id} /><div className="project-copy">
    <div className="project-kicker"><span className="eyebrow">{project.category}</span><span className="project-number">/{project.number}</span></div>
    <h3>{project.name}</h3><p className="project-subtitle">{project.subtitle}</p><p className="project-description">{project.description}</p>
    <dl className="project-meta"><div><dt>ROLE</dt><dd>{project.role}</dd></div>{project.period && <div><dt>PERIOD</dt><dd>{project.period}</dd></div>}</dl>
    <Tags items={project.stack} /><ProjectLinks project={project} /><a className="project-detail-link" href={`#/projects/${project.id}`}>{project.name} 상세 보기 <Arrow /></a>
  </div></article>
}

function Contact() {
  const [copyStatus, setCopyStatus] = useState('')
  const resetTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  useEffect(() => () => clearTimeout(resetTimer.current), [])
  async function copyEmail() {
    clearTimeout(resetTimer.current)
    try { await navigator.clipboard.writeText(profile.email); setCopyStatus('이메일 주소를 복사했습니다.') }
    catch { setCopyStatus('복사하지 못했습니다. 이메일 주소를 선택해 복사해 주세요.') }
    resetTimer.current = setTimeout(() => setCopyStatus(''), 5000)
  }
  return <section id="contact" className="section-block contact-block" aria-label="Contact">
    <SectionHeading number="06" title="Contact" description="함께 만들 다음 서비스를 기다립니다." />
    <div className="contact-section"><div><p className="eyebrow">LET’S BUILD SOMETHING</p><h3>생각을 나누고,<br />서비스로 연결해요<span>.</span></h3><p>프로젝트와 개발 경험에 대해 더 이야기 나누고 싶습니다.</p><p className="contact-location">BASED IN · {profile.location}</p></div>
      <div className="contact-actions"><a className="email-link" href={`mailto:${profile.email}`}>{profile.email}<Arrow diagonal /></a><div className="contact-links"><button className="contact-copy" onClick={copyEmail}>이메일 주소 복사 <span aria-hidden="true">⧉</span></button><ExternalLink href={profile.github} className="contact-copy">GitHub</ExternalLink></div><p className="copy-status" role="status" aria-live="polite">{copyStatus}</p><ResumeDownload /></div>
    </div>
  </section>
}

export default function HomePage() {
  return <>
    <section id="home" aria-label="Home">
      <div className="hero"><div className="hero-copy"><p className="availability"><span /> DEVELOPER PORTFOLIO / {profile.englishName}</p><h1>설계부터 배포까지,<br />서비스의 흐름을<br /><span>연결합니다.</span></h1><p className="hero-intro">안녕하세요, 개발자 <strong>{profile.name}</strong>입니다.<br />서비스 설계부터 화면 개발, 배포 환경 구성까지.<br />전체 흐름을 이해하며 필요한 기능을 구현합니다.</p><div className="hero-actions"><a className="button button-dark" href="#projects">프로젝트 살펴보기 <Arrow /></a><a className="button button-outline" href="#about">개발자 소개 <Arrow diagonal /></a></div></div>
        <aside className="developer-card" aria-label="프로필 요약"><div className="card-top"><span className="mono">DESIGN · BUILD · CONNECT</span><span className="profile-index">/ 01</span></div><div className="code-art" aria-hidden="true"><span className="art-bracket">{'{'}</span><div><span className="art-small">from an idea.</span><strong>build<span>_</span></strong><span className="art-small">to a service.</span></div><span className="art-bracket">{'}'}</span><span className="art-orbit" /></div><div className="profile-name"><h2>{profile.name}<span className="hanja-name">{profile.hanjaName}</span></h2><span className="mono">{profile.englishName}</span></div><dl className="profile-facts"><div><dt>FOCUS</dt><dd>서비스 설계 · 웹 개발</dd></div><div><dt>EDUCATION</dt><dd>{profile.education}<span>학사</span></dd></div><div><dt>LOCATION</dt><dd>{profile.location}</dd></div></dl><div className="card-footer"><span className="small-status-dot" /> 작은 기능부터, 하나의 서비스까지.</div></aside>
      </div>
      <div className="strengths" aria-label="핵심 역량 요약"><div><span className="mono">01 / DESIGN</span><h2>서비스 설계</h2><p>사용자 흐름과 기능의 역할을 함께 고민합니다.</p></div><div><span className="mono">02 / DEVELOP</span><h2>관리 화면 개발</h2><p>React와 지도 시각화로 데이터를 화면에 연결합니다.</p></div><div><span className="mono">03 / DEPLOY</span><h2>배포 환경 구성</h2><p>DB·네트워크·AWS까지 서비스 전반을 경험했습니다.</p></div></div>
      <div className="featured-work"><div className="featured-heading"><h2 className="eyebrow">SELECTED WORK / 대표 프로젝트</h2><a href="#projects" className="text-link">전체 프로젝트 <Arrow /></a></div><div className="featured-grid">{projects.map(project => <a href={`#/projects/${project.id}`} className="featured-project" key={project.id} aria-label={`${project.name} 프로젝트 상세`}><span className="project-number">{project.number}</span><div><h3>{project.name}</h3><p>{project.subtitle}</p></div><Arrow diagonal /></a>)}</div></div>
    </section>

    <section id="about" className="section-block" aria-label="About Me">
      <SectionHeading number="02" title="About Me" description="기능을 넘어, 하나의 서비스를 이해하고 싶습니다." />
      <div className="about-grid"><div><p className="about-lead">화면에 보이는 경험과<br />그 뒤의 구조를 함께 고민합니다.</p><p className="about-description">충북대학교에서 소프트웨어를 전공했습니다. RailDock에서는 설계와 프론트엔드를, 동아리 홈페이지에서는 개발부터 DB·네트워크 관리와 배포 구성까지 맡았습니다.</p><div className="values"><div><h3>사용자의 흐름에서 시작하기</h3><p>기능을 나열하기보다 사용자가 어떤 정보를 보고 어떤 작업을 해야 하는지 먼저 생각합니다.</p></div><div><h3>서비스 전체를 바라보기</h3><p>화면과 API, 데이터, 배포 환경이 어떻게 연결되는지 이해하며 개발하고자 합니다.</p></div><div><h3>경험한 만큼 말하고, 계속 배우기</h3><p>직접 구현한 부분과 학습 중인 부분을 구분합니다. Spring Boot와 Spring Security는 프로젝트 활용 경험을 바탕으로 이해를 넓히고 있습니다.</p></div></div><p className="eyebrow interests-label">INTERESTS / 관심 분야</p><Tags items={['웹 서비스 설계', '프론트엔드 개발', '지도 기반 시각화', 'AI 서비스 활용', '백엔드 · 배포 환경']} /></div>
        <aside className="about-summary"><p className="eyebrow">EDUCATION & HIGHLIGHTS</p><div className="summary-entry"><span className="resume-period mono">2020.03 ~ 2026.02</span><h3>충북대학교</h3><p>소프트웨어학과 · 학사 졸업</p></div><div className="summary-entry"><span className="resume-period mono">2025.09 ~ 2026.03</span><h3>KT AIVLE School</h3><p>AI 트랙</p></div><div className="summary-entry"><span className="resume-period mono">2026.03</span><h3>AIVLE Big Project 최우수상</h3><p>AI 기반 서비스 개발 부문</p></div><a href="#experience" className="text-link">활동과 자격 더 보기 <Arrow /></a></aside>
      </div>
    </section>

    <section id="tech-stack" className="section-block" aria-label="Tech Stack">
      <SectionHeading number="03" title="Tech Stack" description="기술 이름보다, 어디에 어떻게 활용했는지 소개합니다." />
      <div className="tech-list"><article className="tech-row"><div><p className="eyebrow">LANGUAGES</p><h3>언어</h3><span className="skill-label">프로젝트 활용</span></div><div><Tags items={['TypeScript', 'JavaScript']} /><p>RailDock의 TypeScript 관리 화면과 React 기반 웹 화면을 개발했습니다. 이 포트폴리오도 TypeScript로 작성했습니다.</p></div></article>{skills.map(skill => <article className="tech-row" key={skill.title}><div><p className="eyebrow">{skill.number} / TECHNOLOGY</p><h3>{skill.title}</h3><span className={skill.label === '학습 중' ? 'skill-label learning' : 'skill-label'}>{skill.label}</span></div><div><Tags items={skill.technologies} /><p>{skill.description}</p></div></article>)}</div>
    </section>

    <section id="projects" className="section-block" aria-label="Projects">
      <SectionHeading number="04" title="Projects" description="설계와 구현, 직접 맡은 역할을 기록합니다." />
      <div className="projects-intro"><p>전체 프로젝트 <span className="mono">{String(projects.length).padStart(2, '0')}</span></p><span>각 프로젝트의 개발 과정과 기여 내용을 확인하세요.</span></div><div className="projects-grid">{projects.map(project => <ProjectCard project={project} key={project.id} />)}</div>
    </section>

    <section id="experience" className="section-block" aria-label="Experience">
      <SectionHeading number="05" title="Experience" description="교육과 협업, 프로젝트 밖에서도 이어지는 배움." />
      <div className="experience-layout"><div className="activity-timeline"><article><p className="eyebrow">EDUCATION / 2025.09 — 2026.03</p><h3>KT AIVLE School · AI 트랙</h3><p>KT AIVLE School AI 트랙 교육에 참여했습니다.</p></article><article><p className="eyebrow">COLLABORATION / TEAM PROJECT</p><h3>RailDock 팀 프로젝트</h3><p>설계와 프론트엔드를 맡아 AI 분석 결과를 확인하는 관리 화면을 개발했습니다. 백엔드와 역할을 나누어 서비스 개발에 참여했습니다.</p><a href="#/projects/raildock" className="text-link">담당 역할 살펴보기 <Arrow /></a></article><article><p className="eyebrow">DEVELOPMENT / PERSONAL WEBSITE</p><h3>포트폴리오 사이트 구성</h3><p>프로젝트 경험을 정리하는 React·TypeScript 포트폴리오입니다. GitHub Pages를 통해 배포하고 개발 기록을 계속 보완합니다.</p><ExternalLink href="https://github.com/yush0822/yush0822.github.io">포트폴리오 GitHub</ExternalLink></article></div>
        <div className="qualifications">{resumeSections.filter(section => section.id !== 'training').map(section => <article className="qualification" key={section.id}><h3>{section.title}</h3><ul>{section.items.map(item => <li key={item.title}>{item.period && <span className="resume-period mono">{item.period}</span>}<h4>{item.title}</h4><p>{item.detail}</p></li>)}</ul></article>)}</div>
      </div>
    </section>
    <Contact />
  </>
}
