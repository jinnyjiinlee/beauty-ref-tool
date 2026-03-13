import type { FormatTag } from '../types'
import { cn } from '../utils/cn'

interface FormatBadgeProps {
  tag: FormatTag
}

const TAG_STYLES: Record<FormatTag, string> = {
  ASMR: 'bg-purple-500/15 text-purple-400 border-purple-500/30',
  GRWM: 'bg-pink-500/15 text-pink-400 border-pink-500/30',
  '스킨케어루틴': 'bg-sky-500/15 text-sky-400 border-sky-500/30',
  '제품리뷰': 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
  '하울': 'bg-teal-500/15 text-teal-400 border-teal-500/30',
  '튜토리얼': 'bg-blue-500/15 text-blue-400 border-blue-500/30',
  '연예인': 'bg-rose-500/15 text-rose-400 border-rose-500/30',
  'K뷰티반응': 'bg-amber-500/15 text-amber-400 border-amber-500/30',
  '후킹형': 'bg-orange-500/15 text-orange-400 border-orange-500/30',
  '비포애프터': 'bg-cyan-500/15 text-cyan-400 border-cyan-500/30',
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
