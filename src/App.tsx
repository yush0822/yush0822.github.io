import { useEffect, useRef, useState } from 'react'
import { profile, projects } from './data'
import HomePage from './HomePage'
import ProjectDetail from './ProjectDetail'
import { Arrow } from './ui'

const navigation = [
  { id: 'home', label: 'Home' }, { id: 'about', label: 'About Me' },
  { id: 'tech-stack', label: '스킬 및 역량' }, { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' }, { id: 'contact', label: 'Contact' },
]

export default function App() {
  const [hash, setHash] = useState(window.location.hash)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const menuButton = useRef<HTMLButtonElement>(null)
  const detailRoute = hash.startsWith('#/')
  const parts = hash.slice(2).split('/')
  const project = detailRoute && parts[0] === 'projects' ? projects.find(item => item.id === parts[1]) : undefined
  const projectId = project?.id

  useEffect(() => {
    const onHashChange = () => { setHash(window.location.hash); setMenuOpen(false) }
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  useEffect(() => {
    document.title = project ? `${project.name} | 유승환 포트폴리오` : detailRoute ? '페이지를 찾을 수 없습니다 | 유승환' : '유승환 | 포트폴리오'
    const aliases: Record<string, string> = { skills: 'tech-stack', resume: 'experience' }
    const targetId = project ? (parts[2] ? `case-${parts[2]}` : 'page-title') : detailRoute ? 'page-title' : aliases[hash.slice(1)] ?? (hash.slice(1) || 'home')
    const target = document.getElementById(targetId) ?? document.getElementById('page-title')
    if (target) {
      if (detailRoute && !parts[2]) { window.scrollTo({ top: 0, behavior: 'instant' }); target.focus({ preventScroll: true }) }
      else target.scrollIntoView({ behavior: 'instant', block: 'start' })
    }
  }, [hash, projectId, detailRoute])

  useEffect(() => {
    if (detailRoute) return
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) if (entry.isIntersecting) setActiveSection(entry.target.id)
    }, { rootMargin: '-15% 0px -60% 0px' })
    navigation.forEach(({ id }) => { const node = document.getElementById(id); if (node) observer.observe(node) })
    return () => observer.disconnect()
  }, [detailRoute])

  return <>
    <a href="#main" className="skip-link" onClick={event => { event.preventDefault(); document.getElementById('main')?.focus() }}>본문으로 바로가기</a>
    <header className="site-header"><div className="shell header-inner"><a className="wordmark" href="#home" aria-label="유승환 포트폴리오 처음으로">ys<span className="brand-dot">.</span><span className="wordmark-name">유승환</span></a><button className="mobile-menu" ref={menuButton} aria-expanded={menuOpen} aria-controls="site-nav" aria-label={menuOpen ? '메뉴 닫기' : '메뉴 열기'} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? '닫기 −' : '메뉴 +'}</button><nav id="site-nav" className={menuOpen ? 'site-nav is-open' : 'site-nav'} aria-label="주요 메뉴" onKeyDown={event => { if (event.key === 'Escape') { setMenuOpen(false); menuButton.current?.focus() } }}>{navigation.map(item => <a href={`#${item.id}`} key={item.id} aria-current={(detailRoute ? 'projects' : activeSection) === item.id ? 'location' : undefined} onClick={() => setMenuOpen(false)}>{item.label}</a>)}</nav></div></header>
    <main id="main" className="shell" tabIndex={-1}>{detailRoute ? project ? <ProjectDetail key={project.id} project={project} /> : <div className="not-found"><p className="eyebrow">404 / PROJECT NOT FOUND</p><h1 id="page-title" tabIndex={-1}>프로젝트를 찾을 수 없습니다.</h1><a href="#projects" className="button button-dark">전체 프로젝트로 돌아가기 <Arrow /></a></div> : <HomePage />}</main>
    <footer className="shell site-footer"><p>© {new Date().getFullYear()} {profile.englishName}</p><span>생각을 코드로, 코드를 서비스로.</span><a href="#home">Home ↑</a></footer>
  </>
}
