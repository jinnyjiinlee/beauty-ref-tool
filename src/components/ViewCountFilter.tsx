import { VIEW_COUNT_PRESETS } from '../constants'
import { cn } from '../utils/cn'

interface ViewCountFilterProps {
  minViewCount: number
  customViewCount: string
  onPresetClick: (value: number) => void
  onCustomChange: (value: string) => void
}

export function ViewCountFilter({
  minViewCount,
  customViewCount,
  onPresetClick,
  onCustomChange,
}: ViewCountFilterProps) {
  return (
    <div>
      <label className="block text-xs font-medium text-subtle mb-2 uppercase tracking-wider">
        Min Views
      </label>
      <div className="flex gap-2 flex-wrap">
        {VIEW_COUNT_PRESETS.map((preset) => (
          <button
            key={preset.value}
            type="button"
            onClick={() => { onPresetClick(preset.value); onCustomChange('') }}
            className={cn(
              'rounded-lg px-3.5 py-1.5 text-xs font-medium transition-all',
              !customViewCount && minViewCount === preset.value
                ? 'bg-accent/20 text-accent border border-accent/40'
                : 'bg-dark-700 text-subtle border border-glass-border hover:border-dark-400',
            )}
          >
            {preset.label}
          </button>
        ))}
        <input
          type="number"
          value={customViewCount}
          onChange={(e) => onCustomChange(e.target.value)}
          placeholder="직접 입력"
          className={cn(
            'w-28 rounded-lg bg-dark-700 border border-glass-border px-3 py-1.5',
            'text-xs text-white placeholder-dark-400',
            'focus:border-accent/50 focus:outline-none transition-all',
          )}
        />
      </div>
    </div>
  )
}
