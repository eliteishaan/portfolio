'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { type FooterProps } from './Footer.types'
import { Container, Stack, Grid, Body, Caption } from '@/components/ui'
import { CONTACT_CONTENT } from '@/content/contact'

export const Footer = React.forwardRef<HTMLElement, FooterProps>(({ className, ...props }, ref) => {
  const [time, setTime] = React.useState<string>('')

  React.useEffect(() => {
    const formatter = new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'America/New_York',
      timeZoneName: 'short',
    })

    const updateTime = () => setTime(formatter.format(new Date()))
    updateTime()
    const interval = setInterval(updateTime, 10000)
    return () => clearInterval(interval)
  }, [])

  return (
    <footer
      ref={ref}
      className={cn(
        'bg-background border-border/30 relative w-full overflow-hidden border-t pt-24 pb-12',
        className
      )}
      {...props}
    >
      <Container maxWidth="7xl" className="relative z-10">
        <Stack gap="xl">
          <Grid cols={1} className="gap-12 md:grid-cols-12">
            <div className="flex flex-col gap-6 md:col-span-4">
              <Stack gap="sm">
                <Caption className="text-muted tracking-widest uppercase">Status</Caption>
                <Body className="text-text-secondary">{CONTACT_CONTENT.status}</Body>
              </Stack>
              <Stack gap="sm">
                <Caption className="text-muted tracking-widest uppercase">Local Time</Caption>
                <Body className="text-text-secondary font-mono">{time || '-'}</Body>
              </Stack>
            </div>

            <div className="flex flex-col gap-6 md:col-span-4">
              <Caption className="text-muted tracking-widest uppercase">Connect</Caption>
              <ul className="flex flex-col gap-3">
                {CONTACT_CONTENT.socials.map((social) => (
                  <li key={social.href}>
                    <a
                      href={social.href}
                      className="text-text-secondary hover:text-accent font-medium transition-colors duration-300"
                    >
                      {social.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-6 md:col-span-4">
              <Caption className="text-muted tracking-widest uppercase">Inquiries</Caption>
              <a
                href={`mailto:${CONTACT_CONTENT.email}`}
                className="text-text-primary hover:text-accent text-xl font-medium transition-colors duration-300"
              >
                {CONTACT_CONTENT.email}
              </a>
            </div>
          </Grid>

          <div className="pointer-events-none mt-12 flex w-full items-center justify-center select-none md:mt-24">
            <span
              className="text-text-primary font-serif font-bold italic opacity-[0.03]"
              style={{
                fontSize: 'clamp(4rem, 15vw, 16rem)',
                lineHeight: 0.8,
                letterSpacing: '-0.02em',
              }}
            >
              STUDIO
            </span>
          </div>

          <div className="text-text-secondary mt-8 flex flex-col items-center justify-between font-mono text-sm sm:flex-row">
            <span>(c) {new Date().getFullYear()} Nexus Studio.</span>
            <span>All rights reserved.</span>
          </div>
        </Stack>
      </Container>
    </footer>
  )
})
Footer.displayName = 'Footer'
