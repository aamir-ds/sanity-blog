import { PortableText } from '@portabletext/react'
import Link from 'next/link'

import styles from './BlogHeader.module.css'

export default function BlogHeader({
  title,
  description,
  level,
}: {
  title: string
  description?: any[]
  level: 1 | 2
}) {
  switch (level) {
    case 1:
      return (
        <header className="mb-10 mt-16 flex flex-col items-center md:mb-12 md:flex-row md:justify-between">
          <h1 className="text-6xl font-bold leading-tight tracking-tighter md:pr-8 md:text-8xl">
            {title}
          </h1>
          <nav className="mt-4 md:mt-0 space-x-4">
            <Link className="text-gray-600 hover:text-gray-800" href="/about">About Us</Link>
            {/* <Link className="text-gray-600 hover:text-gray-800" href="/contact">Contact</Link> */}
          </nav>
        </header>
      )
    case 2:
      return (
        <header className=" flex flex-col items-center md:flex-row md:justify-between">
          <h2 className="mb-20 mt-8 text-2xl font-bold leading-tight tracking-tight md:text-4xl md:tracking-tighter">
            <Link href="/" className="hover:underline">
              {title}
            </Link>
          </h2>
          <nav className="mt-4 md:mt-0 space-x-4">
            <Link className="text-gray-600 hover:text-gray-800" href="/about">About Us</Link>
            {/* <Link className="text-gray-600 hover:text-gray-800" href="/contact">Contact</Link> */}
          </nav>
        </header>
      )

    default:
      throw new Error(
        `Invalid level: ${
          JSON.stringify(level) || typeof level
        }, only 1 or 2 are allowed`,
      )
  }
}
