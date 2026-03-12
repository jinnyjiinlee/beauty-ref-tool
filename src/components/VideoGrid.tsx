import { useState } from 'react'
import type { VideoResult } from '../types'
import { saveReference } from '../api'
import { VideoCard } from './VideoCard'

interface VideoGridProps {
  videos: VideoResult[]
  searchKeywords: string[]
}

export function VideoGrid({ videos, searchKeywords }: VideoGridProps) {
  const [savingId, setSavingId] = useState<string | null>(null)
  const [savedIds, setSavedIds] = useState<Set<string>>(new Set())

  const handleSave = async (video: VideoResult) => {
    setSavingId(video.videoId)
    try {
      await saveReference({
        video,
        keywords: searchKeywords,
        memo: '',
      })
      setSavedIds((prev) => new Set(prev).add(video.videoId))
    } catch {
      alert('저장에 실패했습니다. 다시 시도해주세요.')
    } finally {
      setSavingId(null)
    }
  }

  if (videos.length === 0) {
    return (
      <p className="text-center text-gray-400 py-12">
        검색 결과가 없습니다.
      </p>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {videos.map((video) => (
        <VideoCard
          key={video.videoId}
          video={video}
          onSave={handleSave}
          isSaving={savingId === video.videoId || savedIds.has(video.videoId)}
        />
      ))}
    </div>
  )
}
