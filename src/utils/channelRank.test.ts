import { describe, it, expect } from 'vitest'
import { calcChannelRanking } from './channelRank'
import type { VideoResult } from '../types'

function makeVideo(channelId: string, channelTitle: string, viewCount: number, engagementRate: number): VideoResult {
  return {
    videoId: `v-${Math.random()}`,
    title: 'test',
    description: '',
    thumbnailUrl: '',
    channelId,
    channelTitle,
    publishedAt: '2024-01-01T00:00:00Z',
    viewCount,
    likeCount: 0,
    commentCount: 0,
    engagementRate,
    formatTag: '기타',
  }
}

describe('calcChannelRanking', () => {
  it('returns empty array for no videos', () => {
    expect(calcChannelRanking([])).toEqual([])
  })

  it('ranks channels by avg view count', () => {
    const videos = [
      makeVideo('UC1', 'ChA', 500_000, 3.0),
      makeVideo('UC1', 'ChA', 300_000, 5.0),
      makeVideo('UC2', 'ChB', 1_000_000, 2.0),
    ]
    const ranking = calcChannelRanking(videos)
    expect(ranking[0].channelId).toBe('UC2')
    expect(ranking[0].avgViewCount).toBe(1_000_000)
    expect(ranking[1].channelId).toBe('UC1')
    expect(ranking[1].videoCount).toBe(2)
  })

  it('respects limit parameter', () => {
    const videos = [
      makeVideo('UC1', 'A', 100, 1),
      makeVideo('UC2', 'B', 200, 1),
      makeVideo('UC3', 'C', 300, 1),
    ]
    const ranking = calcChannelRanking(videos, 2)
    expect(ranking).toHaveLength(2)
  })
})
