import { useEffect, useRef, useState } from 'react'
import { competencies, profile, projects, resumeSections, skills, type Project } from './data'
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
    <SectionHeading number="06" title="Contact" description="" />
    <div className="contact-section"><div><p className="eyebrow">LET’S BUILD SOMETHING</p><h3>생각을 나누고,<br />서비스로 연결해요<span>.</span></h3><p>프로젝트와 개발 경험에 대해 더 이야기 나누고 싶습니다.</p></div>
      <div className="contact-actions"><a className="email-link" href={`mailto:${profile.email}`}>{profile.email}<Arrow diagonal /></a><div className="contact-links"><button className="contact-copy" onClick={copyEmail}>이메일 주소 복사 <span aria-hidden="true">⧉</span></button><ExternalLink href={profile.github} className="contact-copy">GitHub</ExternalLink></div><p className="copy-status" role="status" aria-live="polite">{copyStatus}</p><ResumeDownload /></div>
    </div>
  </section>
}

export default function HomePage() {
  return <>
    <section id="home" aria-label="Home">
      <div className="hero"><div className="hero-copy"><p className="availability"><span /> DEVELOPER PORTFOLIO / {profile.englishName}</p><h1>설계부터 배포까지,<br />서비스의 흐름을<br /><span>연결합니다.</span></h1><p className="hero-intro">안녕하세요, 개발자 <strong>{profile.name}</strong>입니다.<br />요구사항 분석부터 화면 개발, 배포 환경 구성까지.<br />서비스 구조와 데이터 흐름을 이해하며 구현합니다.</p><div className="hero-actions"><a className="button button-dark" href="#projects">프로젝트 살펴보기 <Arrow /></a><a className="button button-outline" href="#about">개발자 소개 <Arrow diagonal /></a></div></div>
        <aside className="developer-card" aria-label="프로필 요약"><div className="card-top"><span className="mono">DESIGN · BUILD · CONNECT</span><span className="profile-index">/ 01</span></div><div className="code-art" aria-hidden="true"><span className="art-bracket">{'{'}</span><div><span className="art-small">from an idea.</span><strong>build<span>_</span></strong><span className="art-small">to a service.</span></div><span className="art-bracket">{'}'}</span><span className="art-orbit" /></div><div className="profile-name"><h2>{profile.name}<span className="hanja-name">{profile.hanjaName}</span></h2><span className="mono">{profile.englishName}</span></div><dl className="profile-facts"><div><dt>FOCUS</dt><dd>서비스 설계 · 웹 개발</dd></div><div><dt>EDUCATION</dt><dd>{profile.education}<span>학사</span></dd></div><div></div></dl><div className="card-footer"><span className="small-status-dot" /> 작은 기능부터, 하나의 서비스까지.</div></aside>
      </div>
      <div className="strengths" aria-label="핵심 역량 요약"><div><span className="mono">01 / DESIGN</span><h2>서비스 설계</h2><p>사용자의 요구사항을 분석하고 기능과 데이터 흐름을 설계합니다.</p></div><div><span className="mono">02 / DEVELOP</span><h2>웹 서비스 개발</h2><p>React·TypeScript로 사용자 화면을 구현하고 API와 연동해 서비스 기능을 완성합니다.</p></div><div><span className="mono">03 / DEPLOY</span><h2>배포 환경 구성</h2><p>MySQL 데이터 모델링부터 AWS 배포 환경까지 경험했습니다.</p></div></div>
    </section>

    <section id="about" className="section-block" aria-label="About Me">
      <SectionHeading number="02" title="About Me" description="기능을 넘어, 하나의 서비스를 이해하고 싶습니다." />
      <div className="about-grid"><div><p className="about-lead">화면에 보이는 경험과<br />그 뒤의 구조를 함께 고민합니다.</p><p className="about-description">충북대학교에서 소프트웨어를 전공하고 KT AIVLE School에서 다양한 팀 프로젝트를 수행하며 웹 서비스 개발과 AI 기술 활용 경험을 넓혔습니다. React·TypeScript 기반 UI 구현을 바탕으로 서비스의 전체 구조와 데이터 흐름을 이해하고 설계하는 데 관심이 있습니다.</p><div className="values"><div><h3>요구사항을 직관적인 화면으로</h3><p>사용자의 요구사항을 분석하고, 이를 효율적이고 직관적인 소프트웨어로 구현하고자 합니다.</p></div><div><h3>구조와 유지보수성을 함께 고민하기</h3><p>단순한 기능 구현을 넘어 서비스 구조와 데이터 흐름을 이해하고, 유지보수성과 확장성을 고려하며 문제를 해결하고자 합니다.</p></div><div><h3>구현 경험을 바탕으로 설명하기</h3><p>직접 설계하고 구현한 기능을 구체적인 사례로 설명합니다. 프로젝트에서 맡은 역할과 해결한 문제를 중심으로 개발 경험을 정리합니다.</p></div></div><p className="eyebrow interests-label">INTERESTS / 관심 분야</p><Tags items={['서비스 설계', '프론트엔드 개발', '요구사항 분석', 'AI 서비스 활용', '백엔드 · 배포 환경']} /></div>
        <aside className="about-summary"><p className="eyebrow">EDUCATION & HIGHLIGHTS</p><div className="summary-entry"><span className="resume-period mono">2020.03 ~ 2026.02</span><h3>충북대학교</h3><p>소프트웨어학과 · 학사 졸업</p></div><div className="summary-entry"><span className="resume-period mono">2025.09 ~ 2026.03</span><h3>KT AIVLE School</h3><p>AI 트랙</p></div><div className="summary-entry"><span className="resume-period mono">2026.03</span><h3>AIVLE Big Project 최우수상</h3><p>AI 기반 서비스 개발 부문</p></div><a href="#experience" className="text-link">활동과 자격 더 보기 <Arrow /></a></aside>
      </div>
    </section>

    <section id="tech-stack" className="section-block" aria-label="스킬 및 역량">
      <SectionHeading number="03" title="스킬 및 역량" description="어떤 기술을 어떻게 활용하고, 함께 문제를 해결하는지 소개합니다." />
      <div className="capability-heading"><p className="eyebrow">TECHNICAL SKILLS</p><h3>언어 · 프로그램 활용</h3></div>
      <div className="technical-skills">{skills.map(skill => <article className="technical-skill" key={skill.title}><div className="skill-card-top"><span className="mono">{skill.number}</span><span className="skill-label">{skill.label}</span></div><h4>{skill.title}</h4><Tags items={skill.technologies} /><p>{skill.description}</p></article>)}</div>
      <div className="capability-heading competency-heading"><p className="eyebrow">DEVELOPER COMPETENCIES</p><h3>개발자로서의 역량</h3></div>
      <div className="competency-list">{competencies.map(item => <article className="competency-row" key={item.title}><div className="competency-title"><span className="mono">{item.number}</span><h4>{item.title}</h4></div><div><p>{item.description}</p><a href={item.href} className="text-link">{item.linkLabel} <Arrow /></a></div></article>)}</div>
    </section>

    <section id="projects" className="section-block" aria-label="Projects">
      <SectionHeading number="04" title="Projects" description="각 프로젝트의 개발 과정과 기여 내용을 확인하세요." />
      <div className="projects-intro"><p>전체 프로젝트 <span className="mono">{String(projects.length).padStart(2, '0')}</span></p><span></span></div><div className="projects-grid">{projects.map(project => <ProjectCard project={project} key={project.id} />)}</div>
    </section>

    <section id="experience" className="section-block" aria-label="Experience">
      <SectionHeading number="05" title="Experience" description="교육 · 수상 · 자격증 · 어학 · 병역" />
      <div className="qualifications">{[['certifications', 'training'], ['awards', 'languages', 'military']].map(column => <div className="qualification-column" key={column[0]}>{column.map(id => resumeSections.find(section => section.id === id)!).map(section => <article className="qualification" key={section.id}><h3>{section.title}</h3><ul>{section.items.map(item => <li key={item.title}><span className="resume-period mono">{item.period}</span><div><h4>{item.title}</h4><p>{item.detail}</p></div></li>)}</ul></article>)}</div>)}</div>
    </section>
    <Contact />
  </>
}
