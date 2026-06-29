import * as React from 'react'
import { type VariantProps } from 'class-variance-authority'
import { typographyVariants } from './Typography.variants'
import { PolymorphicComponentPropsWithRef } from '@/lib/utils'

export type TypographyVariant = VariantProps<typeof typographyVariants>['variant']

export type TypographyProps<C extends React.ElementType> = PolymorphicComponentPropsWithRef<
  C,
  {
    /** Typography style variant */
    variant?: TypographyVariant
  }
>
