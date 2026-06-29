import * as React from 'react'
import { NavigationItem } from '@/lib/constants/navigation'

export interface NavigationProps extends React.HTMLAttributes<HTMLElement> {
  items: NavigationItem[]
}
