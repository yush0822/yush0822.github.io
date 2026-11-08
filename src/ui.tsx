import type { ReactNode } from 'react'
import type { Project } from './data'

export function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d={diagonal ? 'M6 18 18 6M6 6h12v12' : 'M4 12h16m-6-6 6 6-6 6'} /></svg>
}

export function ExternalLink({ href, children, className = 'text-link' }: { href: string; children: ReactNode; className?: string }) {
  return <a href={href} target="_blank" rel="noreferrer" className={className}>{children}<Arrow diagonal /><span className="sr-only"> (새 탭)</span></a>
}

export function ProjectLinks({ project }: { project: Project }) {
  return <>
    {(Boolean(project.repositories?.length) || project.demo) && <div className="project-links">{project.repositories?.map(repository => <ExternalLink key={repository.url} href={repository.url}>{repository.label}</ExternalLink>)}{project.demo && <ExternalLink href={project.demo}>Demo · 서비스 보기</ExternalLink>}</div>}
    {project.repositoryNote && <p className="repository-note">{project.repositoryNote}</p>}
  </>
}

export function Tags({ items }: { items: string[] }) {
  return <div className="tags">{items.map(item => <span className="tag" key={item}>{item}</span>)}</div>
}

export function SectionHeading({ number, title, description }: { number: string; title: string; description: string }) {
  return <div className="section-heading"><div><p className="eyebrow">{number} / PORTFOLIO</p><h2>{title}<span className="heading-period">.</span></h2></div><p className="section-caption">{description}</p></div>
}

export function ResumeDownload() {
  return __RESUME_AVAILABLE__
    ? <a className="button button-outline resume-download" href="/유승환이력서.pdf" download="유승환이력서.pdf">이력서 PDF 다운로드 <span aria-hidden="true">↓</span></a>
    : <div className="resume-pending"><button className="button button-outline" disabled>이력서 PDF 준비 중</button><p>이력서는 곧 제공할 예정입니다.</p></div>
}
