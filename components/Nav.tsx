'use client'
import { useEffect, useState } from 'react'

const NAV_LINKS = [
  { href: '#about', label: 'About' },
  { href: '#services', label: 'Services' },
  { href: '#portfolio', label: 'Portfolio' },
  { href: '#contact', label: 'Contact' },
]

export function Nav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-deep-space/80 backdrop-blur-md border-b border-white/5'
          : ''
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#" className="font-bebas text-2xl tracking-widest">
          <span className="gradient-text">AX</span>
          <span className="text-silver">ENIOR</span>
        </a>
        <ul className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(({ href, label }) => (
            <li key={href}>
              <a
                href={href}
                className="font-sora text-sm text-silver hover:text-ax-white transition-colors"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href="#contact"
          className="font-sora text-sm px-4 py-2 rounded-lg bg-gradient-to-br from-ax-blue to-ax-violet text-white hover:opacity-90 transition-opacity"
        >
          문의하기
        </a>
      </div>
    </nav>
  )
}
