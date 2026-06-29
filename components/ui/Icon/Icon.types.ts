import * as React from 'react'
import { type VariantProps } from 'class-variance-authority'
import { iconVariants } from './Icon.variants'

export interface IconProps
  extends Omit<React.SVGAttributes<SVGSVGElement>, 'color'>, VariantProps<typeof iconVariants> {
  /** The Lucide icon component to render */
  icon: React.ElementType
  /** Accessible label */
  title?: string
}
