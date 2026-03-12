import type { VideoResult } from '../types'
import { formatViewCount, formatDate } from '../utils'
import { cn } from '../utils/cn'
import { FormatBadge } from './FormatBadge'

interface VideoCardProps {
  video: VideoResult
  onSave: (video: VideoResult) => void
  isSaving: boolean
}

export function VideoCard({ video, onSave, isSaving }: VideoCardProps) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
      <a
        href={`https://youtube.com/watch?v=${video.videoId}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          src={video.thumbnailUrl}
          alt={video.title}
          className="w-full aspect-video object-cover"
        />
      </a>

      <div className="p-4 space-y-2">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-sm font-semibold line-clamp-2 flex-1">
            {video.title}
          </h3>
          <FormatBadge tag={video.formatTag} />
        </div>

        <p className="text-xs text-gray-500">{video.channelTitle}</p>

        <div className="flex items-center gap-3 text-xs text-gray-600">
          <span>조회수 {formatViewCount(video.viewCount)}</span>
          <span>참여율 {video.engagementRate.toFixed(2)}%</span>
          <span>{formatDate(video.publishedAt)}</span>
        </div>

        <button
          onClick={() => onSave(video)}
          disabled={isSaving}
          className={cn(
            'mt-2 w-full rounded-lg bg-pink-50 px-4 py-2 text-sm',
            'font-medium text-pink-600 hover:bg-pink-100',
            'disabled:opacity-50 disabled:cursor-not-allowed',
          )}
        >
          {isSaving ? '저장 중...' : '저장하기'}
        </button>
      </div>
    </div>
  )
}
