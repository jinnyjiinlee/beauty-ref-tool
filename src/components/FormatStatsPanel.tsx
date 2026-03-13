import type { FormatStat, FormatTag } from '../types'
import { formatViewCount } from '../utils'
import { cn } from '../utils/cn'
import { FormatBadge } from './FormatBadge'

interface FormatStatsPanelProps {
  stats: FormatStat[]
}

export function FormatStatsPanel({ stats }: FormatStatsPanelProps) {
  if (stats.length === 0) return null

  const maxCount = Math.max(...stats.map((s) => s.count))

  return (
    <div className="rounded-xl border border-glass-border bg-dark-800/60 p-5 space-y-4">
      <div>
        <h3 className="text-sm font-semibold text-white">Format Analysis</h3>
        <p className="text-[11px] text-dark-400 mt-0.5">
          포맷별 영상 수 / 평균 조회수 / 평균 참여율
        </p>
      </div>
      <div className="space-y-2.5">
        {stats.map((s) => (
          <FormatStatRow key={s.tag} stat={s} maxCount={maxCount} />
        ))}
      </div>
    </div>
  )
}

interface FormatStatRowProps {
  stat: FormatStat
  maxCount: number
}

function FormatStatRow({ stat, maxCount }: FormatStatRowProps) {
  const widthPercent = Math.round((stat.count / maxCount) * 100)

  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FormatBadge tag={stat.tag as FormatTag} />
          <span className="text-xs text-dark-400">{stat.count}편</span>
        </div>
        <div className="flex items-center gap-3 text-[11px] text-dark-400">
          <span title="평균 조회수">avg {formatViewCount(stat.avgViewCount)}</span>
          <span title="평균 참여율">참여 {stat.avgEngagement.toFixed(1)}%</span>
        </div>
      </div>
      <div className="h-1.5 rounded-full bg-dark-700 overflow-hidden">
        <div
          className={cn('h-full rounded-full bg-accent/60 transition-all duration-500')}
          style={{ width: `${widthPercent}%` }}
        />
      </div>
    </div>
  )
}
