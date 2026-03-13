export interface SearchFilters {
  keywords: string[]
  minViewCount: number
  publishedAfter: string
  publishedBefore: string
  regionCode: string
  relevanceLanguage: string
  channelId?: string
}

export interface SavedChannel {
  id: string
  channelId: string
  channelTitle: string
  savedAt: string
}

export interface KeywordCategory {
  label: string
  keywords: string[]
}

export interface ViewCountPreset {
  label: string
  value: number
}

export interface PeriodPreset {
  label: string
  months: number
}

export interface CountryOption {
  code: string
  label: string
  language: string
  flag: string
  defaultMinViewCount: number
}

export interface FormatStat {
  tag: string
  count: number
  avgViewCount: number
  avgEngagement: number
}

export interface ChannelRank {
  channelId: string
  channelTitle: string
  videoCount: number
  avgViewCount: number
  avgEngagement: number
  totalViews: number
}

export type SortKey = 'viewCount' | 'likeCount' | 'commentCount' | 'engagementRate' | 'publishedAt'

export interface SearchStats {
  avgViewCount: number
  avgEngagement: number
  uniqueChannels: number
  totalResults: number
}
