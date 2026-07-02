import React from 'react'
import { SERVICES_CONTENT } from '@/content/services'
import { ServicesMatrix } from './ServicesMatrix'

export const Services = () => {
  return (
    <section id="services" className="bg-background relative w-full py-[clamp(6rem,15vw,12rem)]">
      <div className="mx-auto w-full max-w-[1600px] px-6 md:px-12">
        <ServicesMatrix content={SERVICES_CONTENT} />
      </div>
    </section>
  )
}
