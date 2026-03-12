import { useState, useCallback, useEffect } from 'react'
import type { SavedReference, FormatTag } from '../types'
import { fetchReferences, deleteReference } from '../api'

interface UseReferencesReturn {
  references: SavedReference[]
  isLoading: boolean
  error: string | null
  refresh: () => Promise<void>
  remove: (id: string) => Promise<void>
  filterByTag: (tag: FormatTag | null) => void
  activeTag: FormatTag | null
}

export function useReferences(): UseReferencesReturn {
  const [references, setReferences] = useState<SavedReference[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [activeTag, setActiveTag] = useState<FormatTag | null>(null)

  const refresh = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      const data = await fetchReferences({
        formatTag: activeTag ?? undefined,
      })
      setReferences(data)
    } catch (err) {
      const message =
        err instanceof Error ? err.message : '목록 조회 중 오류가 발생했습니다'
      setError(message)
    } finally {
      setIsLoading(false)
    }
  }, [activeTag])

  const remove = useCallback(
    async (id: string) => {
      try {
        await deleteReference(id)
        await refresh()
      } catch (err) {
        const message =
          err instanceof Error ? err.message : '삭제 중 오류가 발생했습니다'
        setError(message)
      }
    },
    [refresh],
  )

  const filterByTag = useCallback((tag: FormatTag | null) => {
    setActiveTag(tag)
  }, [])

  useEffect(() => {
    void refresh()
  }, [refresh])

  return { references, isLoading, error, refresh, remove, filterByTag, activeTag }
}
