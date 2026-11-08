import { projects, type Project } from './data'
import ProjectVisual from './ProjectVisual'
import { Arrow, ProjectLinks, Tags } from './ui'

const sections = [
  ['overview', '프로젝트 개요'], ['role', '기간 · 팀 · 역할'], ['technology', '기술 스택'],
  ['architecture', '시스템 아키텍처'], ['implementation', '주요 기능'], ['troubleshooting', '문제 해결'],
  ['validation', '성능 · 검증'], ['reflection', '결과 · 회고'], ['links', 'GitHub / Demo'],
] as const

export default function ProjectDetail({ project }: { project: Project }) {
  const other = projects[(projects.findIndex(item => item.id === project.id) + 1) % projects.length]
  const sectionLink = (id: string) => `#/projects/${project.id}/${id}`
  return <article className="case-study">
    <div className="case-top"><a href="#projects" className="text-link">← 전체 프로젝트</a><span className="eyebrow">PROJECT / {project.number}</span></div>
    <header className="case-hero">
      <div><p className="eyebrow">{project.category}</p><h1 tabIndex={-1} id="page-title">{project.name}<span className="heading-period">.</span></h1><p className="case-subtitle">{project.subtitle}</p><p className="case-description">{project.description}</p><Tags items={project.stack} /><ProjectLinks project={project} /></div>
      <ProjectVisual variant={project.id} />
    </header>
    <div className="case-layout">
      <nav className="case-toc" aria-label="프로젝트 상세 목차"><p className="eyebrow">ON THIS PAGE</p>{sections.map(([id, label], i) => <a key={id} href={sectionLink(id)}><span className="mono">0{i + 1}</span>{label}</a>)}</nav>
      <div className="case-content">
        <section id="case-overview"><p className="eyebrow">01 / OVERVIEW</p><h2>프로젝트 개요 및 개발 배경</h2><p>{project.background}</p>{project.sourceNote && <p className="case-note source-note">{project.sourceNote}</p>}</section>
        <section id="case-role"><p className="eyebrow">02 / MY ROLE</p><h2>개발 기간 · 팀 구성 · 담당 역할</h2><dl className="case-facts"><div><dt>개발 기간</dt><dd>{project.period ?? '개발 기간 미기재'}</dd></div><div><dt>팀 구성</dt><dd>{project.team ?? '팀 구성 미기재'}</dd></div><div><dt>담당 역할</dt><dd>{project.role}</dd></div></dl><p className="case-note">기여 범위는 아래의 직접 구현한 기능과 설계 내용으로 정리했습니다.</p></section>
        <section id="case-technology"><p className="eyebrow">03 / TECHNOLOGY</p><h2>기술 스택 및 선정 이유</h2>{project.technologyScope && <p className="case-note">{project.technologyScope}</p>}<div className="technology-table">{project.technologyNotes.map(item => <div key={item.name}><h3>{item.name}</h3><p>{item.usage}</p>{item.reason && <p className="technology-reason">선정 이유 · {item.reason}</p>}</div>)}</div>{!project.technologyNotes.some(item => item.reason) && <p className="case-note">현재는 기술별 활용 목적을 소개합니다. 대안 비교와 구체적인 선정 이유는 정리 중입니다.</p>}</section>
        <section id="case-architecture"><p className="eyebrow">04 / ARCHITECTURE</p><h2>시스템 아키텍처</h2><p className="case-note">공개 가능한 기능과 담당 범위를 중심으로 요약한 구성도입니다.</p>{project.architecture.map(flow => <figure className="architecture" key={flow.title}><figcaption>{flow.title}</figcaption><ol>{flow.nodes.map((node, i) => <li key={node}><span className="mono">0{i + 1}</span><span>{node}</span>{i < flow.nodes.length - 1 && <span className="flow-arrow" aria-hidden="true">↓</span>}</li>)}</ol>{flow.note && <p>{flow.note}</p>}</figure>)}</section>
        <section id="case-implementation"><p className="eyebrow">05 / IMPLEMENTATION</p><h2>주요 기능 및 구현 내용</h2>{project.features && <div className="project-feature-group"><h3 className="contribution-heading">서비스 주요 기능 · 팀 프로젝트</h3><div className="implementation-list">{project.features.map((item, i) => <div key={item.title}><span className="implementation-number mono">0{i + 1}</span><div><h4>{item.title}</h4><p>{item.description}</p></div></div>)}</div></div>}<h3 className="contribution-heading">직접 기여한 부분</h3><div className="implementation-list">{project.contributions.map((item, i) => <div key={item.title}><span className="implementation-number mono">0{i + 1}</span><div><h4>{item.title}</h4><p>{item.description}</p></div></div>)}</div></section>
        <section id="case-troubleshooting"><p className="eyebrow">06 / TROUBLESHOOTING</p><h2>기술적 문제와 해결 과정</h2>{project.troubleshooting?.length ? project.troubleshooting.map(item => <div className="case-record" key={item.problem}><h3>{item.problem}</h3><p>해결 과정 · {item.solution}</p><p>해결 결과 · {item.result}</p></div>) : <p className="case-note">구체적인 문제 상황, 해결 과정과 검증 근거를 정리 중입니다.</p>}</section>
        <section id="case-validation"><p className="eyebrow">07 / VALIDATION</p><h2>성능 개선 및 검증 결과</h2>{project.validation?.length ? project.validation.map(item => <div className="case-record" key={item.title}><h3>{item.title}</h3><p>{item.description}</p></div>) : <p className="case-note">공개된 성능 측정 및 검증 자료는 아직 없습니다. 구현 결과는 아래에 정리했습니다.</p>}</section>
        <section id="case-reflection"><p className="eyebrow">08 / RETROSPECTIVE</p><h2>프로젝트 결과 및 회고</h2><div className="case-result"><h3>구현 결과</h3><p>{project.outcome}</p><h3>경험과 회고</h3><p>{project.reflection}</p></div></section>
        <section id="case-links"><p className="eyebrow">09 / LINKS</p><h2>GitHub / Demo</h2><ProjectLinks project={project} />{!project.demo && <p className="case-note">공개 데모는 제공하지 않습니다.</p>}</section>
      </div>
    </div>
    <div className="case-bottom"><a href="#projects" className="button button-outline">전체 프로젝트 보기</a>{other && <a className="text-link" href={`#/projects/${other.id}`}>{other.name} 살펴보기 <Arrow /></a>}</div>
  </article>
}
