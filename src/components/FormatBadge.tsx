import type { FormatTag } from '../types'
import { cn } from '../utils/cn'

interface FormatBadgeProps {
  tag: FormatTag
}

const TAG_COLORS: Record<FormatTag, string> = {
  ASMR: 'bg-purple-100 text-purple-700',
  '루틴': 'bg-blue-100 text-blue-700',
  '리뷰': 'bg-green-100 text-green-700',
  '후킹형': 'bg-red-100 text-red-700',
  '기타': 'bg-gray-100 text-gray-700',
}

export function FormatBadge({ tag }: FormatBadgeProps) {
  return (
    <span
      className={cn(
        'inline-block rounded-full px-2 py-0.5 text-xs font-medium whitespace-nowrap',
        TAG_COLORS[tag],
      )}
    >
      {tag}
    </span>
  )
}
