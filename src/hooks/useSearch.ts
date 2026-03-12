import { useState, useCallback } from 'react'
import type { VideoResult, SearchFilters } from '../types'
import { searchVideos } from '../api'

interface UseSearchReturn {
  results: VideoResult[]
  isLoading: boolean
  error: string | null
  search: (filters: SearchFilters) => Promise<void>
  clearResults: () => void
}

export function useSearch(): UseSearchReturn {
  const [results, setResults] = useState<VideoResult[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const search = useCallback(async (filters: SearchFilters) => {
    setIsLoading(true)
    setError(null)
    try {
      const data = await searchVideos(filters)
      setResults(data)
    } catch (err) {
      const message =
        err instanceof Error ? err.message : '검색 중 오류가 발생했습니다'
      setError(message)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const clearResults = useCallback(() => {
    setResults([])
    setError(null)
  }, [])

  return { results, isLoading, error, search, clearResults }
}
