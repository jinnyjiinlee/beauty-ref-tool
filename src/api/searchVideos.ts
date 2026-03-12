import { supabase } from './supabaseClient'
import type { VideoResult, SearchFilters } from '../types'

interface EdgeFunctionResponse {
  results: VideoResult[]
  error?: string
}

export async function searchVideos(
  filters: SearchFilters,
): Promise<VideoResult[]> {
  const { data, error } = await supabase.functions.invoke<EdgeFunctionResponse>(
    'youtube-search',
    {
      body: {
        keywords: filters.keywords,
        minViewCount: filters.minViewCount,
        publishedAfter: filters.publishedAfter,
        publishedBefore: filters.publishedBefore,
      },
    },
  )

  if (error) {
    throw new Error(`검색 중 오류가 발생했습니다: ${error.message}`)
  }

  if (data?.error) {
    throw new Error(data.error)
  }

  return data?.results ?? []
}
