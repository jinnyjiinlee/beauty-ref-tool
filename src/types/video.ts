export type FormatTag = 'ASMR' | '루틴' | '리뷰' | '후킹형' | '기타'

export interface VideoResult {
  videoId: string
  title: string
  description: string
  thumbnailUrl: string
  channelTitle: string
  publishedAt: string
  viewCount: number
  likeCount: number
  commentCount: number
  engagementRate: number
  formatTag: FormatTag
}

export interface SavedReference {
  id: string
  videoId: string
  title: string
  description: string
  thumbnailUrl: string
  channelTitle: string
  publishedAt: string
  viewCount: number
  likeCount: number
  commentCount: number
  engagementRate: number
  formatTag: FormatTag
  keywords: string[]
  savedAt: string
  memo: string
}
