import type { VideoResult, SortKey } from '../types'

export function sortVideos(videos: VideoResult[], key: SortKey): VideoResult[] {
  const sorted = [...videos]
  sorted.sort((a, b) => {
    if (key === 'publishedAt') {
      return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    }
    return b[key] - a[key]
  })
  return sorted
}
