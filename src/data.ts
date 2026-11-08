export const profile = {
  name: '유승환',
  englishName: 'Seung Hwan, YU',
  hanjaName: '柳 承 桓',
  location: '청주시',
  email: 'yush08222@gmail.com',
  github: 'https://github.com/yush0822',
  education: '충북대학교 소프트웨어학과',
  role: '백엔드 / 풀스택 개발',
}

export const resumeSections = [
  {
    id: 'awards', title: '수상', label: 'AWARDS',
    items: [
      { title: 'AIVLE Big Project 최우수상', detail: 'AI 기반 서비스 개발 부문 · KT, 고용노동부', period: '2026.03' },
      { title: '2024 스마트&디지털페스티벌 장려상', detail: '충북과학기술혁신원', period: '2024.12' },
    ],
  },
  {
    id: 'certifications', title: '자격증', label: 'CERTIFICATIONS',
    items: [
      { title: '정보처리기사', detail: '보유', period: '' },
      { title: 'SQLD', detail: '보유', period: '' },
      { title: 'ADsP', detail: '보유', period: '' },
    ],
  },
  {
    id: 'training', title: '교육 · 연수', label: 'TRAINING',
    items: [{ title: 'KT AIVLE School', detail: 'AI 트랙 · KT', period: '2025.09 ~ 2026.03' }],
  },
  {
    id: 'languages', title: '어학', label: 'LANGUAGES',
    items: [{ title: 'OPic · IM1', detail: '영어 · ACTFL', period: '2026.09' }],
  },
  {
    id: 'military', title: '병역', label: 'MILITARY SERVICE',
    items: [{ title: '육군 병장 만기제대', detail: '군필', period: '2021.03 ~ 2022.09' }],
  },
]

export interface Project {
  id: string
  number: string
  name: string
  category: string
  role: string
  period?: string
  subtitle: string
  description: string
  stack: string[]
  contributions: { title: string; description: string }[]
  outcome: string
  reflection: string
  repositories?: { label: string; url: string }[]
  repositoryNote?: string
  demo?: string
}

// 기간·팀 규모·성과 수치·저장소 주소는 확인한 실제 정보만 추가합니다.
export const projects: Project[] = [
  {
    id: 'raildock',
    number: '01',
    name: 'RailDock',
    category: 'RAILWAY · AI PLATFORM',
    role: '설계 · 프론트엔드 개발',
    period: '2026.01 ~ 2026.03',
    subtitle: '철도 유지보수 자동화 플랫폼',
    description: 'AI 결함 탐지 결과와 분석 상태를 확인하고, 지도에서 결함 위치를 살펴보는 관리 플랫폼입니다. 서비스 설계와 프론트엔드 개발을 담당했습니다.',
    stack: ['React', 'TypeScript', 'OpenLayers', 'Bounding Box', 'LLM / RAG 설계'],
    contributions: [
      { title: 'React / TypeScript 관리 화면', description: '철도 유지보수 업무를 위한 관리 화면을 설계하고 React와 TypeScript로 개발했습니다.' },
      { title: '지도 기반 결함 위치 시각화', description: 'OpenLayers를 활용해 지도 위에서 결함 위치를 확인할 수 있도록 시각화했습니다.' },
      { title: 'Bounding Box 조회·수정 UI', description: '탐지된 결함의 Bounding Box를 조회하고 수정할 수 있는 UI를 구현했습니다.' },
      { title: 'AI 탐지 결과 및 분석 상태 조회', description: 'AI 결함 탐지 결과와 분석 진행 상태를 확인하는 화면을 개발했습니다.' },
      { title: 'LLM / RAG 보고서 자동화 설계', description: 'LLM과 RAG를 활용한 유지보수 보고서 자동화 방식을 설계했습니다.' },
    ],
    outcome: '결함 위치 시각화, Bounding Box 조회·수정, AI 탐지 결과와 분석 상태 조회를 관리 화면으로 구현했습니다.',
    reflection: 'AI 분석 결과를 사용자가 확인하고 수정하는 화면으로 연결하고, 보고서 자동화까지 이어지는 업무 흐름을 설계했습니다.',
    repositories: [
      { label: 'GitHub · 프론트엔드', url: 'https://github.com/AIVLE-08-14/raildock-front' },
      { label: 'GitHub · 백엔드 (팀 저장소)', url: 'https://github.com/AIVLE-08-14/raildock-server' },
    ],
  },
  {
    id: 'club',
    number: '02',
    name: '동아리 홈페이지',
    repositoryNote: 'GitHub 비공개 · 보안상 소스 코드 미공개',
    category: 'FULLSTACK · WEB SERVICE',
    role: '설계 · 풀스택 개발 · DB 및 네트워크 관리',
    subtitle: '설계부터 배포 구성까지, 서비스 전반을 개발하다',
    description: '학교 동아리 홈페이지의 설계, 프론트엔드, 백엔드, DB, 네트워크를 전반적으로 개발·관리했습니다. RBAC를 적용해 사용자 역할에 따라 권한을 구분했습니다.',
    stack: ['React', 'Spring Boot', 'Spring Security', 'RBAC', 'AWS'],
    contributions: [
      { title: '서비스 설계 및 React 프론트엔드', description: '동아리 홈페이지를 설계하고 React 기반 프론트엔드를 개발했습니다.' },
      { title: 'Spring Boot REST API', description: 'Spring Boot 기반 REST API를 개발해 프론트엔드와 백엔드를 연결했습니다.' },
      { title: 'Spring Security 인증·인가와 RBAC', description: 'Spring Security로 인증·인가를 구현하고 USER / OPERATOR / ADMIN으로 역할을 나누어 접근 권한을 구분했습니다.' },
      { title: 'DB 및 네트워크 개발·관리', description: '서비스에 필요한 DB와 네트워크를 포함해 개발과 관리를 전반적으로 담당했습니다.' },
      { title: 'AWS 기반 서비스 배포 구성', description: 'AWS를 활용해 서비스 배포 환경을 구성했습니다.' },
    ],
    outcome: 'React 화면과 Spring Boot API를 연결하고, 인증·인가와 역할별 접근 권한을 적용한 동아리 홈페이지를 개발했습니다.',
    reflection: '화면과 서버뿐 아니라 DB, 네트워크, AWS 배포 구성까지 맡으며 서비스 전반을 개발하고 관리하는 경험을 쌓았습니다.',
  },
]

export const skills = [
  { number: '01', title: 'Backend & Security', label: '학습 중', technologies: ['Spring Boot', 'Spring Security', 'REST API', 'RBAC'], description: '동아리 홈페이지에서 REST API와 역할별 권한 구분에 활용했습니다. Spring Boot와 Spring Security의 동작 원리와 구조는 학습 중입니다.' },
  { number: '02', title: 'Frontend & GIS', label: '프로젝트 활용', technologies: ['React', 'TypeScript', 'OpenLayers'], description: 'RailDock 관리 화면과 지도 기반 결함 위치 시각화, Bounding Box 조회·수정 UI를 개발했습니다.' },
  { number: '03', title: 'Infrastructure & Data', label: '개발 · 관리 경험', technologies: ['AWS', 'DB', 'Network'], description: '동아리 홈페이지의 DB와 네트워크를 개발·관리하고 AWS 기반 서비스 배포 환경을 구성했습니다.' },
  { number: '04', title: 'AI Workflow', label: '화면 개발 · 설계', technologies: ['AI 분석 결과 조회', 'LLM / RAG 설계'], description: 'AI 결함 탐지 결과와 분석 상태 조회 화면을 개발하고, LLM / RAG 기반 보고서 자동화를 설계했습니다.' },
]
