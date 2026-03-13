import { describe, it, expect } from 'vitest'
import { calcSearchStats } from './stats'
import type { VideoResult } from '../types'

const makeVideo = (overrides: Partial<VideoResult> = {}): VideoResult => ({
  videoId: 'v1',
  title: 'test',
  description: '',
  thumbnailUrl: '',
  channelId: 'UC1',
  channelTitle: 'ch1',
  publishedAt: '2025-01-01T00:00:00Z',
  viewCount: 100000,
  likeCount: 5000,
  commentCount: 500,
  engagementRate: 5.5,
  formatTag: '기타',
  ...overrides,
})

describe('calcSearchStats', () => {
  it('returns zeros for empty array', () => {
    const stats = calcSearchStats([])
    expect(stats).toEqual({ avgViewCount: 0, avgEngagement: 0, uniqueChannels: 0, totalResults: 0 })
  })

  it('calculates stats for single video', () => {
    const stats = calcSearchStats([makeVideo()])
    expect(stats.avgViewCount).toBe(100000)
    expect(stats.avgEngagement).toBe(5.5)
    expect(stats.uniqueChannels).toBe(1)
    expect(stats.totalResults).toBe(1)
  })

  it('calculates averages for multiple videos', () => {
    const videos = [
      makeVideo({ viewCount: 200000, engagementRate: 4.0, channelTitle: 'A' }),
      makeVideo({ videoId: 'v2', viewCount: 100000, engagementRate: 6.0, channelTitle: 'B' }),
    ]
    const stats = calcSearchStats(videos)
    expect(stats.avgViewCount).toBe(150000)
    expect(stats.avgEngagement).toBe(5)
    expect(stats.uniqueChannels).toBe(2)
    expect(stats.totalResults).toBe(2)
  })

  it('counts unique channels correctly', () => {
    const videos = [
      makeVideo({ channelTitle: 'A' }),
      makeVideo({ videoId: 'v2', channelTitle: 'A' }),
      makeVideo({ videoId: 'v3', channelTitle: 'B' }),
    ]
    expect(calcSearchStats(videos).uniqueChannels).toBe(2)
  })
})
