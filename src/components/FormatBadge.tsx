import type { FormatTag } from '../types'
import { cn } from '../utils/cn'

interface FormatBadgeProps {
  tag: FormatTag
}

const TAG_STYLES: Record<FormatTag, string> = {
  ASMR: 'bg-purple-500/15 text-purple-400 border-purple-500/30',
  '루틴': 'bg-sky-500/15 text-sky-400 border-sky-500/30',
  '리뷰': 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
  '후킹형': 'bg-orange-500/15 text-orange-400 border-orange-500/30',
  '기타': 'bg-white/5 text-subtle border-white/10',
}

export function FormatBadge({ tag }: FormatBadgeProps) {
  return (
    <span
      className={cn(
        'inline-block rounded-md px-2 py-0.5 text-[10px] font-semibold',
        'uppercase tracking-wide border whitespace-nowrap',
        TAG_STYLES[tag],
      )}
    >
      {tag}
    </span>
  )
}
