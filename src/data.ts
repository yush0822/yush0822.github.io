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
      { title: '정보처리기사', detail: '취득', period: '2026.06' },
      { title: 'SQLD', detail: 'SQL 개발자', period: '2026.06' },
      { title: 'ADsP', detail: '데이터 분석 준전문가', period: '2026.09' },
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
  featured?: boolean
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
  background: string
  team?: string
  technologyNotes: { name: string; usage: string; reason?: string }[]
  architecture: { title: string; nodes: string[]; note?: string }[]
  troubleshooting?: { problem: string; solution: string; result: string }[]
  validation?: { title: string; description: string }[]
}

// 기간·팀 규모·성과 수치·저장소 주소는 확인한 실제 정보만 추가합니다.
export const projects: Project[] = [
  {
    id: 'raildock',
    number: '01',
    featured: true,
    name: 'RailDock',
    category: 'RAILWAY · AI PLATFORM',
    role: '설계 · 프론트엔드 개발',
    period: '2026.01 ~ 2026.03',
    subtitle: 'AI 기반 철도 유지보수 행정 자동화 플랫폼',
    background: '철도 유지보수 업무에서 AI가 탐지한 결함을 위치와 함께 확인하고 검토할 수 있도록 만드는 프로젝트입니다. 결함 위치, 탐지 영역, 분석 상태를 관리 화면에서 다루고 보고서 자동화로 이어지는 흐름을 설계했습니다.',
    team: '설계·프론트엔드 담당 / 백엔드 팀과 역할 분담',
    technologyNotes: [
      { name: 'React · TypeScript', usage: '유지보수 관리 화면과 결함 조회·수정 UI 개발' },
      { name: 'OpenLayers', usage: '지도 기반 결함 위치 시각화' },
      { name: 'REST API', usage: 'AI 결함 탐지 결과와 관리 화면의 데이터 연동' },
      { name: 'LLM · RAG', usage: '유지보수 보고서 자동화 방식 설계' },
    ],
    architecture: [
      { title: '분석 결과 활용', nodes: ['AI 결함 탐지 결과 · 분석 상태', 'React / TypeScript 관리 화면', 'OpenLayers 위치 확인 · Bounding Box 조회·수정'] },
      { title: '보고서 자동화 구상', nodes: ['유지보수 정보', 'LLM / RAG 활용', '보고서 자동화'], note: '보고서 자동화는 설계 범위입니다.' },
    ],
    description: 'AI 기반 철도 시설물 결함 탐지 결과를 시각화하고 유지보수 업무를 지원하는 웹 플랫폼입니다. 설계와 프론트엔드 개발을 맡아 결함 관리 UI와 지도 시각화를 구현했습니다.',
    stack: ['React', 'TypeScript', 'OpenLayers', 'REST API'],
    contributions: [
      { title: 'React / TypeScript 관리 화면', description: '철도 유지보수 업무를 위한 관리 화면을 설계하고 React와 TypeScript로 개발했습니다.' },
      { title: '지도 기반 결함 위치 시각화', description: 'OpenLayers를 활용해 지도 위에서 결함 위치를 확인할 수 있도록 시각화했습니다.' },
      { title: 'Bounding Box 표시·수정 및 결함 상태 관리', description: 'AI 탐지 결과의 Bounding Box를 표시하고 수정하는 UI와 결함 상태 관리 기능을 구현했습니다.' },
      { title: '이미지와 탐지 좌표계의 위치 불일치 해결', description: '이미지 크기와 탐지 좌표계의 차이로 발생한 위치 불일치를 좌표 변환 로직으로 해결했습니다.' },
      { title: 'AI 탐지 결과 및 분석 상태 조회', description: 'AI 결함 탐지 결과와 분석 진행 상태를 확인하는 화면을 개발했습니다.' },
      { title: 'LLM / RAG 보고서 자동화 설계', description: 'LLM과 RAG를 활용한 유지보수 보고서 자동화 방식을 설계했습니다.' },
    ],
    troubleshooting: [
      { problem: '이미지 크기와 탐지 좌표계의 차이로 결함 표시 위치가 어긋나는 문제', solution: '이미지 크기와 탐지 좌표계의 차이를 반영하는 좌표 변환 로직을 적용했습니다.', result: 'Bounding Box의 위치 불일치 문제를 해결했습니다.' },
    ],
    outcome: '지도 기반 결함 위치 시각화와 Bounding Box 표시·수정, 결함 상태 관리 기능을 구현하고 좌표 변환으로 위치 불일치 문제를 해결했습니다.',
    reflection: 'AI 분석 결과를 화면으로 연결하는 과정에서 이미지와 탐지 데이터의 좌표계를 함께 고려했습니다. 사용자에게 보이는 UI와 그 바탕이 되는 데이터 흐름을 함께 다루었습니다.',
    repositories: [
      { label: 'GitHub · 프론트엔드', url: 'https://github.com/AIVLE-08-14/raildock-front' },
      { label: 'GitHub · 백엔드 (팀 저장소)', url: 'https://github.com/AIVLE-08-14/raildock-server' },
    ],
  },
  {
    id: 'club',
    number: '02',
    featured: true,
    name: '동아리 홈페이지',
    repositoryNote: 'GitHub 비공개 · 보안상 소스 코드 미공개',
    category: 'FULLSTACK · WEB SERVICE',
    role: '서비스 설계 · 풀스택 개발 (프론트엔드·백엔드·DB·배포)',
    period: '2026.03 ~ 2026.05',
    subtitle: '설계부터 배포 구성까지, 서비스 전반을 개발하다',
    background: '동아리 구성원의 정보 공유와 운영 관리를 위한 통합 웹 서비스입니다. 요구사항 분석을 바탕으로 전체 시스템 아키텍처, 주요 기능, 데이터 흐름을 설계하고 개발부터 배포까지 전 과정을 주도했습니다.',
    technologyNotes: [
      { name: 'React · TypeScript', usage: '사용자 기능과 관리자 기능을 위한 프론트엔드 UI 구현' },
      { name: 'Java · Spring Boot', usage: '프론트엔드와 연결되는 백엔드 REST API 개발' },
      { name: 'Spring Security · RBAC', usage: '인증·인가와 USER / OPERATOR / ADMIN 역할 구분' },
      { name: 'MySQL', usage: '데이터 모델링, 테이블 관계 설계 및 서비스 데이터 처리' },
      { name: 'AWS', usage: '서비스 배포 환경 구성' },
    ],
    architecture: [
      { title: '서비스 구성', nodes: ['React / TypeScript 프론트엔드', 'Spring Security 인증·인가', 'Java / Spring Boot REST API', 'MySQL 데이터베이스'] },
      { title: '접근 권한', nodes: ['USER / OPERATOR / ADMIN', 'Spring Security · RBAC 역할별 접근 제어'] },
      { title: '운영 환경', nodes: ['AWS 기반 배포 구성 · DB 및 네트워크 관리'], note: '운영 환경을 요약한 개념도입니다. 상세 인프라 정보는 공개하지 않습니다.' },
    ],
    description: '동아리 구성원의 정보 공유와 운영 관리를 위한 통합 웹 서비스입니다. 시스템 설계부터 프론트엔드·백엔드·DB 개발 및 배포까지 전 과정을 주도했습니다.',
    stack: ['Java', 'Spring Boot', 'Spring Security', 'React', 'TypeScript', 'MySQL', 'AWS'],
    contributions: [
      { title: '요구사항 분석과 시스템 설계', description: '요구사항을 분석하고 전체 시스템 아키텍처, 주요 기능 및 데이터 흐름을 설계했습니다.' },
      { title: '사용자·관리자 기능 및 API 개발', description: 'React와 TypeScript로 프론트엔드 UI를 구현하고 Spring Boot 기반 API를 개발해 사용자 기능과 관리자 기능을 구축했습니다.' },
      { title: 'Spring Security 인증·인가와 RBAC', description: 'Spring Security로 인증·인가를 구현하고 USER / OPERATOR / ADMIN으로 역할을 나누어 접근 권한을 구분했습니다.' },
      { title: 'MySQL 데이터 모델링과 데이터 처리', description: '데이터 모델링 및 테이블 관계를 설계하고, 서비스 기능과 연동되는 데이터 처리를 구현했습니다.' },
      { title: 'AWS 배포 환경 구축 및 네트워크 관리', description: '실제 서비스 운영을 위한 애플리케이션 배포 환경을 구축하고 네트워크를 관리했습니다.' },
    ],
    outcome: '사용자·관리자 기능, 인증·인가, MySQL 기반 데이터 처리를 갖춘 홈페이지를 개발하고 서비스 운영을 위한 배포 환경을 구성했습니다.',
    reflection: '화면과 서버뿐 아니라 DB, 네트워크, AWS 배포 구성까지 맡으며 서비스 전반을 개발하고 관리하는 경험을 쌓았습니다.',
  },
  {
    id: 'adoption',
    number: '03',
    name: '유기동물 입양 플랫폼',
    category: 'AI · WEB SERVICE',
    role: '프론트엔드 개발 · AI 서비스 연동',
    period: '2025.03 ~ 2025.11',
    subtitle: 'AI 기반 유기동물 입양 지원 웹 서비스',
    description: '유기동물 정보를 제공하고 AI 기반 추천 기능을 결합한 입양 지원 웹 플랫폼입니다. 프론트엔드 개발과 AI 서비스 연동을 담당했습니다.',
    background: '공공데이터를 활용한 유기동물 정보 조회와 검색에 AI 추천 기능을 결합해 입양을 지원하는 프로젝트입니다. 사용자 인증, 입양 관련 서비스, 실시간 채팅 기능을 함께 구현했습니다.',
    stack: ['React', 'TypeScript', 'Python'],
    technologyNotes: [
      { name: 'React · TypeScript', usage: '유기동물 정보 조회·검색과 입양 관련 서비스 UI 구현' },
      { name: 'Python', usage: '프로젝트의 AI 서비스 활용 기술' },
      { name: '공공데이터', usage: '유기동물 정보 조회 및 검색 기능에 활용' },
    ],
    architecture: [
      { title: '유기동물 정보 조회', nodes: ['공공데이터', '유기동물 정보 조회 · 검색', 'React / TypeScript 사용자 화면'] },
      { title: 'AI 서비스 연동', nodes: ['AI 추천 서비스', '웹 애플리케이션 연동', '입양 지원 기능'] },
      { title: '사용자 서비스', nodes: ['사용자 인증 · 입양 관련 기능 · 실시간 채팅'] },
    ],
    contributions: [
      { title: '공공데이터 기반 정보 조회·검색', description: '공공데이터를 활용한 유기동물 정보 조회 및 검색 기능을 개발했습니다.' },
      { title: '사용자 인증 및 입양 서비스', description: '사용자 인증과 입양 관련 서비스 기능을 구현했습니다.' },
      { title: '실시간 채팅 시스템', description: '입양 지원 웹 서비스에서 사용하는 실시간 채팅 시스템을 구현했습니다.' },
      { title: 'AI 추천 서비스 연동', description: 'AI 추천 서비스를 웹 애플리케이션과 연동하는 기능을 개발했습니다.' },
    ],
    outcome: '유기동물 정보 조회·검색, 사용자 인증, 입양 관련 서비스, 실시간 채팅과 AI 추천 연동 기능을 구현했습니다.',
    reflection: '공공데이터와 AI 추천 서비스를 사용자 화면에 연결하며, 프론트엔드 개발과 외부 데이터·서비스 연동을 함께 경험했습니다.',
    repositoryNote: '공개 GitHub 링크는 아직 등록하지 않았습니다.',
  },
]

export const skills = [
  { number: '01', title: 'Backend & Security', label: '학습 중', technologies: ['Spring Boot', 'Spring Security', 'REST API', 'RBAC'], description: '동아리 홈페이지에서 REST API와 역할별 권한 구분에 활용했습니다. Spring Boot와 Spring Security의 동작 원리와 구조는 학습 중입니다.' },
  { number: '02', title: 'Frontend & GIS', label: '프로젝트 활용', technologies: ['React', 'TypeScript', 'OpenLayers'], description: 'RailDock 관리 화면과 지도 기반 결함 위치 시각화, Bounding Box 조회·수정 UI를 개발했습니다.' },
  { number: '03', title: 'Infrastructure & Data', label: '개발 · 관리 경험', technologies: ['MySQL', 'AWS', 'Network'], description: '동아리 홈페이지의 데이터 모델링과 테이블 관계를 설계하고, 데이터 처리·네트워크 관리·AWS 배포 환경 구성을 담당했습니다.' },
  { number: '04', title: 'AI Service Integration', label: '화면 개발 · 서비스 연동', technologies: ['Python', 'AI 추천 연동', 'AI 분석 결과 조회', 'LLM / RAG 설계'], description: '유기동물 입양 플랫폼의 AI 추천 서비스를 연동했습니다. RailDock에서는 AI 탐지 결과를 시각화하고 LLM / RAG 보고서 자동화를 설계했습니다.' },
]
