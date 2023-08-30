/* eslint-disable jsx-a11y/anchor-has-content */
import Link from 'next/link'
import type { LinkProps } from 'next/link'
import { AnchorHTMLAttributes } from 'react'

const CustomLink = ({ href, ...rest }: LinkProps & AnchorHTMLAttributes<HTMLAnchorElement>) => {
  const isInternalLink = href && href.startsWith('/')
  const isAnchorLink = href && href.startsWith('#')

  // const classNames = {
  //   ""
  // }

  if (isInternalLink) {
    return <Link  className="hover:bg-zinc-400 text-cyan-300" href={href} {...rest} />
  }

  if (isAnchorLink) {
    return <a className="hover:bg-zinc-400 text-cyan-300" href={href} {...rest} />
  }

  return (
    <a
      className="hover:bg-zinc-400 text-cyan-300"
      target="_blank"
      rel="noopener noreferrer"
      href={href}
      {...rest}
    />
  )
}

export default CustomLink
