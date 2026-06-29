import * as React from 'react'
import { cn } from '@/lib/utils'
import { containerVariants } from './Container.variants'
import { type ContainerProps } from './Container.types'

/**
 * Reusable Container component
 */
export const Container = React.forwardRef(
  <C extends React.ElementType = 'div'>(
    { as, className, maxWidth, ...props }: ContainerProps<C>,
    ref?: React.Ref<unknown>
  ) => {
    const Comp = as || 'div'
    return React.createElement(Comp, {
      ref,
      className: cn(containerVariants({ maxWidth }), className),
      ...props,
    })
  }
)
Container.displayName = 'Container'
