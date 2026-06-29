import * as React from 'react'
import { type VariantProps } from 'class-variance-authority'
import { stackVariants } from './Stack.variants'
import { PolymorphicComponentPropsWithRef } from '@/lib/utils'

export type StackProps<C extends React.ElementType> = PolymorphicComponentPropsWithRef<
  C,
  VariantProps<typeof stackVariants>
>
