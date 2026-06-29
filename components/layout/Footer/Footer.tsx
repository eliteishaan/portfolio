import * as React from 'react'
import { cn } from '@/lib/utils'
import { type FooterProps } from './Footer.types'
import { Container } from '@/components/ui/Container'
import { Divider } from '@/components/ui/Divider'
import { Stack } from '@/components/ui/Stack'
import { Grid } from '@/components/ui/Grid'

export const Footer = React.forwardRef<HTMLElement, FooterProps>(
  (
    {
      className,
      navigationSlot = <div>[Navigation Placeholder]</div>,
      socialsSlot = <div>[Socials Placeholder]</div>,
      copyrightSlot = <div>© {new Date().getFullYear()} Portfolio. All rights reserved.</div>,
      ...props
    },
    ref
  ) => {
    return (
      <footer ref={ref} className={cn('bg-background w-full', className)} {...props}>
        <Container maxWidth="xl" className="py-12">
          <Stack gap={32}>
            <Grid cols={3} gap={32}>
              <div className="col-span-1">{socialsSlot}</div>
              <div className="col-span-1 sm:col-span-2">{navigationSlot}</div>
            </Grid>
            <Divider />
            <div className="text-text-secondary flex items-center justify-between text-sm">
              {copyrightSlot}
            </div>
          </Stack>
        </Container>
      </footer>
    )
  }
)
Footer.displayName = 'Footer'
