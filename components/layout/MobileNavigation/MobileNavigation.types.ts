import * as React from 'react'
import { NavigationItem } from '@/lib/constants/navigation'

export interface MobileNavigationProps extends React.HTMLAttributes<HTMLDivElement> {
  items: NavigationItem[]
  isOpen: boolean
  onClose: () => void
  onToggle: () => void
}
