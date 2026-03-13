import type { VideoResult, SearchStats } from '../types'

export function calcSearchStats(videos: VideoResult[]): SearchStats {
  if (videos.length === 0) {
    return { avgViewCount: 0, avgEngagement: 0, uniqueChannels: 0, totalResults: 0 }
  }

  const totalViews = videos.reduce((sum, v) => sum + v.viewCount, 0)
  const totalEngagement = videos.reduce((sum, v) => sum + v.engagementRate, 0)
  const channels = new Set(videos.map((v) => v.channelTitle))

  return {
    avgViewCount: Math.round(totalViews / videos.length),
    avgEngagement: Math.round((totalEngagement / videos.length) * 100) / 100,
    uniqueChannels: channels.size,
    totalResults: videos.length,
  }
}
