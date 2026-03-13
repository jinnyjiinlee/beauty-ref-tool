import type { ChannelRank } from '../types'
import { formatViewCount } from '../utils'
import { cn } from '../utils/cn'

interface ChannelRankingProps {
  channels: ChannelRank[]
  onChannelClick?: (channelId: string, channelTitle: string) => void
}

export function ChannelRanking({ channels, onChannelClick }: ChannelRankingProps) {
  if (channels.length === 0) return null

  return (
    <div className="rounded-xl border border-glass-border bg-dark-800/60 p-5 space-y-4">
      <div>
        <h3 className="text-sm font-semibold text-white">Top Channels</h3>
        <p className="text-[11px] text-dark-400 mt-0.5">
          평균 조회수 기준 상위 채널 (검색 결과 내)
        </p>
      </div>
      <div className="space-y-1">
        {channels.map((ch, i) => (
          <ChannelRow key={ch.channelId} rank={i + 1} channel={ch} onChannelClick={onChannelClick} />
        ))}
      </div>
    </div>
  )
}

interface ChannelRowProps {
  rank: number
  channel: ChannelRank
  onChannelClick?: (channelId: string, channelTitle: string) => void
}

function ChannelRow({ rank, channel, onChannelClick }: ChannelRowProps) {
  const medal = rank <= 3
  const medalColor = rank === 1 ? 'text-amber-400' : rank === 2 ? 'text-gray-300' : 'text-amber-600'

  return (
    <div className={cn(
      'flex items-center gap-3 px-3 py-2 rounded-lg',
      'hover:bg-dark-700/50 transition-colors group',
    )}>
      <span className={cn('w-5 text-xs font-bold text-center', medal ? medalColor : 'text-dark-500')}>
        {rank}
      </span>
      <button
        type="button"
        onClick={() => onChannelClick?.(channel.channelId, channel.channelTitle)}
        className="flex-1 text-left text-xs text-white group-hover:text-accent transition-colors truncate"
        title={`${channel.channelTitle} 채널 디깅하기`}
      >
        {channel.channelTitle}
      </button>
      <div className="flex items-center gap-3 text-[11px] text-dark-400 shrink-0">
        <span title="이 검색에서 나온 영상 수">{channel.videoCount}편</span>
        <span title="평균 조회수">avg {formatViewCount(channel.avgViewCount)}</span>
        <span title="평균 참여율">참여 {channel.avgEngagement.toFixed(1)}%</span>
      </div>
    </div>
  )
}
