export const profile = {
  name: '유승환',
  englishName: 'YOO SEUNGHWAN',
  email: 'yush08222@gmail.com',
  github: 'https://github.com/yush0822',
  education: '충북대학교 소프트웨어학과',
  role: '백엔드 / 풀스택 개발',
}

export interface Project {
  id: string
  number: string
  name: string
  category: string
  subtitle: string
  description: string
  stack: string[]
  contributions: { title: string; description: string }[]
  outcome: string
  reflection: string
  repository?: string
  demo?: string
}

// 기간·팀 규모·성과 수치·저장소 주소는 확인한 실제 정보만 추가합니다.
export const projects: Project[] = [
  {
    id: 'withpet',
    number: '01',
    name: 'WithPet',
    category: 'AI · WEB SERVICE',
    subtitle: 'AI로 그려보는, 함께하는 일상',
    description: 'AI 이미지 시각화와 챗봇을 접목한 유기동물 입양 플랫폼. 사용자 화면부터 AI 서버까지, 서비스의 여러 접점을 연결했습니다.',
    stack: ['React', 'FastAPI', 'Docker', 'MySQL', 'Spring Boot'],
    contributions: [
      { title: 'AI 이미지 서버 구축', description: 'FastAPI 기반 AI 이미지 서버를 구축하고, 입양 전 모습을 시각화하는 기능을 구현했습니다.' },
      { title: '서비스 구조 설계', description: 'Docker 기반 서비스 구조를 설계하며 프론트엔드·백엔드·AI 서버를 함께 고려했습니다.' },
      { title: '사용자 화면 및 AI 연동', description: 'React UI 개발과 UX 설계, AI 챗봇 기획 및 연동을 담당했습니다.' },
    ],
    outcome: 'AI 이미지 시각화와 챗봇을 활용한 입양 서비스 기능을 구현했습니다.',
    reflection: '화면 구현과 AI 서버 구축을 함께 경험하며, 사용자 흐름과 서버의 역할을 연결하는 관점으로 서비스를 바라보았습니다.',
  },
  {
    id: 'messenger',
    number: '02',
    name: '007 Secret Messenger',
    category: 'SERVER PROGRAMMING',
    subtitle: '메시지가 전달되는 과정을 이해하다',
    description: '암호화 메신저 프로젝트. 메시지의 암호화·복호화 흐름을 설계하고, 클라이언트 UI 구조를 기획했습니다.',
    stack: ['Server Programming', '암호화 / 복호화', 'Client UI'],
    contributions: [
      { title: '암호화·복호화 흐름 설계', description: '메시지가 전달되는 과정에서 암호화와 복호화의 흐름을 설계했습니다.' },
      { title: '클라이언트 UI 구조 기획', description: '데이터 흐름을 바탕으로 클라이언트 화면 구조를 기획했습니다.' },
    ],
    outcome: '메시지의 데이터 흐름과 클라이언트 UI 구조를 설계했습니다.',
    reflection: '사용자에게 보이는 화면뿐 아니라, 그 뒤에서 데이터가 어떻게 전달되는지 이해하는 것이 중요하다는 점을 배웠습니다.',
  },
]

export const skills = [
  { number: '01', title: 'Backend & AI', label: '프로젝트 활용', technologies: ['Python', 'FastAPI'], description: 'WithPet의 AI 이미지 서버 구축과 AI 기능 연동에 활용했습니다.' },
  { number: '02', title: 'Frontend', label: '프로젝트 활용', technologies: ['React', 'TypeScript', 'Tailwind CSS', 'HTML / CSS / JavaScript'], description: 'WithPet의 React UI를 개발했습니다. 이 포트폴리오는 React·TypeScript·Tailwind CSS로 구성했습니다.' },
  { number: '03', title: 'Infrastructure & Data', label: '활용 경험 / 보유 기술', technologies: ['Docker', 'MySQL'], description: 'Docker 기반 서비스 구조 설계 경험이 있습니다. MySQL은 보유 기술로 정리하고 있습니다.' },
  { number: '04', title: 'Currently learning', label: '학습 중', technologies: ['Spring Boot'], description: '백엔드 개발 역량을 넓히기 위해 Spring Boot를 학습하고 있습니다.' },
]
