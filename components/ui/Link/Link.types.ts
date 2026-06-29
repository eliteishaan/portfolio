import * as React from 'react'
import { type LinkProps as NextLinkProps } from 'next/link'
import { type VariantProps } from 'class-variance-authority'
import { linkVariants } from './Link.variants'

export interface LinkProps
  extends
    Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof NextLinkProps>,
    NextLinkProps,
    VariantProps<typeof linkVariants> {
  /** Is external link? */
  external?: boolean
}
