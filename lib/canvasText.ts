const SPECIAL_CHARS = [
  ...'/////----___...~~~****'.split(''),
  '!', '@', '#', '$', '%', '&', '(', ')', '+', '[', ']', '{', '}', '|', ';', ':', '?', '=', ',',
]
const ALPHA_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'.split('')

export const randomizeText = (length?: number): string => {
  const len = length ?? (4 + Math.floor(Math.random() * 6))
  return Array.from({ length: len }, () =>
    Math.random() < 0.72
      ? SPECIAL_CHARS[Math.floor(Math.random() * SPECIAL_CHARS.length)]
      : ALPHA_CHARS[Math.floor(Math.random() * ALPHA_CHARS.length)]
  ).join('')
}

export const SPACING_OPTIONS = [
  { label: 'Ease Out Quad',      fn: (t: number) => 1 - (1 - t) * (1 - t) },
  { label: 'Linear',             fn: (t: number) => t },
  { label: 'Exponential',        fn: (t: number) => Math.pow(t, 2) },
  { label: 'Logarithmic',        fn: (t: number) => t === 0 ? 0 : Math.log(1 + t * 9) / Math.log(10) },
  { label: 'Ease In Out Cubic',  fn: (t: number) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2 },
  { label: 'Sine Wave',          fn: (t: number) => Math.sin(t * Math.PI / 2) },
  { label: 'Circular In',        fn: (t: number) => 1 - Math.sqrt(1 - t * t) },
  { label: 'Circular Out',       fn: (t: number) => Math.sqrt(1 - Math.pow(t - 1, 2)) },
  { label: 'Bounce',             fn: (t: number) => { const n = 7.5625, d = 2.75; if (t < 1/d) return n*t*t; if (t < 2/d) return n*(t -= 1.5/d)*t + 0.75; if (t < 2.5/d) return n*(t -= 2.25/d)*t + 0.9375; return n*(t -= 2.625/d)*t + 0.984375 } },
  { label: 'Elastic',            fn: (t: number) => t === 0 ? 0 : t === 1 ? 1 : Math.pow(2, -10*t) * Math.sin((t*10 - 0.75) * (2*Math.PI) / 3) + 1 },
]

export interface CanvasRandomConfig {
  rateAmount: number
  flip: boolean
  columns: number
  minRows: number
  spacingFn: (t: number) => number
}

let activeText = '/././...'
let activeConfig: CanvasRandomConfig = {
  rateAmount: -2,
  flip: true,
  columns: 26,
  minRows: 1,
  spacingFn: SPACING_OPTIONS[0].fn,
}

export const getActiveText = () => activeText
export const getActiveConfig = () => activeConfig

const rndFloat = (min: number, max: number) => min + Math.random() * (max - min)
const rndInt = (min: number, max: number) => Math.floor(min + Math.random() * (max - min + 1))

const RANGES = {
  desktop: { columns: [20, 30] as const, minRows: [1, 100] as const },
  tablet:  { columns: [11, 16] as const, minRows: [1, 70]  as const },
  mobile:  { columns: [5,  9]  as const, minRows: [1, 40]  as const },
}

const getBreakpoint = () => {
  if (typeof window === 'undefined') return 'desktop' as const
  if (window.innerWidth < 640) return 'mobile' as const
  if (window.innerWidth < 1024) return 'tablet' as const
  return 'desktop' as const
}

export const dispatchRandomize = () => {
  activeText = randomizeText()
  const r = RANGES[getBreakpoint()]
  activeConfig = {
    rateAmount: parseFloat(rndFloat(-2, 2).toFixed(2)),
    flip: Math.random() < 0.5,
    columns: rndInt(r.columns[0], r.columns[1]),
    minRows: rndInt(r.minRows[0], r.minRows[1]),
    spacingFn: SPACING_OPTIONS[rndInt(0, SPACING_OPTIONS.length - 1)].fn,
  }
}
