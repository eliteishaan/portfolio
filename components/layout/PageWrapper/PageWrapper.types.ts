import * as React from 'react'

export interface PageWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'container' | 'fullWidth' | 'noPadding'
}
