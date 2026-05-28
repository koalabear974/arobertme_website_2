'use client'
import { useEffect, useRef, useState } from 'react'

export function useScrollDirection(): 'up' | 'down' {
  const [direction, setDirection] = useState<'up' | 'down'>('up')
  const lastScrollY = useRef(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY
      if (Math.abs(currentY - lastScrollY.current) < 5) return
      setDirection(currentY > lastScrollY.current ? 'down' : 'up')
      lastScrollY.current = currentY
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return direction
}
