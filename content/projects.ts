export type Project = {
  id: string
  number: string
  year: string
  category: string
  title: string
  description: string
  tech: string
  image: string
  align: 'left' | 'right'
}

export const PROJECTS_CONTENT = {
  title: 'Selected Works',
  subtitle: 'Portfolio',
  items: [
    {
      id: 'proj-001',
      number: '01',
      year: '2024',
      category: 'Architecture & Frontend',
      title: 'Fintech Core Platform',
      description:
        'A secure, high-performance financial dashboard handling real-time data streaming for a Fortune 500 bank.',
      tech: 'React + Tailwind + Zustand',
      image:
        'https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=2000&auto=format&fit=crop',
      align: 'left',
    },
    {
      id: 'proj-002',
      number: '02',
      year: '2023',
      category: 'Creative Engineering',
      title: 'MedTech AI Assistant',
      description:
        'HIPAA-compliant conversational AI agent designed to streamline patient intake and diagnosis routing.',
      tech: 'Three.js + GSAP + GLSL',
      image:
        'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2000&auto=format&fit=crop',
      align: 'right',
    },
    {
      id: 'proj-003',
      number: '03',
      year: '2022',
      category: 'Design Systems',
      title: 'Global Logistics SaaS',
      description:
        'An end-to-end supply chain visibility platform serving millions of tracking events daily.',
      tech: 'Radix + CVA + Framer',
      image:
        'https://images.unsplash.com/photo-1507238692062-7101eeaeb1b9?q=80&w=2000&auto=format&fit=crop',
      align: 'left',
    },
  ] as Project[],
}
