import Link from '@/components/Link'
import Tag from '@/components/Tag'
import { slug } from 'github-slugger'
import tagData from 'app/tag-data.json'
import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({ title: 'Tags', description: 'Things I blog about' })

export default async function Page() {
  const tagCounts = tagData as Record<string, number>
  const tagKeys = Object.keys(tagCounts)
  const sortedTags = tagKeys.sort((a, b) => tagCounts[b] - tagCounts[a])
  return (
    <>
      <div className="divide-y divide-zinc-200 dark:divide-zinc-700">
        <div className="space-y-2 pb-8 pt-6 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            Tags
          </h1>
        </div>
        <div className="flex w-full flex-wrap pt-8">
          {tagKeys.length === 0 && 'No tags found.'}
          {sortedTags.map((t) => {
            return (
              <div key={t} className="mb-2 mr-5 mt-2 btn-3d-full dark:btn-3d-full">
                <Tag text={t} />
                <Link
                  href={`/tags/${slug(t)}`}
                  className="-ml-2 text-sm font-semibold uppercase text-zinc-600 dark:text-zinc-300"
                  aria-label={`View posts tagged ${t}`}
                >
                  {` (${tagCounts[t]})`}
                </Link>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}
