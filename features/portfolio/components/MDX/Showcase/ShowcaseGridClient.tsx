'use client'

import { useState } from 'react'
import { ShowcaseWork } from '@/content/projects/types'
import { ShowcaseItem } from './ShowcaseItem'
import { ShowcaseModal } from './ShowcaseModal'

export function ShowcaseGridClient({
  works,
  collection,
}: {
  works: ShowcaseWork[]
  collection: string
}) {
  const [activeWork, setActiveWork] = useState<ShowcaseWork | null>(null)

  return (
    <>
      <div className="my-16 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
        {works.map((work) => (
          <ShowcaseItem
            key={work.id}
            work={work}
            collection={collection}
            onClick={() => setActiveWork(work)}
          />
        ))}
      </div>

      <ShowcaseModal
        work={activeWork}
        collection={collection}
        onClose={() => setActiveWork(null)}
      />
    </>
  )
}
