import { ImageResponse } from 'next/og'
import { SITE_CONFIG } from '@/lib/constants/site'

export const alt = `${SITE_CONFIG.name} digital product studio`
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        background: '#0A0A0B',
        color: '#F5F0E8',
        padding: '72px',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <div style={{ color: '#E8A73D', fontSize: 28, letterSpacing: 8, textTransform: 'uppercase' }}>
        Digital Product Studio
      </div>
      <div style={{ fontSize: 112, fontWeight: 700, lineHeight: 1, marginTop: 32 }}>
        {SITE_CONFIG.name}
      </div>
      <div
        style={{ color: '#A1A1A8', fontSize: 34, lineHeight: 1.35, marginTop: 36, maxWidth: 900 }}
      >
        Focused web applications, AI workflows, automation, and motion-rich interfaces.
      </div>
    </div>,
    size
  )
}
