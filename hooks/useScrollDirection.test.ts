import { describe, it, expect, beforeEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useScrollDirection } from './useScrollDirection'

describe('useScrollDirection', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'scrollY', { writable: true, value: 0 })
  })

  it('returns "up" initially', () => {
    const { result } = renderHook(() => useScrollDirection())
    expect(result.current).toBe('up')
  })

  it('returns "down" when scrolled down past threshold', () => {
    const { result } = renderHook(() => useScrollDirection())
    act(() => {
      Object.defineProperty(window, 'scrollY', { writable: true, value: 200 })
      window.dispatchEvent(new Event('scroll'))
    })
    expect(result.current).toBe('down')
  })

  it('returns "up" when scrolled back up', () => {
    const { result } = renderHook(() => useScrollDirection())
    act(() => {
      Object.defineProperty(window, 'scrollY', { writable: true, value: 200 })
      window.dispatchEvent(new Event('scroll'))
    })
    act(() => {
      Object.defineProperty(window, 'scrollY', { writable: true, value: 50 })
      window.dispatchEvent(new Event('scroll'))
    })
    expect(result.current).toBe('up')
  })
})
