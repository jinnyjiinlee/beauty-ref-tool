import { useState } from 'react'
import type { VideoResult } from '../types'
import { formatViewCount, formatDate } from '../utils'
import { cn } from '../utils/cn'
import { FormatBadge } from './FormatBadge'

interface VideoCardProps {
  video: VideoResult
  onSave: (video: VideoResult) => void
  isSaving: boolean
  onChannelClick?: (channelId: string, channelTitle: string) => void
}

export function VideoCard({ video, onSave, isSaving, onChannelClick }: VideoCardProps) {
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
        <img src={video.thumbnailUrl} alt={video.title} loading="lazy" className="w-full aspect-video object-cover" />
        <div className={cn(
          'absolute inset-0 bg-black/0 group-hover:bg-black/20',
          'transition-colors flex items-center justify-center',
        )}>
          <span className={cn(
            'opacity-0 group-hover:opacity-100 transition-opacity',
            'bg-black/70 backdrop-blur-sm rounded-full px-3 py-1',
            'text-[11px] text-white font-medium',
          )}>YouTube</span>
        </div>
        <div className="absolute bottom-2 right-2">
          <FormatBadge tag={video.formatTag} />
        </div>
      </a>

      <div className="p-3.5 space-y-2">
        <h3 className="text-[13px] font-medium text-white line-clamp-2 leading-snug">
          {video.title}
        </h3>
        <button
          type="button"
          onClick={() => onChannelClick?.(video.channelId, video.channelTitle)}
          className="text-xs text-subtle hover:text-accent transition-colors text-left"
        >{video.channelTitle}</button>

        <VideoMeta video={video} />

        <div className="flex gap-2 mt-1">
          <CopyUrlButton videoId={video.videoId} />
          <button
            onClick={() => onSave(video)}
            disabled={isSaving}
            className={cn(
              'flex-1 rounded-lg py-2 text-xs font-semibold transition-all',
              isSaving
                ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 cursor-default'
                : 'bg-glass border border-glass-border text-white hover:bg-accent/15 hover:text-accent hover:border-accent/30',
            )}
          >{isSaving ? 'Saved' : 'Save'}</button>
        </div>
      </div>
    </div>
  )
}

function CopyUrlButton({ videoId }: { videoId: string }) {
  const [copied, setCopied] = useState(false)
  const handleCopy = async (): Promise<void> => {
    await navigator.clipboard.writeText(`https://youtube.com/watch?v=${videoId}`)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }
  return (
    <button
      onClick={handleCopy}
      title="URL 복사"
      className={cn(
        'rounded-lg px-3 py-2 text-xs font-semibold transition-all border',
        copied
          ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30'
          : 'bg-glass border-glass-border text-subtle hover:text-white',
      )}
    >{copied ? 'Copied' : 'URL'}</button>
  )
}

function VideoMeta({ video }: { video: VideoResult }) {
  const engTitle = `(${video.likeCount.toLocaleString()} + ${video.commentCount.toLocaleString()}) / ${video.viewCount.toLocaleString()} = ${video.engagementRate.toFixed(2)}%`
  return (
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
  )
}
