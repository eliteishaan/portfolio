import * as React from 'react'
import { cn } from '@/lib/utils'
import { stackVariants } from './Stack.variants'
import { type StackProps } from './Stack.types'

/**
 * Flex Stack component
 */
export const Stack = React.forwardRef(
  <C extends React.ElementType = 'div'>(
    { as, className, align, gap, justify, ...props }: StackProps<C>,
    ref?: React.Ref<unknown>
  ) => {
    const Comp = as || 'div'
    return React.createElement(Comp, {
      ref,
      className: cn(stackVariants({ align, gap, justify }), className),
      ...props,
    })
  }
)
Stack.displayName = 'Stack'
