import { useState, useCallback, useEffect } from 'react'
import type { SavedChannel } from '../types'
import { fetchChannels, saveChannel, deleteChannel } from '../api'

interface UseChannelsReturn {
  channels: SavedChannel[]
  isLoading: boolean
  error: string | null
  add: (channelId: string, channelTitle: string) => Promise<void>
  remove: (id: string) => Promise<void>
  refresh: () => Promise<void>
}

export function useChannels(): UseChannelsReturn {
  const [channels, setChannels] = useState<SavedChannel[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const refresh = useCallback(async () => {
    setIsLoading(true)
    try {
      const data = await fetchChannels()
      setChannels(data)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : '채널 목록 조회 실패')
    } finally {
      setIsLoading(false)
    }
  }, [])

  const add = useCallback(async (channelId: string, channelTitle: string) => {
    await saveChannel(channelId, channelTitle)
    await refresh()
  }, [refresh])

  const remove = useCallback(async (id: string) => {
    await deleteChannel(id)
    await refresh()
  }, [refresh])

  useEffect(() => { void refresh() }, [refresh])

  return { channels, isLoading, error, add, remove, refresh }
}
