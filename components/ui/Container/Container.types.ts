import * as React from 'react'
import { type VariantProps } from 'class-variance-authority'
import { containerVariants } from './Container.variants'
import { PolymorphicComponentPropsWithRef } from '@/lib/utils'

export type ContainerProps<C extends React.ElementType> = PolymorphicComponentPropsWithRef<
  C,
  VariantProps<typeof containerVariants>
>
