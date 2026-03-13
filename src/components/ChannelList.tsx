import type { SavedChannel } from '../types'
import { cn } from '../utils/cn'

interface ChannelListProps {
  channels: SavedChannel[]
  isLoading: boolean
  onDigChannel: (channelId: string, channelTitle: string) => void
  onDelete: (id: string) => void
}

export function ChannelList({
  channels,
  isLoading,
  onDigChannel,
  onDelete,
}: ChannelListProps) {
  if (isLoading) {
    return (
      <div className="flex gap-2">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="h-9 w-28 rounded-lg bg-dark-700 animate-pulse" />
        ))}
      </div>
    )
  }

  if (channels.length === 0) {
    return (
      <div className="flex flex-col items-center py-12 text-center">
        <p className="text-sm text-subtle mb-1">아직 저장된 채널이 없습니다</p>
        <p className="text-xs text-dark-400">
          검색 결과에서 채널명을 클릭하면 자동으로 추가됩니다
        </p>
      </div>
    )
  }

  return (
    <div className="flex flex-wrap gap-2">
      {channels.map((ch) => (
        <div
          key={ch.id}
          className={cn(
            'group flex items-center gap-1.5 rounded-lg border border-glass-border',
            'bg-dark-700 px-3 py-1.5 transition-all hover:border-accent/30',
          )}
        >
          <button
            onClick={() => onDigChannel(ch.channelId, ch.channelTitle)}
            className="text-xs font-medium text-white hover:text-accent transition-colors"
          >
            {ch.channelTitle}
          </button>
          <button
            onClick={() => onDelete(ch.id)}
            className={cn(
              'text-dark-500 hover:text-red-400 transition-colors',
              'opacity-0 group-hover:opacity-100 text-[10px]',
            )}
          >
            x
          </button>
        </div>
      ))}
    </div>
  )
}
