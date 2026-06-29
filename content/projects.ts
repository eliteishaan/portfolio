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
  href: string
  cta: string
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
      title: 'Financial Dashboard Concept',
      description:
        'A reference architecture for a secure, high-performance dashboard with dense data views and responsive interaction patterns.',
      tech: 'React + Tailwind + Zustand',
      image:
        'https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=2000&auto=format&fit=crop',
      align: 'left',
      href: '#contact',
      cta: 'Discuss Similar Work',
    },
    {
      id: 'proj-002',
      number: '02',
      year: '2023',
      category: 'Creative Engineering',
      title: 'AI Assistant Prototype',
      description:
        'A product prototype exploring guided intake, retrieval workflows, and careful human handoff patterns.',
      tech: 'Three.js + GSAP + GLSL',
      image:
        'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2000&auto=format&fit=crop',
      align: 'right',
      href: '#contact',
      cta: 'Plan an AI Build',
    },
    {
      id: 'proj-003',
      number: '03',
      year: '2022',
      category: 'Design Systems',
      title: 'Operations SaaS System',
      description:
        'A modular SaaS interface model for workflows that need status visibility, repeatable components, and clear hierarchy.',
      tech: 'Radix + CVA + Framer',
      image:
        'https://images.unsplash.com/photo-1507238692062-7101eeaeb1b9?q=80&w=2000&auto=format&fit=crop',
      align: 'left',
      href: '#contact',
      cta: 'Scope a System',
    },
  ] as Project[],
}
