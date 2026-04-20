'use client'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

interface ScrollFadeProps {
  children: React.ReactNode
  delay?: number
  className?: string
}

export function ScrollFade({ children, delay = 0, className }: ScrollFadeProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
