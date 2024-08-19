import Link from '@/components/Link'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import { formatDate } from 'pliny/utils/formatDate'
import { coreContent } from 'pliny/utils/contentlayer'
import AuthorLayout from '@/layouts/AuthorLayout'
import { allAuthors, Authors } from 'contentlayer/generated'

const MAX_DISPLAY = 6
const DEFAULT_IMAGES = [
  'city.jpg',
  'jinjia.jpg',
  'kyoto.jpg',
  'osaka.jpg',
  'shinjuku.jpg',
  'tokyo.jpg',
]

export default function Home({ posts }) {
  const author = allAuthors.find((p) => p.slug === 'default') as Authors
  const mainContent = coreContent(author)

  return (
    <>
      <AuthorLayout content={mainContent}>
        <div className="space-y-2 pt-6 pb-8 md:space-y-5">
          <h1 className="text-2xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            Welcome
          </h1>
          <h3 className="font-normal text-lg">
            Hello!👋 I'm {mainContent.name}. Currently living in Tokyo. 🇯🇵
          </h3>
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
            Front-end developer passionate about user-friendly interfaces and open-source projects.
            Driven by creativity and an insatiable curiosity.
          </p>
        </div>
      </AuthorLayout>
      <div className="divide-y divide-slate-200 dark:divide-slate-700">
        <div className="space-y-2 pt-6 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-slate-900 dark:text-slate-100 sm:text-3xl sm:leading-10 md:text-4xl md:leading-14">
            Latest Posts
          </h1>
        </div>
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 py-8">
          {!posts.length && 'No posts found.'}
          {posts.slice(0, MAX_DISPLAY).map((post) => {
            const { slug, date, title, summary, tags, images } = post
            return (
              <li key={slug} className="flex">
                <article className="flex flex-col justify-between w-full h-[26rem] p-4 rounded-lg transition-all duration-300 ease-in-out hover:-translate-y-4 hover:bg-slate-200 hover:dark:bg-slate-200 hover:shadow-lg">
                  <header>
                    <div className="aspect-w-16 aspect-h-9 mb-4">
                      <img
                        src={
                          images && images.length > 0
                            ? images[0]
                            : `/static/images/default/${
                                DEFAULT_IMAGES[Math.floor(Math.random() * DEFAULT_IMAGES.length)]
                              }`
                        }
                        alt={title}
                        className="object-cover w-full h-full rounded-lg max-h-[10rem]"
                      />
                    </div>
                    <h2 className="text-xl font-bold leading-8 tracking-tight line-clamp-2 mb-2 text-slate-900 dark:text-slate-200 hover:text-slate-900 dark:hover:text-slate-200">
                      <Link
                        href={`/blog/${slug}`}
                        className="text-slate-900 dark:text-slate-200 hover:text-slate-900 dark:hover:text-slate-200"
                      >
                        {title}
                      </Link>
                    </h2>
                  </header>

                  {/* <div className="flex-grow overflow-hidden">
                    <div className="prose max-w-none text-sm text-slate-500 dark:text-slate-400 line-clamp-4">
                      {summary}
                    </div>
                  </div> */}

                  <footer className="mt-4">
                    <div className="flex flex-wrap gap-2 mb-2">
                      {tags.map((tag) => (
                        <Tag key={tag} text={tag} />
                      ))}
                    </div>
                    <dl>
                      <dt className="sr-only">Published on</dt>
                      <dd className="text-sm font-medium text-slate-500 dark:text-slate-400">
                        <time dateTime={date}>{formatDate(date, siteMetadata.locale)}</time>
                      </dd>
                    </dl>
                  </footer>
                </article>
              </li>
            )
          })}
        </ul>
      </div>
      {posts.length > MAX_DISPLAY && (
        <div className="flex justify-end text-base font-medium leading-6">
          <Link
            href="/blog"
            className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
            aria-label="All posts"
          >
            All Posts &rarr;
          </Link>
        </div>
      )}
    </>
  )
}
