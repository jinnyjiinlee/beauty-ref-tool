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

const ALL_TAGS: FormatTag[] = ['ASMR', '루틴', '리뷰', '후킹형', '기타']

export function ReferenceList({
  references,
  isLoading,
  activeTag,
  onFilterTag,
  onDelete,
}: ReferenceListProps) {
  return (
    <div className="space-y-4">
      <div className="flex gap-2 flex-wrap">
        <button
          onClick={() => onFilterTag(null)}
          className={cn(
            'rounded-full px-4 py-1 text-sm border',
            activeTag === null
              ? 'bg-pink-500 text-white border-pink-500'
              : 'border-gray-300 hover:border-pink-300',
          )}
        >
          전체
        </button>
        {ALL_TAGS.map((tag) => (
          <button
            key={tag}
            onClick={() => onFilterTag(tag)}
            className={cn(
              'rounded-full px-4 py-1 text-sm border',
              activeTag === tag
                ? 'bg-pink-500 text-white border-pink-500'
                : 'border-gray-300 hover:border-pink-300',
            )}
          >
            {tag}
          </button>
        ))}
      </div>

      {isLoading && (
        <p className="text-center text-gray-400 py-8">불러오는 중...</p>
      )}

      {!isLoading && references.length === 0 && (
        <p className="text-center text-gray-400 py-8">
          저장된 레퍼런스가 없습니다.
        </p>
      )}

      <div className="space-y-3">
        {references.map((ref) => (
          <ReferenceRow key={ref.id} reference={ref} onDelete={onDelete} />
        ))}
      </div>
    </div>
  )
}

interface ReferenceRowProps {
  reference: SavedReference
  onDelete: (id: string) => void
}

function ReferenceRow({ reference, onDelete }: ReferenceRowProps) {
  return (
    <div className="flex gap-4 rounded-xl border border-gray-200 bg-white p-4">
      <a
        href={`https://youtube.com/watch?v=${reference.videoId}`}
        target="_blank"
        rel="noopener noreferrer"
        className="shrink-0"
      >
        <img
          src={reference.thumbnailUrl}
          alt={reference.title}
          className="w-40 aspect-video rounded-lg object-cover"
        />
      </a>

      <div className="flex-1 min-w-0 space-y-1">
        <div className="flex items-start gap-2">
          <h3 className="text-sm font-semibold truncate flex-1">
            {reference.title}
          </h3>
          <FormatBadge tag={reference.formatTag} />
        </div>
        <p className="text-xs text-gray-500">{reference.channelTitle}</p>
        <div className="flex gap-3 text-xs text-gray-600">
          <span>조회수 {formatViewCount(reference.viewCount)}</span>
          <span>참여율 {reference.engagementRate.toFixed(2)}%</span>
          <span>{formatDate(reference.publishedAt)}</span>
        </div>
        {reference.keywords.length > 0 && (
          <div className="flex gap-1 flex-wrap">
            {reference.keywords.map((kw) => (
              <span
                key={kw}
                className="rounded bg-gray-100 px-2 py-0.5 text-xs text-gray-600"
              >
                {kw}
              </span>
            ))}
          </div>
        )}
      </div>

      <button
        onClick={() => onDelete(reference.id)}
        className="self-start text-gray-400 hover:text-red-500 text-sm"
      >
        삭제
      </button>
    </div>
  )
}
