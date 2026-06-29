import * as React from 'react'
import { cn } from '@/lib/utils'
import { stackVariants } from './Stack.variants'
import { type StackProps } from './Stack.types'

/**
 * Vertical Stack layout helper
 */
export const Stack = React.forwardRef(
  <C extends React.ElementType = 'div'>(
    { as, className, gap, align, justify, ...props }: StackProps<C>,
    ref?: React.Ref<unknown>
  ) => {
    const Comp = as || 'div'
    return (
      <Comp
        ref={ref}
        className={cn(stackVariants({ gap, align, justify }), className)}
        {...props}
      />
    )
  }
)
Stack.displayName = 'Stack'
