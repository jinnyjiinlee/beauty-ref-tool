import { supabase } from './supabaseClient'
import type { VideoResult, SavedReference, FormatTag } from '../types'

interface SavePayload {
  video: VideoResult
  keywords: string[]
  memo: string
}

export async function saveReference(payload: SavePayload): Promise<void> {
  const { video, keywords, memo } = payload

  const { error } = await supabase.from('saved_references').upsert(
    {
      video_id: video.videoId,
      title: video.title,
      description: video.description,
      thumbnail_url: video.thumbnailUrl,
      channel_title: video.channelTitle,
      published_at: video.publishedAt,
      view_count: video.viewCount,
      like_count: video.likeCount,
      comment_count: video.commentCount,
      engagement_rate: video.engagementRate,
      format_tag: video.formatTag,
      keywords,
      memo,
    },
    { onConflict: 'video_id' },
  )

  if (error) {
    throw new Error(`저장 중 오류가 발생했습니다: ${error.message}`)
  }
}

interface FetchOptions {
  formatTag?: FormatTag
  minViewCount?: number
  sortBy?: 'saved_at' | 'view_count' | 'engagement_rate'
}

export async function fetchReferences(
  options: FetchOptions = {},
): Promise<SavedReference[]> {
  const { formatTag, minViewCount, sortBy = 'saved_at' } = options

  let query = supabase.from('saved_references').select('*')

  if (formatTag) {
    query = query.eq('format_tag', formatTag)
  }
  if (minViewCount) {
    query = query.gte('view_count', minViewCount)
  }

  query = query.order(sortBy, { ascending: false })

  const { data, error } = await query

  if (error) {
    throw new Error(`목록 조회 중 오류가 발생했습니다: ${error.message}`)
  }

  return (data ?? []).map(toSavedReference)
}

function toSavedReference(row: Record<string, unknown>): SavedReference {
  return {
    id: row.id as string,
    videoId: row.video_id as string,
    title: row.title as string,
    description: row.description as string,
    thumbnailUrl: row.thumbnail_url as string,
    channelTitle: row.channel_title as string,
    publishedAt: row.published_at as string,
    viewCount: row.view_count as number,
    likeCount: row.like_count as number,
    commentCount: row.comment_count as number,
    engagementRate: row.engagement_rate as number,
    formatTag: row.format_tag as FormatTag,
    keywords: row.keywords as string[],
    savedAt: row.saved_at as string,
    memo: (row.memo as string) ?? '',
  }
}

export async function deleteReference(id: string): Promise<void> {
  const { error } = await supabase
    .from('saved_references')
    .delete()
    .eq('id', id)

  if (error) {
    throw new Error(`삭제 중 오류가 발생했습니다: ${error.message}`)
  }
}
