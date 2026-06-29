import * as React from 'react'

export interface LogoProps extends React.HTMLAttributes<HTMLAnchorElement> {
  /** Text to display */
  text?: string
  /** Image source url */
  imageUrl?: string
  /** Image alt text */
  alt?: string
}
