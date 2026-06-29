import React from 'react'
import { Stack, Title, Body } from '@/components/ui'
import { ArrowUpRight, LucideIcon } from 'lucide-react'

interface ServiceCardProps {
  title: string
  description: string
  icon: LucideIcon
}

export const ServiceCard = ({ title, description, icon: Icon }: ServiceCardProps) => {
  return (
    <div className="group bg-background border-border hover:border-accent-dim relative flex flex-col rounded-xl border p-8 transition-all duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:shadow-lg">
      <Stack gap="md" className="h-full">
        <div className="flex items-center justify-between">
          <div className="bg-surface text-text-primary group-hover:text-accent rounded-lg p-3 transition-colors delay-100 duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)]">
            <Icon size={24} strokeWidth={1.5} />
          </div>
          <div className="-translate-x-2 opacity-0 transition-all delay-200 duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0 group-hover:opacity-100">
            <ArrowUpRight size={20} className="text-accent" />
          </div>
        </div>

        <Stack gap="sm" className="mt-4">
          <Title className="text-text-primary group-hover:text-accent transition-colors duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)]">
            {title}
          </Title>
          <Body className="text-text-secondary leading-relaxed">{description}</Body>
        </Stack>
      </Stack>
    </div>
  )
}
