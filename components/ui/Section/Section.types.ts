import * as React from 'react'
import { type VariantProps } from 'class-variance-authority'
import { sectionVariants } from './Section.variants'

export interface SectionProps
  extends React.HTMLAttributes<HTMLElement>, VariantProps<typeof sectionVariants> {}
