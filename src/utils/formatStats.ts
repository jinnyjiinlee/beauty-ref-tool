import type { VideoResult, FormatStat } from '../types'

export function calcFormatStats(videos: VideoResult[]): FormatStat[] {
  const map = new Map<string, { views: number; engagement: number; count: number }>()

  for (const v of videos) {
    const entry = map.get(v.formatTag) ?? { views: 0, engagement: 0, count: 0 }
    entry.views += v.viewCount
    entry.engagement += v.engagementRate
    entry.count += 1
    map.set(v.formatTag, entry)
  }

  return Array.from(map.entries())
    .map(([tag, d]) => ({
      tag,
      count: d.count,
      avgViewCount: Math.round(d.views / d.count),
      avgEngagement: Math.round((d.engagement / d.count) * 100) / 100,
    }))
    .sort((a, b) => b.count - a.count)
}
