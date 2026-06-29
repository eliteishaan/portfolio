import * as React from 'react'
import { cn } from '@/lib/utils'
import { gridVariants } from './Grid.variants'
import { type GridProps } from './Grid.types'

/**
 * Grid layout helper
 */
export const Grid = React.forwardRef(
  <C extends React.ElementType = 'div'>(
    { as, className, cols, gap, ...props }: GridProps<C>,
    ref?: React.Ref<unknown>
  ) => {
    const Comp = as || 'div'
    return React.createElement(Comp, {
      ref,
      className: cn(gridVariants({ cols, gap }), className),
      ...props,
    })
  }
)
Grid.displayName = 'Grid'
