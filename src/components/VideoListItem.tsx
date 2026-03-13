import type { VideoResult } from '../types'
import { formatViewCount, formatDate } from '../utils'
import { cn } from '../utils/cn'
import { FormatBadge } from './FormatBadge'

interface VideoListItemProps {
  video: VideoResult
  onSave: (video: VideoResult) => void
  isSaving: boolean
  onChannelClick?: (channelId: string, channelTitle: string) => void
}

export function VideoListItem({ video, onSave, isSaving, onChannelClick }: VideoListItemProps) {
  const engTitle = `(${video.likeCount.toLocaleString()} + ${video.commentCount.toLocaleString()}) / ${video.viewCount.toLocaleString()} = ${video.engagementRate.toFixed(2)}%`

  return (
    <div className={cn(
      'group flex gap-4 rounded-xl bg-dark-800 border border-glass-border p-3',
      'hover:border-dark-400 hover:bg-dark-700/50 transition-all duration-200',
    )}>
      <a
        href={`https://youtube.com/watch?v=${video.videoId}`}
        target="_blank"
        rel="noopener noreferrer"
        className="relative flex-shrink-0"
      >
        <img src={video.thumbnailUrl} alt={video.title} loading="lazy" className="w-40 aspect-video object-cover rounded-lg" />
        <div className="absolute bottom-1.5 right-1.5">
          <FormatBadge tag={video.formatTag} />
        </div>
      </a>

      <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
        <div>
          <h3 className="text-[13px] font-medium text-white line-clamp-2 leading-snug">
            {video.title}
          </h3>
          <button
            type="button"
            onClick={() => onChannelClick?.(video.channelId, video.channelTitle)}
            className="text-xs text-subtle hover:text-accent transition-colors text-left mt-1"
          >{video.channelTitle}</button>
        </div>
        <div className="flex flex-wrap items-center gap-x-1.5 gap-y-0.5 text-[11px] text-dark-400">
          <span>조회 {formatViewCount(video.viewCount)}</span>
          <span className="text-dark-600">|</span>
          <span>좋아요 {formatViewCount(video.likeCount)}</span>
          <span className="text-dark-600">|</span>
          <span>댓글 {formatViewCount(video.commentCount)}</span>
          <span className="text-dark-600">|</span>
          <span title={engTitle} className="cursor-help underline decoration-dotted decoration-dark-500">
            참여 {video.engagementRate.toFixed(1)}%
          </span>
          <span className="text-dark-600">|</span>
          <span>{formatDate(video.publishedAt)}</span>
        </div>
      </div>

      <div className="flex-shrink-0 flex items-center">
        <button
          onClick={() => onSave(video)}
          disabled={isSaving}
          className={cn(
            'rounded-lg px-4 py-2 text-xs font-semibold transition-all',
            isSaving
              ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 cursor-default'
              : 'bg-glass border border-glass-border text-white hover:bg-accent/15 hover:text-accent hover:border-accent/30',
          )}
        >{isSaving ? 'Saved' : 'Save'}</button>
      </div>
    </div>
  )
}
