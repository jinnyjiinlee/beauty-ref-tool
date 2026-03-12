import { describe, it, expect } from 'vitest'
import { formatDate, formatViewCount, getDateMonthsAgo } from './date'

describe('formatDate', () => {
  it('ISO 문자열을 한국 날짜로 변환한다', () => {
    const result = formatDate('2024-06-15T00:00:00Z')
    expect(result).toContain('2024')
    expect(result).toContain('06')
    expect(result).toContain('15')
  })
})

describe('formatViewCount', () => {
  it('100만 이상은 M으로 표시한다', () => {
    expect(formatViewCount(1_500_000)).toBe('1.5M')
  })

  it('1000 이상은 K로 표시한다', () => {
    expect(formatViewCount(45_000)).toBe('45.0K')
  })

  it('1000 미만은 그대로 표시한다', () => {
    expect(formatViewCount(999)).toBe('999')
  })
})

describe('getDateMonthsAgo', () => {
  it('과거 날짜의 ISO 문자열을 반환한다', () => {
    const result = getDateMonthsAgo(6)
    const date = new Date(result)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMonths = diffMs / (1000 * 60 * 60 * 24 * 30)
    expect(diffMonths).toBeGreaterThan(5)
    expect(diffMonths).toBeLessThan(7)
  })
})
