import React from 'react'
import Image from 'next/image'
import { Container } from '@/components/ui/Container'
import { ProjectStage } from '@/features/portfolio/components/Portfolio/ProjectStage'
import { ShowcaseGrid } from '@/features/portfolio/components/MDX/Showcase/ShowcaseGrid'

// --- Typography & Layout ---

type ProjectOverviewProps = {
  children?: React.ReactNode
  problem?: React.ReactNode
  objective?: React.ReactNode
}

type MetricItem = {
  label: string
  value: string
}

type GalleryImage = {
  src: string
  type?: 'image' | 'video'
  layout?: 'full' | 'half' | 'browser' | 'mobile'
  title?: string
  caption?: string
}

export const ProjectOverview = ({ children, problem, objective }: ProjectOverviewProps) => (
  <section className="border-y border-white/5 bg-black py-24 md:py-32">
    <Container maxWidth="5xl">
      <div className="flex flex-col gap-24">
        {problem && <Problem>{problem}</Problem>}
        {objective && <Solution>{objective}</Solution>}
        {children}
      </div>
    </Container>
  </section>
)

export const Problem = ({ children }: { children: React.ReactNode }) => (
  <div className="grid grid-cols-1 gap-8 md:grid-cols-12 md:gap-16">
    <div className="md:col-span-4">
      <h2 className="text-accent font-mono text-[10px] tracking-widest uppercase">
        01 // The Problem
      </h2>
    </div>
    <div className="md:col-span-8">
      <div className="text-text-primary prose prose-invert prose-p:my-2 text-xl leading-relaxed font-light md:text-2xl">
        {children}
      </div>
    </div>
  </div>
)

export const Solution = ({ children }: { children: React.ReactNode }) => (
  <div className="grid grid-cols-1 gap-8 md:grid-cols-12 md:gap-16">
    <div className="md:col-span-4">
      <h2 className="text-accent font-mono text-[10px] tracking-widest uppercase">
        02 // The Solution
      </h2>
    </div>
    <div className="md:col-span-8">
      <div className="text-text-primary prose prose-invert prose-p:my-2 text-xl leading-relaxed font-light md:text-2xl">
        {children}
      </div>
    </div>
  </div>
)

export const Process = ({ children }: { children: React.ReactNode }) => (
  <section className="py-24 md:py-32">
    <Container maxWidth="5xl">
      <div className="grid grid-cols-1 gap-16 md:gap-24">{children}</div>
    </Container>
  </section>
)

export const Callout = ({ children }: { children: React.ReactNode }) => (
  <div className="border-accent my-12 border-l-2 pl-6">
    <div className="text-text-primary font-serif text-2xl italic md:text-3xl">{children}</div>
  </div>
)

export const Quote = ({ text, author }: { text: string; author?: string }) => (
  <div className="flex flex-col items-center py-16 text-center md:py-24">
    <p className="max-w-4xl font-serif text-3xl leading-tight text-white italic md:text-5xl">
      &quot;{text}&quot;
    </p>
    {author && (
      <p className="text-accent mt-8 font-mono text-[10px] tracking-widest uppercase">{author}</p>
    )}
  </div>
)

export const Metrics = ({
  children,
  items,
}: {
  children?: React.ReactNode
  items?: MetricItem[]
}) => (
  <div className="grid grid-cols-1 gap-12 py-16 md:grid-cols-3">
    {items?.map((item) => (
      <Metric key={`${item.label}-${item.value}`} label={item.label} value={item.value} />
    ))}
    {children}
  </div>
)

export const Metric = ({ label, value }: { label: string; value: string }) => (
  <div className="flex flex-col gap-2">
    <span className="text-5xl font-light text-white md:text-6xl">{value}</span>
    <span className="text-accent font-mono text-[10px] tracking-widest uppercase">{label}</span>
  </div>
)

export const TechStack = ({ items }: { items: string[] }) => (
  <div className="mt-8 flex flex-wrap gap-4">
    {items.map((item, idx) => (
      <span
        key={idx}
        className="text-text-secondary rounded-full border border-white/10 bg-white/5 px-4 py-2 font-mono text-sm tracking-widest uppercase"
      >
        {item}
      </span>
    ))}
  </div>
)

// --- Media & Galleries ---

export const BrowserFrame = ({ src, alt }: { src: string; alt?: string }) => (
  <div className="mx-auto my-16 w-full max-w-5xl">
    <ProjectStage type="browser" imageSrc={src} alt={alt || 'Browser Frame'} />
  </div>
)

export const PhoneFrame = ({ src, alt }: { src: string; alt?: string }) => (
  <div className="mx-auto my-16 w-full max-w-md">
    <ProjectStage type="mobile" imageSrc={src} alt={alt || 'Phone Frame'} />
  </div>
)

export const VideoPlayer = ({
  src,
  autoPlay = true,
  loop = true,
}: {
  src: string
  autoPlay?: boolean
  loop?: boolean
}) => (
  <div className="relative my-16 aspect-[16/9] w-full overflow-hidden rounded-sm bg-black shadow-2xl ring-1 ring-white/10">
    <video
      src={src}
      autoPlay={autoPlay}
      muted
      loop={loop}
      playsInline
      className="h-full w-full object-cover"
    />
  </div>
)

export const Gallery = ({
  children,
  images,
}: {
  children?: React.ReactNode
  images?: GalleryImage[]
}) => (
  <section className="w-full border-y border-white/5 bg-[#050505] py-24 md:py-32">
    <div className="mx-auto flex w-full max-w-[1600px] flex-col gap-32 px-6 md:px-12">
      {images?.map((image) => (
        <GalleryItem key={`${image.src}-${image.title ?? ''}`} {...image} />
      ))}
      {children}
    </div>
  </section>
)

export const GalleryItem = ({
  src,
  type = 'image',
  layout = 'full',
  title,
  caption,
}: {
  src: string
  type?: 'image' | 'video'
  layout?: 'full' | 'half' | 'browser' | 'mobile'
  title?: string
  caption?: string
}) => {
  if (layout === 'full') {
    return (
      <div className="flex w-full flex-col gap-6">
        <div className="relative aspect-[21/9] w-full overflow-hidden rounded-sm bg-black shadow-2xl ring-1 ring-white/5">
          {type === 'image' ? (
            <Image src={src} alt={title || ''} fill className="object-cover" />
          ) : (
            <video
              src={src}
              autoPlay
              muted
              loop
              playsInline
              className="h-full w-full object-cover"
            />
          )}
        </div>
        {(title || caption) && (
          <div className="flex flex-col justify-between gap-4 px-4 md:flex-row md:items-center">
            {title && (
              <h4 className="font-mono text-xs tracking-widest text-white uppercase">{title}</h4>
            )}
            {caption && (
              <p className="text-text-secondary max-w-xl text-sm font-light">{caption}</p>
            )}
          </div>
        )}
      </div>
    )
  }

  if (layout === 'browser') {
    return (
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-6">
        <ProjectStage type="browser" imageSrc={src} alt={title || ''} />
        {(title || caption) && (
          <div className="mt-4 flex flex-col items-center gap-2 text-center">
            {title && (
              <h4 className="font-mono text-xs tracking-widest text-white uppercase">{title}</h4>
            )}
            {caption && (
              <p className="text-text-secondary max-w-lg text-sm font-light">{caption}</p>
            )}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-6">
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-sm bg-black shadow-2xl ring-1 ring-white/5">
        {type === 'image' ? (
          <Image src={src} alt={title || ''} fill className="object-cover" />
        ) : (
          <video src={src} autoPlay muted loop playsInline className="h-full w-full object-cover" />
        )}
      </div>
      {(title || caption) && (
        <div className="mt-4 flex flex-col items-center gap-2 text-center">
          {title && (
            <h4 className="font-mono text-xs tracking-widest text-white uppercase">{title}</h4>
          )}
          {caption && <p className="text-text-secondary max-w-lg text-sm font-light">{caption}</p>}
        </div>
      )}
    </div>
  )
}

export const ImageComparison = ({
  beforeSrc,
  afterSrc,
}: {
  beforeSrc: string
  afterSrc: string
}) => {
  return (
    <div className="group relative my-16 flex aspect-video w-full overflow-hidden rounded-sm ring-1 ring-white/10">
      <div className="border-accent relative h-full w-1/2 overflow-hidden border-r-2">
        <Image src={beforeSrc} alt="Before" fill className="object-cover object-left" />
        <div className="absolute bottom-4 left-4 bg-black/80 px-3 py-1 font-mono text-[10px] tracking-widest text-white uppercase backdrop-blur-md">
          Before
        </div>
      </div>
      <div className="relative h-full w-1/2 overflow-hidden">
        <Image src={afterSrc} alt="After" fill className="object-cover object-right" />
        <div className="absolute right-4 bottom-4 bg-black/80 px-3 py-1 font-mono text-[10px] tracking-widest text-white uppercase backdrop-blur-md">
          After
        </div>
      </div>
    </div>
  )
}

export const MDX_COMPONENTS = {
  ProjectOverview,
  Problem,
  Solution,
  Process,
  Callout,
  Quote,
  Metrics,
  Metric,
  TechStack,
  ShowcaseGrid,
  BrowserFrame,
  PhoneFrame,
  VideoPlayer,
  Gallery,
  GalleryItem,
  ImageComparison,
}
