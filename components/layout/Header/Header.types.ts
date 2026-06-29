import * as React from 'react'

export interface HeaderProps extends React.HTMLAttributes<HTMLElement> {
  /** Visual state of the header */
  variant?: 'transparent' | 'blurred' | 'solid' | 'hidden'
}
