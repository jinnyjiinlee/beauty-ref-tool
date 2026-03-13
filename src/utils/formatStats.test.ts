import { describe, it, expect } from 'vitest'
import { calcFormatStats } from './formatStats'
import type { VideoResult, FormatTag } from '../types'

function makeVideo(tag: FormatTag, viewCount: number, engagementRate: number): VideoResult {
  return {
    videoId: `v-${Math.random()}`,
    title: 'test',
    description: '',
    thumbnailUrl: '',
    channelId: 'UC1',
    channelTitle: 'ch1',
    publishedAt: '2024-01-01T00:00:00Z',
    viewCount,
    likeCount: 0,
    commentCount: 0,
    engagementRate,
    formatTag: tag,
  }
}

describe('calcFormatStats', () => {
  it('returns empty array for no videos', () => {
    expect(calcFormatStats([])).toEqual([])
  })

  it('groups by format tag', () => {
    const videos = [
      makeVideo('ASMR', 100_000, 5.0),
      makeVideo('ASMR', 200_000, 3.0),
      makeVideo('GRWM', 300_000, 4.0),
    ]
    const stats = calcFormatStats(videos)
    expect(stats).toHaveLength(2)

    const asmr = stats.find((s) => s.tag === 'ASMR')
    expect(asmr?.count).toBe(2)
    expect(asmr?.avgViewCount).toBe(150_000)
    expect(asmr?.avgEngagement).toBe(4.0)
  })

  it('sorts by count descending', () => {
    const videos = [
      makeVideo('GRWM', 100_000, 2.0),
      makeVideo('ASMR', 100_000, 2.0),
      makeVideo('ASMR', 100_000, 2.0),
    ]
    const stats = calcFormatStats(videos)
    expect(stats[0].tag).toBe('ASMR')
  })
})
