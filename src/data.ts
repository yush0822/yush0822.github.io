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
    id: 'training', title: '교육', label: 'TRAINING',
    items: [{ title: 'KT AIVLE School', detail: 'AI 트랙 · KT', period: '2025.09 ~ 2026.03' }],
  },
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
  sourceNote?: string
  team?: string
  technologyScope?: string
  features?: { title: string; description: string }[]
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
    team: '4명 / 프로젝트 총괄',
    background: '동아리 구성원의 정보 공유와 운영 관리를 위한 통합 웹 서비스입니다. 요구사항 분석을 바탕으로 전체 시스템 아키텍처, 주요 기능, 데이터 흐름을 설계하고 개발부터 배포까지 전 과정을 주도했습니다.',
    technologyNotes: [
      { name: 'React · TypeScript', usage: '사용자 기능과 관리자 기능을 위한 프론트엔드 UI 구현' },
      { name: 'Java · Spring Boot', usage: '프론트엔드와 연결되는 백엔드 REST API 개발' },
      { name: 'Spring Security · RBAC', usage: '인증·인가와 USER / STAFF / ADMIN 역할 구분' },
      { name: 'MySQL', usage: '데이터 모델링, 테이블 관계 설계 및 서비스 데이터 처리' },
      { name: 'AWS', usage: '서비스 배포 환경 구성' },
    ],
    architecture: [
      { title: '서비스 구성', nodes: ['React / TypeScript 프론트엔드', 'Spring Security 인증·인가', 'Java / Spring Boot REST API', 'MySQL 데이터베이스'] },
      { title: '접근 권한', nodes: ['USER / STAFF / ADMIN', 'Spring Security · RBAC 역할별 접근 제어'] },
      { title: '운영 환경', nodes: ['AWS 기반 배포 구성 · DB 및 네트워크 관리'], note: '운영 환경을 요약한 개념도입니다. 상세 인프라 정보는 공개하지 않습니다.' },
    ],
    description: '동아리 구성원의 정보 공유와 운영 관리를 위한 통합 웹 서비스입니다. 시스템 설계부터 프론트엔드·백엔드·DB 개발 및 배포까지 전 과정을 주도했습니다.',
    stack: ['Java', 'Spring Boot', 'Spring Security', 'React', 'TypeScript', 'MySQL', 'AWS'],
    contributions: [
      { title: '요구사항 분석과 시스템 설계', description: '요구사항을 분석하고 전체 시스템 아키텍처, 주요 기능 및 데이터 흐름을 설계했습니다.' },
      { title: '사용자·관리자 기능 및 API 개발', description: 'React와 TypeScript로 프론트엔드 UI를 구현하고 Spring Boot 기반 API를 개발해 사용자 기능과 관리자 기능을 구축했습니다.' },
      { title: 'Spring Security 인증·인가와 RBAC', description: 'Spring Security로 인증·인가를 구현하고 USER / STAFF / ADMIN으로 역할을 나누어 접근 권한을 구분했습니다.' },
      { title: 'MySQL 데이터 모델링과 데이터 처리', description: '데이터 모델링 및 테이블 관계를 설계하고, 서비스 기능과 연동되는 데이터 처리를 구현했습니다.' },
      { title: 'AWS 배포 환경 구축 및 네트워크 관리', description: '실제 서비스 운영을 위한 애플리케이션 배포 환경을 구축하고 네트워크를 관리했습니다.' },
    ],
    outcome: '사용자·관리자 기능, 인증·인가, MySQL 기반 데이터 처리를 갖춘 홈페이지를 개발하고 서비스 운영을 위한 배포 환경을 구성했습니다.',
    reflection: '화면과 서버뿐 아니라 DB, 네트워크, AWS 배포 구성까지 맡으며 서비스 전반을 개발하고 관리하는 경험을 쌓았습니다.',
  },
  {
    id: 'adoption',
    number: '03',
    name: 'With Pet',
    category: 'AI · WEB SERVICE',
    role: '프론트엔드 개발 · AI 서비스 연동',
    period: '2025.03 ~ 2025.11',
    subtitle: '유기동물 입양 장려 AI 이미지 생성 및 매칭 플랫폼',
    description: '유기동물의 입양 후 모습을 AI 이미지로 보여주고, 개인 선호도에 맞는 품종 추천과 챗봇을 제공하는 입양 지원 플랫폼입니다. 프론트엔드 개발과 AI 서비스 연동을 담당했습니다.',
    background: '외모와 품종에 치우친 선택으로 발생하는 입양 기회의 불균형에 주목했습니다. 반려동물에 대한 개인의 선호도를 바탕으로 AI 이미지 생성과 맞춤 매칭을 제공해 입양 가능성을 높이고, 보호소의 홍보자료 제작 부담을 줄이는 것을 목표로 한 프로젝트입니다.',
    sourceNote: '서비스 기능과 전체 시스템 구성은 2025.10.01 포스터 초안, 개발 기간과 개인 기여는 최종 이력서를 기준으로 정리했습니다.',
    team: '3명 / 프론트엔드·AI 연동 담당',
    stack: ['React', 'TypeScript', 'Tailwind CSS', 'Spring Boot', 'Python', 'FastAPI', 'MySQL', 'Redis', 'Docker'],
    technologyScope: '아래는 포스터에 제시된 팀 프로젝트 전체 기술 구성입니다. 본인 담당 범위는 프론트엔드 개발과 AI 서비스 연동입니다.',
    technologyNotes: [
      { name: 'React · TypeScript · Tailwind CSS', usage: '사용자 화면 구성과 유기동물 정보·AI 기능을 연결하는 프론트엔드' },
      { name: 'Spring Boot · REST API', usage: '프론트엔드, 데이터 저장소, AI 서버를 연결하는 서비스 API 계층' },
      { name: 'Python · FastAPI · Docker', usage: 'AI 모델을 제공하는 서버 영역. 포스터 구조도는 FastAPI와 AI 모델을 Docker 영역으로 묶어 표시합니다.' },
      { name: 'MySQL · Redis', usage: '포스터 구조도에서 Spring Boot와 각각 연결된 데이터 저장소' },
      { name: 'Diffusion Model · ControlNet', usage: '유기동물 사진과 품종 정보를 입력받아 구조적 특징을 반영한 Before & After 이미지 생성' },
      { name: 'LLM · 임베딩 · 코사인 유사도', usage: '설문 응답에서 개인 특성을 추출하고, 품종 임베딩과의 유사도를 계산해 Top-K 추천과 설명을 제공하는 흐름' },
    ],
    architecture: [
      { title: '웹 서비스와 AI 서버 연결', nodes: ['React · TypeScript · Tailwind CSS', 'Spring Boot 서비스 API', 'FastAPI AI 서버 · Docker', 'Before & After 이미지 생성 · 사용자 동반 이미지 · 품종 추천'], note: '프론트엔드 ↔ Spring Boot ↔ FastAPI 사이의 REST API 요청·응답 구조를 요약했습니다.' },
      { title: '데이터 저장소 연결', nodes: ['Spring Boot', 'MySQL · Redis'], note: 'Spring Boot가 MySQL과 Redis에 각각 연결된 구성입니다.' },
      { title: 'Before & After 이미지 생성', nodes: ['유기동물의 Before 이미지 · 품종 정보', '조건 이미지 변환 · 구조적 특징 추출', 'Diffusion Model · ControlNet의 구조 제약 반영', '입양 후 모습을 표현하는 AI 이미지 생성'], note: '입양 후 모습을 상상할 수 있도록 만든 AI 생성 이미지입니다.' },
      { title: '맞춤형 품종 추천', nodes: ['사용자 설문 응답', 'LLM 기반 개인 특성 추출', '개인 특성 임베딩과 품종 임베딩의 코사인 유사도 계산', 'Top-K 품종 추천 · 추천 이유 설명'] },
    ],
    features: [
      { title: 'Before & After · 사용자 동반 이미지', description: '유기동물의 사진과 품종 정보를 바탕으로 입양 후 모습을 표현한 AI 이미지를 생성하고, 사용자와 반려동물이 함께 있는 이미지도 제공합니다.' },
      { title: '개인 맞춤 품종 추천', description: '사용자가 입력한 선호도와 설문 정보를 활용해 반려동물 품종을 추천하고 선택 가이드를 제공합니다. LLM 특성 추출, 임베딩 유사도 계산, Top-K 추천과 설명으로 이어지는 흐름입니다.' },
      { title: '반려동물 정보 챗봇', description: '반려동물 관리 팁, 품종 정보, MBTI 기반 맞춤 추천 등 사용자의 질문에 실시간으로 답변하는 기능입니다.' },
    ],
    contributions: [
      { title: '공공데이터 기반 정보 조회·검색', description: '공공데이터를 활용한 유기동물 정보 조회 및 검색 기능을 개발했습니다.' },
      { title: '사용자 인증 및 입양 서비스', description: '사용자 인증과 입양 관련 서비스 기능을 구현했습니다.' },
      { title: '실시간 채팅 시스템', description: '입양 지원 웹 서비스에서 사용하는 실시간 채팅 시스템을 구현했습니다.' },
      { title: 'AI 추천 서비스 연동', description: 'AI 추천 서비스를 웹 애플리케이션과 연동하는 기능을 개발했습니다.' },
    ],
    validation: [
      { title: '정량 성능 평가', description: '포스터 초안의 성능평가 항목은 “추가 예정”으로 남아 있습니다. 생성 시간, 추천 정확도, 입양률 등 정량 결과는 제시되지 않았습니다.' },
      { title: '이미지 생성 시간 개선 방향', description: '포스터는 ControlNet Fine-Tuning을 통한 생성 시간 감소를 제시합니다. 전후 측정값이 없어 실제 개선 성과로 단정하지 않습니다.' },
    ],
    outcome: '개인 기여로 유기동물 정보 조회·검색, 사용자 인증, 입양 관련 기능, 실시간 채팅과 AI 추천 연동을 구현했습니다. 팀 프로젝트는 AI 이미지 생성·맞춤 품종 추천·챗봇을 통해 입양을 지원하는 서비스로 구성했습니다.',
    reflection: '공공데이터와 AI 추천 서비스를 사용자 화면에 연결하며 프론트엔드와 외부 서비스 연동을 함께 경험했습니다. 개인 선호 정보와 AI 결과를 사용자가 이해하고 활용할 수 있는 화면으로 연결하는 관점에서 서비스를 개발했습니다.',
    repositoryNote: '공개 GitHub 링크는 아직 등록하지 않았습니다.',
  },
]

export const skills = [
  { number: '01', title: '언어 · 프론트엔드', label: '주요 개발 경험', technologies: ['TypeScript', 'JavaScript', 'React', 'OpenLayers'], description: 'React·TypeScript로 사용자 화면을 구현합니다. RailDock에서는 지도 시각화와 Bounding Box 표시·수정 기능을 개발했습니다.' },
  { number: '02', title: '백엔드 · 데이터베이스', label: '프로젝트 활용', technologies: ['Java', 'Spring Boot', 'Spring Security', 'MySQL'], description: '동아리 홈페이지의 API와 인증·인가 기능을 구현했습니다. MySQL 데이터 모델링과 테이블 관계를 설계하고 서비스 기능에 필요한 데이터 처리를 개발했습니다.' },
  { number: '03', title: 'AI 서비스 활용', label: '서비스 연동 · 설계 경험', technologies: ['Python', 'REST API', 'AI 연동', 'LLM / RAG 설계'], description: '유기동물 입양 플랫폼에서 AI 추천 서비스를 웹에 연결했습니다. RailDock에서는 AI 분석 결과를 시각화하고 보고서 자동화 방식을 설계했습니다.' },
  { number: '04', title: '인프라 · 개발 도구', label: '프로젝트 활용', technologies: ['AWS', 'Git', 'GitHub', 'Vite'], description: '동아리 홈페이지의 AWS 배포 환경을 구성했습니다. 포트폴리오는 Git·GitHub로 변경 이력을 관리하고 Vite 빌드와 GitHub Pages 자동 배포를 활용합니다.' },
]

export const competencies = [
  { number: '01', title: '의사소통 · 협업', description: '담당 역할과 기능 간 연결을 함께 이해하는 협업을 중요하게 생각합니다. RailDock 팀에서 설계와 프론트엔드를 담당하고, 백엔드와 역할을 나누어 서비스 개발에 참여했습니다.', href: '#/projects/raildock/role', linkLabel: 'RailDock 담당 역할' },
  { number: '02', title: '문제 해결', description: '화면에 나타난 문제를 데이터 흐름과 연결해 살펴봅니다. RailDock의 이미지 크기와 탐지 좌표계 차이로 발생한 위치 불일치를 좌표 변환 로직으로 해결했습니다.', href: '#/projects/raildock/troubleshooting', linkLabel: '좌표 변환 문제 해결 사례' },
  { number: '03', title: '요구사항 분석 · 설계', description: '요구사항을 기능과 데이터 구조로 구체화합니다. 동아리 홈페이지의 요구사항을 분석해 시스템 아키텍처, 주요 기능, 데이터 흐름과 테이블 관계를 설계했습니다.', href: '#/projects/club/implementation', linkLabel: '동아리 홈페이지 설계 경험' },
  { number: '04', title: '데이터 · 서비스 연동', description: '공공데이터와 AI 서비스를 웹 애플리케이션에 연결합니다. 유기동물 입양 플랫폼에서 공공데이터 기반 정보 조회·검색 기능을 개발하고 AI 추천 서비스를 연동했습니다.', href: '#/projects/adoption/implementation', linkLabel: '데이터 및 AI 서비스 연동 사례' },
]
