import type { SortKey } from '../types'

export const SORT_OPTIONS: { label: string; value: SortKey }[] = [
  { label: '조회수순', value: 'viewCount' },
  { label: '좋아요순', value: 'likeCount' },
  { label: '댓글순', value: 'commentCount' },
  { label: '참여율순', value: 'engagementRate' },
  { label: '최신순', value: 'publishedAt' },
]

export const DEFAULT_SORT: SortKey = 'viewCount'
