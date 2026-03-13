import type { SearchStats } from '../types'
import { formatViewCount } from '../utils'
import { cn } from '../utils/cn'

interface StatsSummaryProps {
  stats: SearchStats
}

interface StatCardProps {
  label: string
  value: string
  hint: string
}

function StatCard({ label, value, hint }: StatCardProps) {
  return (
    <div
      title={hint}
      className={cn(
        'rounded-xl border border-glass-border bg-dark-800/60 backdrop-blur-md p-4',
        'flex flex-col gap-1 cursor-default',
      )}
    >
      <span className="text-[11px] font-medium text-subtle uppercase tracking-wider">
        {label}
      </span>
      <span className="text-lg font-bold text-white">
        {value}
      </span>
    </div>
  )
}

export function StatsSummary({ stats }: StatsSummaryProps) {
  if (stats.totalResults === 0) return null

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      <StatCard label="평균 조회수" value={formatViewCount(stats.avgViewCount)} hint="검색 결과 전체의 평균 조회수" />
      <StatCard label="평균 참여율" value={`${stats.avgEngagement.toFixed(1)}%`} hint="(좋아요 + 댓글) / 조회수 평균" />
      <StatCard label="채널 수" value={String(stats.uniqueChannels)} hint="검색 결과에 포함된 고유 채널 수" />
      <StatCard label="검색 결과" value={`${stats.totalResults}편`} hint="조회수 필터를 통과한 영상 수" />
    </div>
  )
}
