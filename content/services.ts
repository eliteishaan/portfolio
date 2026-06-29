import { Code2, MonitorPlay, Component, Lightbulb } from 'lucide-react'

export const SERVICES_CONTENT = {
  title: 'Capabilities',
  subtitle: 'Services',
  items: [
    {
      id: 'frontend',
      title: 'Frontend Architecture',
      description:
        'Designing scalable, performant React applications with modern state management, routing, and SSR strategies.',
      icon: Code2,
    },
    {
      id: 'motion',
      title: 'Motion Engineering',
      description:
        'Orchestrating complex GSAP timelines and WebGL shaders to create cinematic, award-winning web experiences.',
      icon: MonitorPlay,
    },
    {
      id: 'design-systems',
      title: 'Design Systems',
      description:
        'Bridging design and engineering by building robust, accessible UI primitive libraries and token architectures.',
      icon: Component,
    },
    {
      id: 'strategy',
      title: 'Technical Strategy',
      description:
        'Advising startups and agencies on tech stack selection, performance optimization, and architectural decisions.',
      icon: Lightbulb,
    },
  ],
}
