export type FormatTag =
  | 'ASMR'
  | 'GRWM'
  | '스킨케어루틴'
  | '제품리뷰'
  | '하울'
  | '튜토리얼'
  | '연예인'
  | 'K뷰티반응'
  | '후킹형'
  | '비포애프터'
  | '기타'

export interface VideoResult {
  videoId: string
  title: string
  description: string
  thumbnailUrl: string
  channelId: string
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
