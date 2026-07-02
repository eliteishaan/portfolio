import { getShowcaseWorks } from '@/content/projects/showcase'
import { ShowcaseGridClient } from './ShowcaseGridClient'

export async function ShowcaseGrid({ collection }: { collection: string }) {
  const works = getShowcaseWorks(collection)

  if (!works || works.length === 0) {
    return (
      <div className="text-text-muted my-12 rounded-xl border border-white/5 bg-white/5 py-12 text-center font-mono text-sm tracking-widest uppercase">
        No works found in {collection}
      </div>
    )
  }

  return <ShowcaseGridClient works={works} collection={collection} />
}
