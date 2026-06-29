import * as React from 'react'
import { type VariantProps } from 'class-variance-authority'
import { buttonVariants } from './Button.variants'

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  /** Enables Radix Slot pattern */
  asChild?: boolean
  /** Full width button */
  fullWidth?: boolean
  /** Loading state */
  loading?: boolean
  /** Left icon element */
  leftIcon?: React.ReactNode
  /** Right icon element */
  rightIcon?: React.ReactNode
}
