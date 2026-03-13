import type { SavedReference, FormatTag } from '../types'
import { formatViewCount, formatDate } from '../utils'
import { cn } from '../utils/cn'
import { FormatBadge } from './FormatBadge'

interface ReferenceListProps {
  references: SavedReference[]
  isLoading: boolean
  activeTag: FormatTag | null
  onFilterTag: (tag: FormatTag | null) => void
  onDelete: (id: string) => void
}

const ALL_TAGS: FormatTag[] = ['ASMR', '스킨케어루틴', '제품리뷰', '후킹형', '기타']

export function ReferenceList({
  references,
  isLoading,
  activeTag,
  onFilterTag,
  onDelete,
}: ReferenceListProps) {
  const chipBase = 'rounded-lg px-3.5 py-1.5 text-xs font-medium transition-all'
  const chipActive = 'bg-accent/20 text-accent border border-accent/40'
  const chipInactive = 'bg-dark-700 text-subtle border border-glass-border hover:border-dark-400'

  return (
    <div className="space-y-4">
      <div className="flex gap-2 flex-wrap">
        <button
          onClick={() => onFilterTag(null)}
          className={cn(chipBase, activeTag === null ? chipActive : chipInactive)}
        >
          All
        </button>
        {ALL_TAGS.map((tag) => (
          <button
            key={tag}
            onClick={() => onFilterTag(tag)}
            className={cn(chipBase, activeTag === tag ? chipActive : chipInactive)}
          >
            {tag}
          </button>
        ))}
      </div>

      {isLoading && <LoadingSkeleton />}

      {!isLoading && references.length === 0 && (
        <div className="text-center py-16">
          <p className="text-subtle text-sm">저장된 레퍼런스가 없습니다</p>
        </div>
      )}

      <div className="space-y-3">
        {references.map((ref, i) => (
          <div key={ref.id} className="animate-fade-in" style={{ animationDelay: `${i * 40}ms` }}>
            <ReferenceRow reference={ref} onDelete={onDelete} />
          </div>
        ))}
      </div>
    </div>
  )
}

function LoadingSkeleton() {
  return (
    <div className="space-y-3">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="flex gap-4 rounded-xl bg-dark-800 border border-glass-border p-4">
          <div className="w-44 aspect-video skeleton shrink-0 rounded-lg" />
          <div className="flex-1 space-y-3">
            <div className="h-4 w-3/4 skeleton" />
            <div className="h-3 w-1/3 skeleton" />
            <div className="h-3 w-1/2 skeleton" />
          </div>
        </div>
      ))}
    </div>
  )
}

interface ReferenceRowProps {
  reference: SavedReference
  onDelete: (id: string) => void
}

function ReferenceRow({ reference, onDelete }: ReferenceRowProps) {
  return (
    <div className={cn(
      'group flex gap-4 rounded-xl bg-dark-800 border border-glass-border p-4',
      'hover:border-dark-400 transition-all',
    )}>
      <a
        href={`https://youtube.com/watch?v=${reference.videoId}`}
        target="_blank"
        rel="noopener noreferrer"
        className="shrink-0 relative"
      >
        <img
          src={reference.thumbnailUrl}
          alt={reference.title}
          className="w-44 aspect-video rounded-lg object-cover"
        />
      </a>

      <div className="flex-1 min-w-0 space-y-1.5">
        <div className="flex items-start gap-2">
          <h3 className="text-sm font-medium text-white truncate flex-1">
            {reference.title}
          </h3>
          <FormatBadge tag={reference.formatTag} />
        </div>
        <p className="text-xs text-subtle">{reference.channelTitle}</p>
        <div className="flex gap-2 text-[11px] text-dark-400">
          <span>{formatViewCount(reference.viewCount)} views</span>
          <span className="text-dark-500">|</span>
          <span>{reference.engagementRate.toFixed(1)}%</span>
          <span className="text-dark-500">|</span>
          <span>{formatDate(reference.publishedAt)}</span>
        </div>
        {reference.keywords.length > 0 && (
          <div className="flex gap-1.5 flex-wrap pt-1">
            {reference.keywords.map((kw) => (
              <span
                key={kw}
                className="rounded bg-dark-700 px-2 py-0.5 text-[10px] text-subtle"
              >
                #{kw}
              </span>
            ))}
          </div>
        )}
      </div>

      <button
        onClick={() => onDelete(reference.id)}
        className={cn(
          'self-start rounded-lg p-2 text-dark-400',
          'opacity-0 group-hover:opacity-100 hover:bg-red-500/10 hover:text-red-400',
          'transition-all',
        )}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m3 0v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6h14" />
        </svg>
      </button>
    </div>
  )
}
