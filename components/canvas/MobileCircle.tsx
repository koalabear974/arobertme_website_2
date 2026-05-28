'use client'
import { useEffect, useState } from 'react'
import { CircleCanvas } from './CircleCanvas'

export function MobileCircle() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.8)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div
      className={`
        fixed bottom-6 left-1/2 -translate-x-1/2 z-10 pointer-events-none
        lg:hidden
        transition-opacity duration-700
        ${visible ? 'opacity-100' : 'opacity-0 pointer-events-none'}
      `}
    >
      <CircleCanvas size={140} variant="mobile" />
    </div>
  )
}
