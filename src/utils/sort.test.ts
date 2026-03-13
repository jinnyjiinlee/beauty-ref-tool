import { describe, it, expect } from 'vitest'
import { sortVideos } from './sort'
import type { VideoResult } from '../types'

const makeVideo = (overrides: Partial<VideoResult> = {}): VideoResult => ({
  videoId: 'v1',
  title: 'test',
  description: '',
  thumbnailUrl: '',
  channelId: 'UC1',
  channelTitle: 'ch1',
  publishedAt: '2025-06-01T00:00:00Z',
  viewCount: 100000,
  likeCount: 5000,
  commentCount: 500,
  engagementRate: 5.0,
  formatTag: '기타',
  ...overrides,
})

describe('sortVideos', () => {
  it('returns empty array for empty input', () => {
    expect(sortVideos([], 'viewCount')).toEqual([])
  })

  it('sorts by viewCount descending', () => {
    const videos = [
      makeVideo({ videoId: 'a', viewCount: 100 }),
      makeVideo({ videoId: 'b', viewCount: 300 }),
      makeVideo({ videoId: 'c', viewCount: 200 }),
    ]
    const sorted = sortVideos(videos, 'viewCount')
    expect(sorted.map((v) => v.videoId)).toEqual(['b', 'c', 'a'])
  })

  it('sorts by engagementRate descending', () => {
    const videos = [
      makeVideo({ videoId: 'a', engagementRate: 2.0 }),
      makeVideo({ videoId: 'b', engagementRate: 8.0 }),
      makeVideo({ videoId: 'c', engagementRate: 5.0 }),
    ]
    const sorted = sortVideos(videos, 'engagementRate')
    expect(sorted.map((v) => v.videoId)).toEqual(['b', 'c', 'a'])
  })

  it('sorts by publishedAt descending (newest first)', () => {
    const videos = [
      makeVideo({ videoId: 'a', publishedAt: '2024-01-01T00:00:00Z' }),
      makeVideo({ videoId: 'b', publishedAt: '2025-06-01T00:00:00Z' }),
      makeVideo({ videoId: 'c', publishedAt: '2025-01-01T00:00:00Z' }),
    ]
    const sorted = sortVideos(videos, 'publishedAt')
    expect(sorted.map((v) => v.videoId)).toEqual(['b', 'c', 'a'])
  })

  it('does not mutate the original array', () => {
    const videos = [
      makeVideo({ videoId: 'a', viewCount: 100 }),
      makeVideo({ videoId: 'b', viewCount: 300 }),
    ]
    sortVideos(videos, 'viewCount')
    expect(videos[0].videoId).toBe('a')
  })
})
