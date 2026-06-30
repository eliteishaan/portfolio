import { NextResponse } from 'next/server'
import { Resend } from 'resend'

// Initialize Resend (will be undefined if no key, handled in fallback)
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, service, _honeypot, _timestamp } = body

    // 1. Honeypot Validation (Spam Protection)
    if (_honeypot !== undefined && _honeypot !== '') {
      // Spam detected. Fail silently to confuse bots.
      return NextResponse.json({ success: true, message: 'Message received.' })
    }

    // 2. Timestamp Validation (Reject instant submissions)
    if (_timestamp) {
      const submissionTime = Date.now()
      const renderTime = parseInt(_timestamp, 10)

      // If submitted in less than 3 seconds, it's likely a bot
      if (submissionTime - renderTime < 3000) {
        return NextResponse.json(
          { error: 'Submission rejected. Please try again.' },
          { status: 400 }
        )
      }
    } else {
      return NextResponse.json({ error: 'Missing security token.' }, { status: 400 })
    }

    // 3. Server-side Validation
    if (!name || typeof name !== 'string' || name.length < 2 || name.length > 100) {
      return NextResponse.json({ error: 'Invalid name provided.' }, { status: 400 })
    }

    if (!email || typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Invalid email provided.' }, { status: 400 })
    }

    if (!service || typeof service !== 'string' || service.length < 2 || service.length > 500) {
      return NextResponse.json({ error: 'Invalid service description.' }, { status: 400 })
    }

    // 4. Resend Integration & Graceful Fallback
    if (resend) {
      const { error } = await resend.emails.send({
        from: 'Ravenhall Studio <onboarding@resend.dev>', // Should use verified domain in prod
        to: 'hello@ravenhall.studio', // The studio's actual email
        replyTo: email,
        subject: `New Inquiry from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\nService: ${service}\n\nSubmitted at: ${new Date().toISOString()}`,
      })

      if (error) {
        console.error('Resend API Error:', error)
        return NextResponse.json(
          { error: 'Failed to send message via email provider.' },
          { status: 500 }
        )
      }
    } else {
      // Graceful Fallback for Local Dev / Missing API Key
      console.warn('RESEND_API_KEY is missing. Simulating email send.')
      console.log('--- MOCK EMAIL ---')
      console.log(`From: ${name} <${email}>`)
      console.log(`Service: ${service}`)
      console.log('------------------')

      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 800))
    }

    return NextResponse.json({ success: true, message: 'Message received successfully.' })
  } catch (error) {
    console.error('Contact API Error:', error)
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 })
  }
}
