'use client'
import { useEffect, useRef } from 'react'
import type p5Type from 'p5'

interface Config {
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

const DESKTOP: Config = {
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

const TABLET: Config = { ...DESKTOP, columns: 14, maxRows: 25 }
const MOBILE: Config = { ...DESKTOP, columns: 8, maxRows: 18 }

function getConfig(width: number): Config {
  if (width < 640) return MOBILE
  if (width < 1024) return TABLET
  return DESKTOP
}

// Easing + phase distribution functions ported from Senvo production canvas
const easingFn = (e: number) =>
  e < 0.5 ? 4 * e * e * e : 1 - Math.pow(-2 * e + 2, 3) / 2

// Logarithmic rate — gives gentle phase spread across columns
const rateFn = (e: number) =>
  e === 0 ? 0 : Math.log(1 + e * 9) / Math.log(10)

// easeOutQuad spacing — characters gather toward top of each column
const spacingFn = (e: number) => 1 - (1 - e) * (1 - e)

interface Glyph {
  source: HTMLCanvasElement | ImageBitmap
  w: number
  h: number
}

function computePhaseOffsets(cfg: Config): number[] {
  const total = cfg.mirror ? cfg.columns * 2 - 1 : cfg.columns
  return Array.from({ length: total }, (_, i) => {
    const ri = cfg.mirror && i >= cfg.columns ? 2 * (cfg.columns - 1) - i : i
    const norm = cfg.columns > 1 ? ri / (cfg.columns - 1) : 0
    return rateFn(cfg.flip ? 1 - norm : norm) * cfg.rateAmount * Math.PI * 2
  })
}

function buildGlyphCache(
  text: string,
  fontSize: number,
  strokeColor: string,
  dpr: number
): { cache: Record<string, Glyph | null>; pad: number } {
  const pad = Math.ceil(fontSize * 0.3)
  const cssW = Math.ceil(fontSize * 2 + pad * 2)
  const cssH = Math.ceil(fontSize * 1.4 + pad * 2)
  const cache: Record<string, Glyph | null> = {}
  const seen = new Set<string>()

  for (const ch of text) {
    if (ch === ' ') { cache[ch] = null; continue }
    if (seen.has(ch)) continue
    seen.add(ch)

    const off = document.createElement('canvas')
    off.width = Math.ceil(cssW * dpr)
    off.height = Math.ceil(cssH * dpr)
    const ctx = off.getContext('2d')!
    ctx.scale(dpr, dpr)
    ctx.font = `normal ${fontSize}px "Geist", Arial, sans-serif`
    ctx.textBaseline = 'top'
    ctx.textAlign = 'center'
    ctx.fillStyle = strokeColor
    ctx.fillText(ch, cssW / 2, pad)

    const glyph: Glyph = { source: off, w: cssW, h: cssH }
    cache[ch] = glyph

    if (typeof createImageBitmap !== 'undefined') {
      createImageBitmap(off).then((bm) => { glyph.source = bm })
    }
  }

  return { cache, pad }
}

export function GenerativeCanvas() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    let destroyed = false
    let p5Instance: p5Type | null = null
    let intersectionObserver: IntersectionObserver | null = null

    const init = async () => {
      const p5 = (await import('p5')).default
      if (destroyed) return

      const sketch = (p: p5Type) => {
        let time = 0
        let S = getConfig(container.offsetWidth)
        let totalCols = S.mirror ? S.columns * 2 - 1 : S.columns
        let phaseOffsets = computePhaseOffsets(S)
        let glyphCache: Record<string, Glyph | null> = {}
        let cachedFontSize = -1
        let cachedDPR = -1
        let glyphPad = 0

        p.setup = () => {
          const canvas = p.createCanvas(container.offsetWidth, container.offsetHeight)
          canvas.parent(container)
          if (canvas.elt) {
            canvas.elt.style.position = 'absolute'
            canvas.elt.style.inset = '0'
            canvas.elt.style.display = 'block'
          }
          p.noStroke()
        }

        p.draw = () => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const ctx2d = (p as any).drawingContext as CanvasRenderingContext2D
          const dpr = p.pixelDensity()
          const w = p.width
          const h = p.height

          ctx2d.fillStyle = S.bgColor
          ctx2d.fillRect(0, 0, w, h)

          const colWidth = (w - (totalCols - 1) * S.columnSpace) / totalCols
          const fontSize = colWidth * S.charSize * 0.8
          if (fontSize <= 0) return

          if (Math.abs(fontSize - cachedFontSize) >= 0.5 || dpr !== cachedDPR) {
            const built = buildGlyphCache(S.text, fontSize, S.strokeColor, dpr)
            glyphCache = built.cache
            glyphPad = built.pad
            cachedFontSize = fontSize
            cachedDPR = dpr
          }

          const availH = h - fontSize
          const margin = fontSize + glyphPad

          for (let col = 0; col < totalCols; col++) {
            const colX = col * (colWidth + S.columnSpace) + colWidth / 2
            if (colX < -margin || colX > w + margin) continue

            const sineVal = (Math.sin(time + phaseOffsets[col]) + 1) / 2
            const animRows = S.minRows + easingFn(sineVal) * (S.maxRows - S.minRows)
            const wholeRows = Math.floor(animRows)
            const frac = animRows - wholeRows

            for (let row = 0; row <= wholeRows; row++) {
              const t = animRows > 1 ? row / (animRows - 1) : 0
              let y = spacingFn(Math.min(t, 1)) * availH

              // Blend in the fractional last row smoothly
              if (row === wholeRows && frac < 1) {
                const offY = h + fontSize
                y = offY + (y - offY) * frac
              }

              if (y < -margin || y > h + margin) continue

              const ch = S.text[row % S.text.length]
              const glyph = glyphCache[ch]
              if (!glyph) continue

              ctx2d.drawImage(glyph.source, colX - glyph.w / 2, y - glyphPad, glyph.w, glyph.h)
            }
          }

          time += S.speed * (p.deltaTime * 0.06)
        }

        p.windowResized = () => {
          p.resizeCanvas(container.offsetWidth, container.offsetHeight)
          S = getConfig(container.offsetWidth)
          totalCols = S.mirror ? S.columns * 2 - 1 : S.columns
          phaseOffsets = computePhaseOffsets(S)
          cachedFontSize = -1
        }
      }

      p5Instance = new p5(sketch, container)

      intersectionObserver = new IntersectionObserver(
        ([entry]) => {
          if (!p5Instance) return
          if (entry.isIntersecting) p5Instance.loop()
          else p5Instance.noLoop()
        },
        { threshold: 0.1 }
      )
      intersectionObserver.observe(container)
    }

    document.fonts.ready.then(init)

    return () => {
      destroyed = true
      intersectionObserver?.disconnect()
      p5Instance?.remove()
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full"
      aria-hidden="true"
    />
  )
}
