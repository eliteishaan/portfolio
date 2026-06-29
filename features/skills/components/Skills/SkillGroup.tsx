import React from 'react'
import { Stack, Title, Body } from '@/components/ui'

interface SkillGroupProps {
  title: string
  skills: string[]
}

export const SkillGroup = ({ title, skills }: SkillGroupProps) => {
  return (
    <div className="bg-background border-border group hover:border-text-secondary flex cursor-default flex-col rounded-xl border p-8 transition-colors duration-500">
      <Stack gap="md">
        <Title className="text-accent">{title}</Title>
        <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2">
          {skills.map((skill, i) => (
            <Body
              key={i}
              className="text-text-primary group-hover:text-accent transition-colors duration-300"
            >
              {skill}
              {i !== skills.length - 1 && <span className="text-border ml-4">/</span>}
            </Body>
          ))}
        </div>
      </Stack>
    </div>
  )
}
