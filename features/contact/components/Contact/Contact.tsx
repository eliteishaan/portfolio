'use client'

import React, { useState, useEffect } from 'react'
import { CursorSpotlight } from '@/components/animation/CursorSpotlight'
import { TYPOGRAPHY } from '@/lib/design-tokens/typography'
import { cn } from '@/lib/utils'
import { ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react'
import { CONTACT_CONTENT } from '@/content/contact'
import { Magnetic } from '@/components/animation/Magnetic'

export const Contact = () => {
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [formData, setFormData] = useState({ name: '', email: '', service: '', _honeypot: '' })
  const [errors, setErrors] = useState({ name: '', email: '', service: '' })
  const [touched, setTouched] = useState({ name: false, email: false, service: false })
  const [submitError, setSubmitError] = useState('')
  const renderTimeRef = React.useRef<number>(0)

  useEffect(() => {
    renderTimeRef.current = Date.now()
  }, [])

  const validate = (field: string, value: string) => {
    let error = ''
    if (!value.trim()) {
      error = 'This field is required'
    } else if (field === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      error = 'Invalid email address'
    }
    setErrors((prev) => ({ ...prev, [field]: error }))
    return !error
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    const field = id.replace('contact-', '')
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (touched[field as keyof typeof touched]) {
      validate(field, value)
    }
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    const field = id.replace('contact-', '')
    setTouched((prev) => ({ ...prev, [field]: true }))
    validate(field, value)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const isNameValid = validate('name', formData.name)
    const isEmailValid = validate('email', formData.email)
    const isServiceValid = validate('service', formData.service)

    setTouched({ name: true, email: true, service: true })

    if (isNameValid && isEmailValid && isServiceValid) {
      setFormState('submitting')
      setSubmitError('')

      try {
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...formData,
            _timestamp: renderTimeRef.current.toString(),
          }),
        })

        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.error || 'Failed to send message')
        }

        setFormState('success')
      } catch (err) {
        setFormState('error')
        setSubmitError(err instanceof Error ? err.message : 'An unexpected error occurred')
      }
    }
  }

  return (
    <section
      id="contact"
      className="bg-background relative z-30 flex min-h-[100svh] w-full items-center overflow-hidden py-[clamp(6rem,15vw,12rem)]"
    >
      <CursorSpotlight />

      <div className="relative z-10 mx-auto grid w-full max-w-[1600px] grid-cols-1 gap-24 px-6 md:px-12 lg:grid-cols-2">
        {/* Left: The Hook */}
        <div className="flex flex-col justify-center">
          <h2 className={cn(TYPOGRAPHY.display, 'mb-12 whitespace-normal md:whitespace-nowrap')}>
            Start a <br />
            <span className="text-accent italic">Conversation</span>
          </h2>
          <div className="flex flex-col gap-4">
            <p className={TYPOGRAPHY.metadata}>DIRECT COMMS</p>
            <a
              href={`mailto:${CONTACT_CONTENT.email}`}
              className="hover:text-accent font-sans text-xl transition-colors md:text-2xl"
            >
              {CONTACT_CONTENT.email}
            </a>
            <p className={cn(TYPOGRAPHY.metadata, 'mt-4 opacity-50')}>
              HQ // 40.7128° N, 74.0060° W
            </p>
            <div className="mt-8">
              <Magnetic>
                <a
                  href={CONTACT_CONTENT.socials.find((s) => s.label === 'WhatsApp')?.href || '#'}
                  target="_blank"
                  rel="noreferrer"
                  className="group border-accent/30 bg-accent/5 hover:bg-accent/10 flex w-max items-center gap-4 rounded-full border px-6 py-3 transition-colors"
                >
                  <span className="text-accent font-mono text-xs tracking-widest uppercase">
                    Message on WhatsApp
                  </span>
                  <ArrowRight className="text-accent h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
              </Magnetic>
            </div>
          </div>
        </div>

        {/* Right: The Structured Form */}
        <div className="flex flex-col justify-center">
          {formState === 'success' ? (
            <div className="border-accent animate-in fade-in slide-in-from-bottom-4 flex flex-col items-start gap-6 border-l pl-8 duration-1000">
              <CheckCircle2 className="text-accent h-12 w-12" aria-hidden="true" />
              <div>
                <h3 className="text-text-primary mb-2 font-serif text-3xl italic">
                  Transmission Received
                </h3>
                <p className={TYPOGRAPHY.manifesto}>
                  We will process your request and respond shortly.
                </p>
              </div>
            </div>
          ) : formState === 'error' ? (
            <div className="animate-in fade-in slide-in-from-bottom-4 flex flex-col items-start gap-6 border-l border-red-500 pl-8 duration-1000">
              <AlertCircle className="h-12 w-12 text-red-500" aria-hidden="true" />
              <div>
                <h3 className="text-text-primary mb-2 font-serif text-3xl italic">
                  Transmission Failed
                </h3>
                <p className={TYPOGRAPHY.manifesto}>{submitError}</p>
                <button
                  onClick={() => setFormState('idle')}
                  className="text-accent focus-visible:ring-accent mt-6 rounded-sm font-mono text-xs tracking-widest uppercase hover:underline focus-visible:ring-2 focus-visible:outline-none"
                >
                  Try Again
                </button>
              </div>
            </div>
          ) : (
            <form
              className="flex flex-col gap-10"
              onSubmit={handleSubmit}
              noValidate
              aria-label="Contact form"
            >
              {/* Honeypot field - visually hidden, removed from screen readers */}
              <input
                type="text"
                name="_honeypot"
                id="contact-honeypot"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                value={formData._honeypot}
                onChange={handleChange}
                className="absolute -z-10 h-0 w-0 opacity-0"
              />
              <div className="group relative flex flex-col gap-2">
                <label htmlFor="contact-name" className={TYPOGRAPHY.metadata}>
                  01 // YOUR NAME
                </label>
                <div className="relative">
                  <input
                    id="contact-name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    disabled={formState === 'submitting'}
                    className={cn(
                      'w-full border-b bg-transparent py-4 font-sans text-xl transition-colors outline-none disabled:opacity-50',
                      errors.name
                        ? 'border-red-500 text-red-500 focus:border-red-500'
                        : 'border-border/50 focus:border-accent'
                    )}
                    placeholder="Enter your name"
                    aria-invalid={!!errors.name}
                  />
                  {errors.name && (
                    <AlertCircle className="absolute top-1/2 right-0 h-5 w-5 -translate-y-1/2 text-red-500" />
                  )}
                </div>
                {errors.name && (
                  <span className="absolute -bottom-6 font-mono text-xs tracking-widest text-red-500 uppercase">
                    {errors.name}
                  </span>
                )}
              </div>

              <div className="group relative flex flex-col gap-2">
                <label htmlFor="contact-email" className={TYPOGRAPHY.metadata}>
                  02 // EMAIL ADDRESS
                </label>
                <div className="relative">
                  <input
                    id="contact-email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    disabled={formState === 'submitting'}
                    className={cn(
                      'w-full border-b bg-transparent py-4 font-sans text-xl transition-colors outline-none disabled:opacity-50',
                      errors.email
                        ? 'border-red-500 text-red-500 focus:border-red-500'
                        : 'border-border/50 focus:border-accent'
                    )}
                    placeholder={CONTACT_CONTENT.email}
                    aria-invalid={!!errors.email}
                  />
                  {errors.email && (
                    <AlertCircle className="absolute top-1/2 right-0 h-5 w-5 -translate-y-1/2 text-red-500" />
                  )}
                </div>
                {errors.email && (
                  <span className="absolute -bottom-6 font-mono text-xs tracking-widest text-red-500 uppercase">
                    {errors.email}
                  </span>
                )}
              </div>

              <div className="group relative flex flex-col gap-2">
                <label htmlFor="contact-service" className={TYPOGRAPHY.metadata}>
                  03 // SERVICE REQUIRED
                </label>
                <div className="relative">
                  <input
                    id="contact-service"
                    type="text"
                    value={formData.service}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    disabled={formState === 'submitting'}
                    className={cn(
                      'w-full border-b bg-transparent py-4 font-sans text-xl transition-colors outline-none disabled:opacity-50',
                      errors.service
                        ? 'border-red-500 text-red-500 focus:border-red-500'
                        : 'border-border/50 focus:border-accent'
                    )}
                    placeholder="SaaS, AI, Web, Motion..."
                    aria-invalid={!!errors.service}
                  />
                  {errors.service && (
                    <AlertCircle className="absolute top-1/2 right-0 h-5 w-5 -translate-y-1/2 text-red-500" />
                  )}
                </div>
                {errors.service && (
                  <span className="absolute -bottom-6 font-mono text-xs tracking-widest text-red-500 uppercase">
                    {errors.service}
                  </span>
                )}
              </div>

              <button
                type="submit"
                disabled={formState === 'submitting'}
                className="group focus-visible:ring-accent mt-8 -ml-2 flex w-max items-center gap-4 rounded-sm px-2 text-xl focus-visible:ring-2 focus-visible:outline-none disabled:opacity-50 md:text-2xl"
                aria-live="polite"
              >
                <span className="relative">
                  {formState === 'submitting' ? 'SENDING...' : 'SEND MESSAGE'}
                  <span className="bg-accent absolute -bottom-2 left-0 h-[2px] w-full origin-left scale-x-0 transition-transform duration-500 ease-out group-hover:scale-x-100" />
                </span>
                <ArrowRight
                  className={cn(
                    'text-accent transition-transform duration-500',
                    formState === 'submitting' ? 'animate-pulse' : 'group-hover:translate-x-2'
                  )}
                  aria-hidden="true"
                />
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
