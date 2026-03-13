import type { VideoResult, ChannelRank } from '../types'

export function calcChannelRanking(videos: VideoResult[], limit: number = 10): ChannelRank[] {
  const map = new Map<string, { title: string; views: number; engagement: number; count: number }>()

  for (const v of videos) {
    const entry = map.get(v.channelId) ?? { title: v.channelTitle, views: 0, engagement: 0, count: 0 }
    entry.views += v.viewCount
    entry.engagement += v.engagementRate
    entry.count += 1
    map.set(v.channelId, entry)
  }

  return Array.from(map.entries())
    .map(([channelId, d]) => ({
      channelId,
      channelTitle: d.title,
      videoCount: d.count,
      avgViewCount: Math.round(d.views / d.count),
      avgEngagement: Math.round((d.engagement / d.count) * 100) / 100,
      totalViews: d.views,
    }))
    .sort((a, b) => b.avgViewCount - a.avgViewCount)
    .slice(0, limit)
}
