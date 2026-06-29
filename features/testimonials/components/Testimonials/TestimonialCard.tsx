import React from 'react'
import { Stack, Body, Title } from '@/components/ui'

interface TestimonialCardProps {
  quote: string
  author: string
  role: string
  isActive: boolean
}

export const TestimonialCard = ({ quote, author, role, isActive }: TestimonialCardProps) => {
  return (
    <div
      className={`bg-surface flex flex-col rounded-xl border p-10 transition-all duration-700 ease-in-out ${
        isActive
          ? 'border-accent scale-100 opacity-100 shadow-lg'
          : 'border-border pointer-events-none scale-95 opacity-30'
      }`}
    >
      <Stack gap="xl">
        <Body className="text-text-primary font-serif text-xl leading-relaxed italic md:text-2xl">
          &ldquo;{quote}&rdquo;
        </Body>
        <Stack gap="none" className="mt-4">
          <Title className="text-text-primary tracking-wide">{author}</Title>
          <Body className="text-text-secondary mt-1 text-sm tracking-widest uppercase">{role}</Body>
        </Stack>
      </Stack>
    </div>
  )
}
