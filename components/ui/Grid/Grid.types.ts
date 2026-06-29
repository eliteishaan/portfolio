import * as React from 'react'
import { type VariantProps } from 'class-variance-authority'
import { gridVariants } from './Grid.variants'
import { PolymorphicComponentPropsWithRef } from '@/lib/utils'

export type GridProps<C extends React.ElementType> = PolymorphicComponentPropsWithRef<
  C,
  VariantProps<typeof gridVariants>
>
