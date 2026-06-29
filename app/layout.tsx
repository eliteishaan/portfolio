import type { Metadata } from 'next'
import { Instrument_Serif, DM_Sans, JetBrains_Mono } from 'next/font/google'
import { ThemeProvider } from '@/components/providers/theme-provider'
import { SmoothScrollProvider } from '@/components/providers/SmoothScrollProvider'
import { MainLayout } from '@/components/layout'
import './globals.css'

const fontDisplay = Instrument_Serif({
  weight: '400',
  variable: '--font-heading',
  subsets: ['latin'],
})

const fontSans = DM_Sans({
  variable: '--font-sans',
  subsets: ['latin'],
})

const fontMono = JetBrains_Mono({
  variable: '--font-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Portfolio',
  description: 'Phase 1 Foundation',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${fontSans.variable} ${fontDisplay.variable} ${fontMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col">
        <ThemeProvider attribute="class" defaultTheme="system">
          <SmoothScrollProvider>
            <MainLayout>{children}</MainLayout>
          </SmoothScrollProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
