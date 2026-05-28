'use client'
import { useEffect, useRef } from 'react'
import type p5Type from 'p5'

interface Config {
  circles: number
  innerRadius: number
  charSize: number
  circleSpace: number
  scale: number
  maxWords: number
}

// Left sidebar on desktop — large canvas (~1000px), many rings
const DESKTOP_CONFIG: Config = {
  circles: 12,
  innerRadius: 0.19,
  charSize: 1.3,
  circleSpace: 7,
  scale: 0.8,
  maxWords: 20,
}

// Floating background on tablet (768–1023px)
const TABLET_CONFIG: Config = {
  circles: 8,
  innerRadius: 0.22,
  charSize: 2,
  circleSpace: 35,
  scale: 0.92,
  maxWords: 16,
}

// Floating background on phone (<768px)
const MOBILE_CONFIG: Config = {
  circles: 6,
  innerRadius: 0.3,
  charSize: 2,
  circleSpace: 16,
  scale: 0.88,
  maxWords: 12,
}

const SHARED = {
  text: '/././...',
  rotation: 0.004,
  alternate: false,
  randomOffset: 0.29,
  randomDelay: 0.38,
  animSpeed: 0.011,
  sequenceCustom: '1-2-3-4-5',
  sequenceReverseRepeat: true,
  color: '#00e5c8',
}

function seededRandom(seed: number) {
  const x = Math.sin(seed * 12.9898 + 78.233) * 43758.5453
  return x - Math.floor(x)
}

const easingFn = (e: number) =>
  e === 0 ? 0 : e === 1 ? 1 : e < 0.5
    ? Math.pow(2, 20 * e - 10) / 2
    : (2 - Math.pow(2, -20 * e + 10)) / 2

interface Props {
  size: number
  variant?: 'desktop' | 'tablet' | 'mobile'
  className?: string
}

export function CircleCanvas({ size, variant = 'desktop', className }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const sketchRef = useRef<p5Type | null>(null)
  useEffect(() => {
    if (!containerRef.current) return
    let destroyed = false

    const fontVar = getComputedStyle(document.documentElement)
      .getPropertyValue('--font-geist-mono').trim()
    const fontFamily = fontVar || 'monospace'

    const cfg = variant === 'mobile' ? MOBILE_CONFIG : variant === 'tablet' ? TABLET_CONFIG : DESKTOP_CONFIG
    const sequence = SHARED.sequenceCustom.split('-').map(s => Math.max(1, parseInt(s) || 1))
    const seqLen = sequence.length

    function getWordCount(idx: number) {
      const rep = Math.floor(idx / seqLen)
      const pos = idx % seqLen
      const i = SHARED.sequenceReverseRepeat && rep % 2 === 1 ? seqLen - 1 - pos : pos
      return Math.min(Math.max(1, sequence[i]), cfg.maxWords)
    }

    import('p5').then(({ default: P5 }) => {
      if (destroyed || !containerRef.current) return

    const sketch = new P5((p: p5Type) => {
      let time = 0
      let rotAngle = 0

      p.setup = () => {
        p.createCanvas(size, size)
        p.noStroke()
      }

      p.draw = () => {
        p.clear()

        const text = SHARED.text
        const textLen = text.length
        if (textLen < 1) return

        const cx = size / 2, cy = size / 2
        const maxR = (size / 2) * cfg.scale
        const minR = maxR * cfg.innerRadius
        const totalSpace = (cfg.circles - 1) * cfg.circleSpace
        const ringThickness = (maxR - minR - totalSpace) / cfg.circles
        const fontSize = ringThickness * cfg.charSize * 0.7
        const dpr = p.pixelDensity()
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const ctx = (p as any).drawingContext as CanvasRenderingContext2D

        ctx.save()
        ctx.font = `normal ${fontSize}px ${fontFamily}`
        ctx.textBaseline = 'middle'
        ctx.textAlign = 'center'
        ctx.fillStyle = SHARED.color

        for (let ci = cfg.circles - 1; ci >= 0; ci--) {
          const radius = minR + (ci + 1) * ringThickness + ci * cfg.circleSpace
          const rotDir = SHARED.alternate && ci % 2 === 1 ? -1 : 1
          const angleOffset = SHARED.randomOffset * seededRandom(ci + 42) * Math.PI * 2
          const timeDelay = SHARED.randomDelay * seededRandom(ci + 137) * Math.PI * 2
          const wordCount = getWordCount(ci)

          let wordAngW = 0
          const charAWs: number[] = []
          for (let i = 0; i < textLen; i++) {
            const aw = ctx.measureText(text[i]).width / radius
            charAWs.push(aw)
            wordAngW += aw
          }

          const spaceAW = ctx.measureText(' ').width / radius
          const totalAngW = wordAngW * wordCount + spaceAW * (wordCount - 1)
          const sine = (Math.sin(time + timeDelay) + 1) / 2
          const eased = easingFn(sine)
          const fullCircle = Math.PI * 2
          const targetAngle = totalAngW + eased * (fullCircle - totalAngW)
          const totalChars = textLen * wordCount + (wordCount - 1)
          const extra = (targetAngle - totalAngW) / totalChars
          const startAngle = -Math.PI / 2 + rotAngle * rotDir - targetAngle / 2 + angleOffset

          const chars: { char: string; aw: number }[] = []
          for (let wi = 0; wi < wordCount; wi++) {
            for (let chi = 0; chi < textLen; chi++) {
              chars.push({ char: text[chi], aw: charAWs[chi] })
            }
            if (wi < wordCount - 1) chars.push({ char: ' ', aw: spaceAW })
          }

          let angle = startAngle
          for (let j = 0; j < chars.length; j++) {
            const { char, aw } = chars[j]
            if (char !== ' ') {
              const x = cx + Math.cos(angle) * radius
              const y = cy + Math.sin(angle) * radius
              const ca = angle + Math.PI / 2
              const cosA = Math.cos(ca), sinA = Math.sin(ca)
              ctx.setTransform(cosA * dpr, sinA * dpr, -sinA * dpr, cosA * dpr, x * dpr, y * dpr)
              ctx.fillText(char, 0, 0)
            }
            angle += aw
            if (j < chars.length - 1) angle += extra
          }
        }

        ctx.restore()
        rotAngle += SHARED.rotation * p.deltaTime * 0.06
        time += SHARED.animSpeed * p.deltaTime * 0.06
      }
    }, containerRef.current)

      sketchRef.current = sketch
    })

    return () => {
      destroyed = true
      sketchRef.current?.remove()
      sketchRef.current = null
    }
  }, [size, variant])

  return <div ref={containerRef} className={className} style={{ width: size, height: size }} />
}
