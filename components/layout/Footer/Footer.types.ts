import * as React from 'react'

export interface FooterProps extends React.HTMLAttributes<HTMLElement> {
  navigationSlot?: React.ReactNode
  socialsSlot?: React.ReactNode
  copyrightSlot?: React.ReactNode
}
