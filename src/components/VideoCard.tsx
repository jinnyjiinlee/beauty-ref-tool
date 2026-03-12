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
  const saved = isSaving

  return (
    <div className={cn(
      'group rounded-xl bg-dark-800 border border-glass-border overflow-hidden',
      'hover:border-dark-400 hover:bg-dark-700/50 transition-all duration-200',
    )}>
      <a
        href={`https://youtube.com/watch?v=${video.videoId}`}
        target="_blank"
        rel="noopener noreferrer"
        className="relative block"
      >
        <img
          src={video.thumbnailUrl}
          alt={video.title}
          className="w-full aspect-video object-cover"
        />
        <div className={cn(
          'absolute inset-0 bg-black/0 group-hover:bg-black/20',
          'transition-colors flex items-center justify-center',
        )}>
          <span className={cn(
            'opacity-0 group-hover:opacity-100 transition-opacity',
            'bg-black/70 backdrop-blur-sm rounded-full px-3 py-1',
            'text-[11px] text-white font-medium',
          )}>
            YouTube에서 보기
          </span>
        </div>
        <div className="absolute bottom-2 right-2">
          <FormatBadge tag={video.formatTag} />
        </div>
      </a>

      <div className="p-3.5 space-y-2">
        <h3 className="text-[13px] font-medium text-white line-clamp-2 leading-snug">
          {video.title}
        </h3>

        <p className="text-xs text-subtle">{video.channelTitle}</p>

        <div className="flex items-center gap-1.5 text-[11px] text-dark-400">
          <span>{formatViewCount(video.viewCount)} views</span>
          <span className="text-dark-500">|</span>
          <span>{video.engagementRate.toFixed(1)}% engagement</span>
          <span className="text-dark-500">|</span>
          <span>{formatDate(video.publishedAt)}</span>
        </div>

        <button
          onClick={() => onSave(video)}
          disabled={saved}
          className={cn(
            'mt-1 w-full rounded-lg py-2 text-xs font-semibold transition-all',
            saved
              ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 cursor-default'
              : 'bg-glass border border-glass-border text-white hover:bg-accent/15 hover:text-accent hover:border-accent/30',
          )}
        >
          {saved ? 'Saved' : 'Save'}
        </button>
      </div>
    </div>
  )
}
