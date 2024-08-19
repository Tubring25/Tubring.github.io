'use client'
import Link from './Link'
import siteMetadata from '@/data/siteMetadata'
import SocialIcon from '@/components/social-icons'
import { useEffect, useState } from 'react'
import React from 'react'

export default function Footer() {
  return (
    <footer>
      <div className="mt-16 flex flex-col items-center justify-center md:flex-row md:justify-between">
        <div className="mb-3 flex space-x-4">
          <SocialIcon kind="twitter" href={siteMetadata.twitter} />
          <SocialIcon kind="github" href={siteMetadata.github} />
          <SocialIcon kind="mail" href={`mailto:${siteMetadata.email}`} />
        </div>
        <div className="mb-2 flex space-x-2 text-slate-500 dark:text-slate-400">
          {/* eslint-disable-next-line prettier/prettier */}
          Tokyo at
          <MemoTimeDisplay />
        </div>
      </div>
    </footer>
  )
}

const TimeDisplay = () => {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <span suppressHydrationWarning className="pl-2">
      {time.toLocaleTimeString('ja-JP', {
        timeZone: 'Asia/Tokyo',
        hour: '2-digit',
        minute: '2-digit',
      })}
    </span>
  )
}
const MemoTimeDisplay = React.memo(TimeDisplay)
