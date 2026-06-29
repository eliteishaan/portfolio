export interface NavigationItem {
  label: string
  href: string
}

export const MAIN_NAVIGATION: NavigationItem[] = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '#about' },
  { label: 'Portfolio', href: '#work' },
  { label: 'Contact', href: '#contact' },
]
