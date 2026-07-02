import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { z } from 'zod'

// Initialize Resend (will be undefined if no key, handled in fallback)
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().email('Invalid email address'),
  service: z.string().min(2).max(500),
  _honeypot: z.string().optional(),
  _timestamp: z.string().optional(),
})

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // 1. Zod Validation & Sanitization
    const result = contactSchema.safeParse(body)

    if (!result.success) {
      return NextResponse.json(
        { error: result.error.issues[0].message || 'Invalid form data.' },
        { status: 400 }
      )
    }

    const { name, email, service, _honeypot, _timestamp } = result.data

    // 2. Honeypot Validation (Spam Protection)
    if (_honeypot !== undefined && _honeypot !== '') {
      // Spam detected. Fail silently to confuse bots.
      return NextResponse.json({ success: true, message: 'Message received.' })
    }

    // 3. Timestamp Validation (Reject instant submissions)
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

    // 4. Resend Integration & Fail-Safe Verification
    if (resend) {
      const { error: resendError } = await resend.emails.send({
        from: 'Ravenhall Studio <onboarding@resend.dev>', // Should use verified domain in prod
        to: 'hello@ravenhallstudio.com', // The studio's actual email
        replyTo: email,
        subject: `New Inquiry from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\nService: ${service}\n\nSubmitted at: ${new Date().toISOString()}`,
      })

      if (resendError) {
        console.error('Contact API Error: Failed to send via email provider.') // Sanitized logging
        return NextResponse.json(
          { error: 'Failed to send message via email provider.' },
          { status: 500 }
        )
      }
    } else {
      if (process.env.NODE_ENV === 'production') {
        // Never return success in production when email cannot be sent
        console.error('Contact API Error: RESEND_API_KEY is missing in production.')
        return NextResponse.json({ error: 'Email service is not configured.' }, { status: 500 })
      }

      // Graceful Fallback for Local Dev only
      console.warn('RESEND_API_KEY is missing in development. Simulating email send.')
      await new Promise((resolve) => setTimeout(resolve, 800))
    }

    console.log('Contact request processed successfully.') // Sanitized logging

    return NextResponse.json({ success: true, message: 'Message received successfully.' })
  } catch (err) {
    console.error('Contact API Error: Internal server error.', err) // Sanitized logging
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 })
  }
}
