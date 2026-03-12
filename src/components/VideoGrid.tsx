import { useState } from 'react'
import type { VideoResult } from '../types'
import { saveReference } from '../api'
import { VideoCard } from './VideoCard'
import { SkeletonCard } from './SkeletonCard'

interface VideoGridProps {
  videos: VideoResult[]
  searchKeywords: string[]
  isLoading?: boolean
}

export function VideoGrid({ videos, searchKeywords, isLoading }: VideoGridProps) {
  const [savingId, setSavingId] = useState<string | null>(null)
  const [savedIds, setSavedIds] = useState<Set<string>>(new Set())

  const handleSave = async (video: VideoResult) => {
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    )
  }

  if (videos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="w-16 h-16 rounded-2xl bg-dark-700 flex items-center justify-center mb-4">
          <span className="text-2xl">Q</span>
        </div>
        <p className="text-subtle text-sm">
          키워드를 입력하고 숏폼을 검색해보세요
        </p>
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
          />
        </div>
      ))}
    </div>
  )
}
