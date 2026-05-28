'use client'
import { useEffect, useState } from 'react'
import { CircleCanvas } from './CircleCanvas'

export function MobileCircle() {
  const [visible, setVisible] = useState(false)
  const [size, setSize] = useState(0)

  useEffect(() => {
    setSize(window.innerWidth)
    const onResize = () => setSize(window.innerWidth)
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.8)
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  if (!size) return null

  return (
    <div
      className={`
        fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none
        lg:hidden
        transition-opacity duration-700
        ${visible ? 'opacity-100' : 'opacity-0'}
      `}
    >
      <CircleCanvas size={size} variant="screen" />
    </div>
  )
}
