import type { Metadata, Viewport } from 'next'
import { ThemeProvider } from '@/components/providers/theme-provider'
import { SmoothScrollProvider } from '@/components/providers/SmoothScrollProvider'
import { WebGLProvider } from '@/components/providers/WebGLProvider'
import { Preloader } from '@/components/ui/Preloader/Preloader'
import { MainLayout } from '@/components/layout'
import { SITE_CONFIG } from '@/lib/constants/site'
import './globals.css'

export const viewport: Viewport = {
  themeColor: '#0A0A0B',
}

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: {
    default: `${SITE_CONFIG.name} | Digital Product Studio`,
    template: `%s | ${SITE_CONFIG.name}`,
  },
  description: SITE_CONFIG.description,
  applicationName: SITE_CONFIG.name,
  authors: [{ name: SITE_CONFIG.name }],
  creator: SITE_CONFIG.name,
  publisher: SITE_CONFIG.name,
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: SITE_CONFIG.name,
    title: `${SITE_CONFIG.name} | Digital Product Studio`,
    description: SITE_CONFIG.description,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE_CONFIG.name} | Digital Product Studio`,
    description: SITE_CONFIG.description,
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/favicon.ico', // Fallback, normally a separate PNG
  },
  manifest: '/manifest.webmanifest',
  appleWebApp: {
    title: SITE_CONFIG.name,
    statusBarStyle: 'black-translucent',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${SITE_CONFIG.url}/#website`,
        url: SITE_CONFIG.url,
        name: SITE_CONFIG.name,
        description: SITE_CONFIG.description,
      },
      {
        '@type': 'Organization',
        '@id': `${SITE_CONFIG.url}/#organization`,
        name: SITE_CONFIG.name,
        url: SITE_CONFIG.url,
        logo: `${SITE_CONFIG.url}/favicon.ico`,
        contactPoint: {
          '@type': 'ContactPoint',
          email: SITE_CONFIG.email,
          contactType: 'customer support',
        },
      },
      {
        '@type': 'ProfessionalService',
        '@id': `${SITE_CONFIG.url}/#service`,
        name: SITE_CONFIG.name,
        url: SITE_CONFIG.url,
        email: SITE_CONFIG.email,
        description: SITE_CONFIG.description,
        serviceType: [
          'Web application development',
          'AI workflow design',
          'Automation',
          'UI engineering',
        ],
      },
    ],
  }

  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <body className="flex min-h-full flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <ThemeProvider attribute="class" defaultTheme="system">
          <SmoothScrollProvider>
            <WebGLProvider>
              <Preloader />
              <MainLayout>{children}</MainLayout>
            </WebGLProvider>
          </SmoothScrollProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
