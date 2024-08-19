'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { formatDate } from 'pliny/utils/formatDate'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog } from 'contentlayer/generated'
import Link from '@/components/Link'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'

const DEFAULT_IMAGES = ['city.jpg', 'jinjia.jpg', 'kyoto.jpg', 'osaka.jpg', 'shinjuku.jpg', 'tokyo.jpg']
interface PaginationProps {
  totalPages: number
  currentPage: number
}
interface ListLayoutProps {
  posts: CoreContent<Blog>[]
  title: string
  initialDisplayPosts?: CoreContent<Blog>[]
  pagination?: PaginationProps
}

function Pagination({ totalPages, currentPage }: PaginationProps) {
  const pathname = usePathname()
  const basePath = pathname.split('/')[1]
  const prevPage = currentPage - 1 > 0
  const nextPage = currentPage + 1 <= totalPages

  return (
    <div className="space-y-2 pb-8 pt-6 md:space-y-5">
      <nav className="flex justify-between">
        {!prevPage && (
          <button className="cursor-auto disabled:opacity-50" disabled={!prevPage}>
            Previous
          </button>
        )}
        {prevPage && (
          <Link
            href={currentPage - 1 === 1 ? `/${basePath}/` : `/${basePath}/page/${currentPage - 1}`}
            rel="prev"
            className="hover:text-primary-500 transition delay-100 hover:-translate-x-2 duration-200"
          >
            Previous
          </Link>
        )}
        <span>
          {currentPage} of {totalPages}
        </span>
        {!nextPage && (
          <button className="cursor-auto disabled:opacity-50" disabled={!nextPage}>
            Next
          </button>
        )}
        {nextPage && (
          <Link
            href={`/${basePath}/page/${currentPage + 1}`}
            rel="next"
            className=" hover:text-primary-500 transition delay-100 hover:translate-x-2 duration-200"
          >
            Next
          </Link>
        )}
      </nav>
    </div>
  )
}

export default function ListLayout({
  posts,
  title,
  initialDisplayPosts = [],
  pagination,
}: ListLayoutProps) {
  const [searchValue, setSearchValue] = useState('')
  const filteredBlogPosts = posts.filter((post) => {
    const searchContent = post.title + post.summary + post.tags?.join(' ')
    return searchContent.toLowerCase().includes(searchValue.toLowerCase())
  })

  const displayPosts =
    initialDisplayPosts.length > 0 && !searchValue ? initialDisplayPosts : filteredBlogPosts

  return (
    <>
      <div className="divide-y divide-slate-200 dark:divide-slate-700">
        <div className="space-y-2 pb-8 pt-6 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-slate-900 dark:text-slate-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            {title}
          </h1>
          <div className="relative max-w-lg">
            <input
              aria-label="Search articles"
              type="text"
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search articles"
              className="block w-full rounded-md border border-slate-300 bg-white px-4 py-2 text-slate-900 focus:border-primary-500 focus:ring-primary-500 dark:border-slate-500 dark:bg-slate-800 dark:text-slate-100"
            />
            <svg
              className="absolute right-3 top-3 h-5 w-5 text-slate-400 dark:text-slate-300"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 py-8">
          {!filteredBlogPosts.length && 'No posts found.'}
          {displayPosts.map((post) => {
            const { slug, date, title, summary, tags, images } = post
            return (
              <li key={slug} className="flex">
                <article className="flex flex-col justify-between w-full h-min-[26rem] p-4 rounded-lg transition-all duration-300 ease-in-out hover:-translate-y-4 hover:bg-slate-200 hover:dark:bg-slate-900 hover:shadow-lg">
                  <header>
                    <div className="aspect-w-16 aspect-h-9 mb-4">
                      <img
                        src={images && images.length > 0 ? images[0] : `/static/images/default/${DEFAULT_IMAGES[Math.floor(Math.random() * DEFAULT_IMAGES.length)]}`}
                        alt={title}
                        className="object-cover w-full rounded-lg md:max-h-40 lg:max-h-60"
                      />
                    </div>
                    <h2 className="text-xl font-bold leading-8 tracking-tight line-clamp-2 mb-2">
                      <Link
                        href={`/blog/${slug}`}
                        className="text-slate-900 dark:text-slate-100"
                      >
                        {title}
                      </Link>
                    </h2>
                  </header>

                  <div className="flex-grow overflow-hidden">
                    <div className="prose max-w-none text-sm text-slate-500 dark:text-slate-400 line-clamp-4">
                      {summary}
                    </div>
                  </div>

                  <footer className="">
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
      {pagination && pagination.totalPages > 1 && !searchValue && (
        <Pagination currentPage={pagination.currentPage} totalPages={pagination.totalPages} />
      )}
    </>
  )
}
