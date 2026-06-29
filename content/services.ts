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
  title: 'What We Do',
  subtitle: 'Services',
  items: [
    {
      id: 'web-apps',
      title: 'Web Applications',
      description:
        'Scalable, performant web platforms built for enterprise and high-growth startups.',
      icon: Monitor,
    },
    {
      id: 'saas',
      title: 'SaaS Development',
      description:
        'End-to-end product development, from multi-tenant architecture to billing integration.',
      icon: Cloud,
    },
    {
      id: 'ai-solutions',
      title: 'AI Solutions',
      description: 'Integrating LLMs, RAG, and custom models to supercharge product capabilities.',
      icon: Brain,
    },
    {
      id: 'ai-agents',
      title: 'AI Agents',
      description: 'Autonomous agentic workflows to automate complex business processes.',
      icon: Bot,
    },
    {
      id: 'automation',
      title: 'Automation',
      description: 'Connecting internal systems and automating operations for maximum efficiency.',
      icon: Zap,
    },
    {
      id: 'ui-ux',
      title: 'UI/UX Design',
      description: 'Premium interface design focusing on user conversion, retention, and delight.',
      icon: PenTool,
    },
    {
      id: 'motion',
      title: 'Motion Design',
      description: 'Cinematic web experiences using GSAP and WebGL to elevate brand perception.',
      icon: MonitorPlay,
    },
    {
      id: 'ai-video',
      title: 'AI Video Production',
      description:
        'Cutting-edge generative video for marketing campaigns and product storytelling.',
      icon: Video,
    },
    {
      id: 'strategy',
      title: 'Creative Strategy',
      description:
        'Aligning business objectives with technical feasibility and market positioning.',
      icon: Lightbulb,
    },
  ],
}
