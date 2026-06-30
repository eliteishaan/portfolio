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
  subtitle: 'Our Work',
  items: [
    {
      id: 'proj-001',
      number: '01',
      year: '2024',
      category: 'Web Development',
      title: 'Global Fintech Platform',
      description:
        'A comprehensive web application architecture delivering real-time financial data with uncompromising performance and security.',
      tech: 'Next.js + React + Tailwind',
      image:
        'https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2000&auto=format&fit=crop', // Stark dark abstract placeholder
      align: 'left',
      href: '#contact',
      cta: 'View Project',
    },
    {
      id: 'proj-002',
      number: '02',
      year: '2023',
      category: 'Video Production',
      title: 'Cinematic Brand Anthem',
      description:
        'A high-end commercial production combining live-action cinematography with subtle VFX to elevate brand perception.',
      tech: '4K + RED + DaVinci',
      image:
        'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2000&auto=format&fit=crop',
      align: 'right',
      href: '#contact',
      cta: 'Watch Video',
    },
    {
      id: 'proj-003',
      number: '03',
      year: '2024',
      category: 'Marketing Creatives',
      title: 'Automotive Launch Campaign',
      description:
        'A multi-channel creative campaign featuring 3D product visualizations, interactive web experiences, and targeted social assets.',
      tech: 'Cinema4D + WebGL',
      image:
        'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2000&auto=format&fit=crop', // Stark dark geometric placeholder
      align: 'left',
      href: '#contact',
      cta: 'View Campaign',
    },
  ] as Project[],
}
