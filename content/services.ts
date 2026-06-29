import {
  Monitor,
  Cloud,
  Brain,
  Bot,
  Zap,
  PenTool,
  MonitorPlay,
  Video,
  Lightbulb,
} from 'lucide-react'

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
      artifactImage: '',
    },
    {
      id: 'saas',
      title: 'SaaS Systems',
      description:
        'End-to-end product development, from multi-tenant architecture to billing integration.',
      icon: Cloud,
      artifactImage: '',
    },
    {
      id: 'ai-solutions',
      title: 'AI Solutions',
      description: 'Integrating LLMs, RAG, and custom models to supercharge product capabilities.',
      icon: Brain,
      artifactImage: '',
    },
    {
      id: 'motion',
      title: 'Motion Design',
      description: 'Cinematic web experiences using GSAP and WebGL to elevate brand perception.',
      icon: MonitorPlay,
      artifactImage: '',
    },
  ],
}
