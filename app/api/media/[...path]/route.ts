import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path: routePath } = await params

  if (!routePath || routePath.length === 0) {
    return new NextResponse('Not Found', { status: 404 })
  }

  // Securely resolve the file path within content/projects
  const filePath = path.join(process.cwd(), 'content/projects', ...routePath)

  // Prevent directory traversal attacks
  if (!filePath.startsWith(path.join(process.cwd(), 'content/projects'))) {
    return new NextResponse('Forbidden', { status: 403 })
  }

  if (!fs.existsSync(filePath)) {
    return new NextResponse('Not Found', { status: 404 })
  }

  const stat = fs.statSync(filePath)
  if (stat.isDirectory()) {
    return new NextResponse('Forbidden', { status: 403 })
  }

  const fileBuffer = fs.readFileSync(filePath)
  const ext = path.extname(filePath).toLowerCase()
  const mimeMap: Record<string, string> = {
    '.webp': 'image/webp',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.mp4': 'video/mp4',
  }
  const mimeType = mimeMap[ext] || 'application/octet-stream'

  return new NextResponse(fileBuffer, {
    headers: {
      'Content-Type': mimeType,
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  })
}
