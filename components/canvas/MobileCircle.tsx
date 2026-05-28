'use client'
import { useEffect, useState } from 'react'
import { CircleCanvas } from './CircleCanvas'

export function MobileCircle() {
  const [visible, setVisible] = useState(false)
  const [size, setSize] = useState(0)
  const [variant, setVariant] = useState<'tablet' | 'mobile'>('mobile')

  useEffect(() => {
    const calcSize = () => window.innerWidth >= 768
      ? Math.min(window.innerWidth, window.innerHeight * 0.88, 680)
      : Math.min(window.innerWidth, window.innerHeight * 0.9, 420)
    const calcVariant = (): 'tablet' | 'mobile' => window.innerWidth >= 768 ? 'tablet' : 'mobile'

    setSize(calcSize())
    setVariant(calcVariant())

    const onResize = () => {
      setSize(calcSize())
      setVariant(calcVariant())
    }
    window.addEventListener('resize', onResize, { passive: true })

    const hero = document.getElementById('hero')
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { threshold: 0 }
    )
    if (hero) observer.observe(hero)

    return () => {
      window.removeEventListener('resize', onResize)
      observer.disconnect()
    }
  }, [])

  if (!size) return null

  return (
    <div
      className={`
        fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 pointer-events-none
        lg:hidden
        transition-opacity duration-700
        ${visible ? 'opacity-100' : 'opacity-0'}
      `}
    >
      <CircleCanvas size={size} variant={variant} />
    </div>
  )
}
