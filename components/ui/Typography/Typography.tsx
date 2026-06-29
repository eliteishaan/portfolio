import * as React from 'react'
import { cn } from '@/lib/utils'
import { typographyVariants } from './Typography.variants'
import { type TypographyProps, type TypographyVariant } from './Typography.types'

type TypographyComponent = <C extends React.ElementType = 'span'>(
  props: TypographyProps<C>
) => React.ReactElement | null

const createTypography = (defaultAs: React.ElementType, defaultVariant: TypographyVariant) => {
  const Component = React.forwardRef(
    <C extends React.ElementType>(
      { as, className, variant = defaultVariant, ...props }: TypographyProps<C>,
      ref?: React.Ref<unknown>
    ) => {
      const ComponentToRender = as || defaultAs
      return React.createElement(ComponentToRender, {
        ref,
        className: cn(typographyVariants({ variant }), className),
        ...props,
      })
    }
  )
  Component.displayName = `Typography${String(defaultVariant)}`
  return Component as TypographyComponent
}

export const DisplayXL = createTypography('h1', 'displayXl')
export const Display = createTypography('h1', 'display')
export const H1 = createTypography('h1', 'h1')
export const H2 = createTypography('h2', 'h2')
export const H3 = createTypography('h3', 'h3')
export const Title = createTypography('span', 'title')
export const BodyLarge = createTypography('p', 'bodyLarge')
export const Body = createTypography('p', 'body')
export const Small = createTypography('small', 'small')
export const Caption = createTypography('span', 'caption')
export const Mono = createTypography('span', 'mono')
