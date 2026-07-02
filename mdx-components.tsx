import type { MDXComponents } from 'mdx/types'
import { MDX_COMPONENTS } from '@/components/mdx'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...MDX_COMPONENTS,
    ...components,
  }
}
