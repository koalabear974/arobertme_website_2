'use client'
import { useEffect, useRef } from 'react'
import type p5Type from 'p5'

interface CanvasConfig {
  text: string
  columns: number
  minRows: number
  maxRows: number
  columnSpace: number
  charSize: number
  rateAmount: number
  flip: boolean
  mirror: boolean
  bgColor: string
  strokeColor: string
  speed: number
}

const DESKTOP_CONFIG: CanvasConfig = {
  text: ' ADRIEN ',
  columns: 26,
  minRows: 1,
  maxRows: 35,
  columnSpace: 2,
  charSize: 0.5,
  rateAmount: -2,
  flip: true,
  mirror: true,
  bgColor: '#000000',
  strokeColor: '#e6e6e6',
  speed: 0.014,
}

const TABLET_CONFIG: CanvasConfig = { ...DESKTOP_CONFIG, columns: 14, maxRows: 25 }
const MOBILE_CONFIG: CanvasConfig = { ...DESKTOP_CONFIG, columns: 8, maxRows: 18 }

function getConfig(width: number): CanvasConfig {
  if (width < 640) return MOBILE_CONFIG
  if (width < 1024) return TABLET_CONFIG
  return DESKTOP_CONFIG
}

function seededRandom(seed: number): number {
  const x = Math.sin(seed * 12.9898 + 78.233) * 43758.5453
  return x - Math.floor(x)
}

const easeInOutCubic = (e: number) =>
  e < 0.5 ? 4 * e * e * e : 1 - Math.pow(-2 * e + 2, 3) / 2

export function GenerativeCanvas() {
  const containerRef = useRef<HTMLDivElement>(null)
  const p5Ref = useRef<p5Type | null>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    let cleanup: (() => void) | undefined

    const initCanvas = async () => {
      const p5 = (await import('p5')).default

      const sketch = (p: p5Type) => {
        let time = 0
        let S = getConfig(container.offsetWidth)
        const columnPhases: number[] = []

        p.setup = () => {
          const canvas = p.createCanvas(container.offsetWidth, container.offsetHeight)
          canvas.parent(container)
          canvas.style('display', 'block')
          p.textFont('Geist, Arial, sans-serif')
          p.textAlign(p.CENTER, p.CENTER)

          for (let i = 0; i < S.columns; i++) {
            columnPhases.push(seededRandom(i * 7.3))
          }
        }

        p.draw = () => {
          p.background(S.bgColor)
          time += S.speed * (p.deltaTime / 16.67)

          const colW = p.width / S.columns
          const charPx = colW * S.charSize
          p.textSize(charPx)
          p.fill(S.strokeColor)
          p.noStroke()

          for (let col = 0; col < S.columns; col++) {
            const mirroredCol = S.mirror && col >= S.columns / 2
              ? S.columns - 1 - col
              : col
            const normalizedPos = mirroredCol / (S.columns / 2)
            const phase = columnPhases[col] * Math.PI * 2
            const wave = (Math.sin(time * S.rateAmount + normalizedPos * Math.PI + phase) + 1) / 2
            const rows = Math.round(S.minRows + easeInOutCubic(wave) * (S.maxRows - S.minRows))

            const x = (col + 0.5) * colW
            const totalH = p.height

            for (let row = 0; row < rows; row++) {
              const charIndex = (col + row) % S.text.length
              const char = S.text[charIndex]
              if (char === ' ') continue
              const yNorm = (row + 0.5) / rows
              const y = yNorm * totalH
              p.text(char, x, y)
            }
          }
        }

        p.windowResized = () => {
          p.resizeCanvas(container.offsetWidth, container.offsetHeight)
          S = getConfig(container.offsetWidth)
        }
      }

      const instance = new p5(sketch)
      p5Ref.current = instance

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) instance.loop()
          else instance.noLoop()
        },
        { threshold: 0.1 }
      )
      observer.observe(container)

      cleanup = () => {
        observer.disconnect()
        instance.remove()
      }
    }

    document.fonts.ready.then(initCanvas)

    return () => cleanup?.()
  }, [])

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full"
      aria-hidden="true"
    />
  )
}
