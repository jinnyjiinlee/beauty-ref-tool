import { cn } from '../utils/cn'

type Tab = 'search' | 'channels'

interface NavProps {
  activeTab: Tab
  onTabChange: (tab: Tab) => void
  resultCount?: number
  channelCount?: number
}

export function Nav({ activeTab, onTabChange, resultCount, channelCount }: NavProps) {
  return (
    <nav className="border-b border-glass-border bg-dark-800/50 backdrop-blur-md">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 flex gap-1">
        <TabButton
          label="검색"
          badge={resultCount}
          active={activeTab === 'search'}
          onClick={() => onTabChange('search')}
        />
        <TabButton
          label="채널"
          badge={channelCount}
          active={activeTab === 'channels'}
          onClick={() => onTabChange('channels')}
        />
      </div>
    </nav>
  )
}

interface TabButtonProps {
  label: string
  badge?: number
  active: boolean
  onClick: () => void
}

function TabButton({ label, badge, active, onClick }: TabButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'relative px-5 py-3 text-sm font-medium transition-colors flex items-center gap-2',
        active ? 'text-white' : 'text-subtle hover:text-white',
      )}
    >
      {label}
      {badge != null && badge > 0 && (
        <span className={cn(
          'text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[20px] text-center',
          active ? 'bg-accent/20 text-accent' : 'bg-dark-600 text-dark-400',
        )}>
          {badge}
        </span>
      )}
      {active && (
        <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent rounded-full" />
      )}
    </button>
  )
}
