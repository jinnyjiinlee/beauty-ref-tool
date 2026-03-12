import { describe, it, expect } from 'vitest'
import { calcEngagementRate } from './engagement'

describe('calcEngagementRate', () => {
  it('참여율을 올바르게 계산한다', () => {
    const rate = calcEngagementRate(1000, 200, 100000)
    expect(rate).toBeCloseTo(1.2)
  })

  it('조회수가 0이면 0을 반환한다', () => {
    expect(calcEngagementRate(100, 50, 0)).toBe(0)
  })

  it('좋아요/댓글이 0이면 0을 반환한다', () => {
    expect(calcEngagementRate(0, 0, 100000)).toBe(0)
  })
})
