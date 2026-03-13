import { useState } from 'react'
import type { VideoResult } from '../types'
import { saveReference } from '../api'
import { VideoCard } from './VideoCard'
import { VideoListItem } from './VideoListItem'
import { SkeletonCard } from './SkeletonCard'
import { EmptyState } from './EmptyState'

type ViewMode = 'grid' | 'list'

interface VideoGridProps {
  videos: VideoResult[]
  searchKeywords: string[]
  isLoading?: boolean
  viewMode?: ViewMode
  onChannelClick?: (channelId: string, channelTitle: string) => void
  hasSearched?: boolean
}

export function VideoGrid({ videos, searchKeywords, isLoading, viewMode = 'grid', onChannelClick, hasSearched }: VideoGridProps) {
  const [savingId, setSavingId] = useState<string | null>(null)
  const [savedIds, setSavedIds] = useState<Set<string>>(new Set())

  const handleSave = async (video: VideoResult): Promise<void> => {
    setSavingId(video.videoId)
    try {
      await saveReference({ video, keywords: searchKeywords, memo: '' })
      setSavedIds((prev) => new Set(prev).add(video.videoId))
    } catch {
      alert('저장에 실패했습니다. 다시 시도해주세요.')
    } finally {
      setSavingId(null)
    }
  }

  if (isLoading) {
    return (
      <div className="space-y-4">
        <p className="text-sm text-subtle animate-pulse">검색 중...</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </div>
    )
  }

  if (videos.length === 0) {
    return <EmptyState hasSearched={hasSearched} />
  }

  if (viewMode === 'list') {
    return (
      <div className="flex flex-col gap-3">
        {videos.map((video, i) => (
          <div key={video.videoId} className="animate-fade-in" style={{ animationDelay: `${i * 30}ms` }}>
            <VideoListItem
              video={video}
              onSave={handleSave}
              isSaving={savingId === video.videoId || savedIds.has(video.videoId)}
              onChannelClick={onChannelClick}
            />
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {videos.map((video, i) => (
        <div key={video.videoId} className="animate-fade-in" style={{ animationDelay: `${i * 50}ms` }}>
          <VideoCard
            video={video}
            onSave={handleSave}
            isSaving={savingId === video.videoId || savedIds.has(video.videoId)}
            onChannelClick={onChannelClick}
          />
        </div>
      ))}
    </div>
  )
}
