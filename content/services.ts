import { Monitor, Cloud, Brain, MonitorPlay } from 'lucide-react'

export const SERVICES_CONTENT = {
  title: 'Capabilities',
  subtitle: 'The Lab',
  items: [
    {
      id: 'web-apps',
      title: 'Web Platforms',
      description:
        'Scalable, performant web platforms built for enterprise and high-growth startups.',
      icon: Monitor,
      image:
        'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2000&auto=format&fit=crop',
    },
    {
      id: 'saas',
      title: 'SaaS Systems',
      description:
        'End-to-end product development, from multi-tenant architecture to billing integration.',
      icon: Cloud,
      image:
        'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2000&auto=format&fit=crop',
    },
    {
      id: 'ai-solutions',
      title: 'AI Solutions',
      description: 'Integrating LLMs, RAG, and custom models to supercharge product capabilities.',
      icon: Brain,
      image:
        'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2000&auto=format&fit=crop',
    },
    {
      id: 'motion',
      title: 'Motion Design',
      description: 'Cinematic web experiences using GSAP and WebGL to elevate brand perception.',
      icon: MonitorPlay,
      image:
        'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2000&auto=format&fit=crop',
    },
  ],
}
