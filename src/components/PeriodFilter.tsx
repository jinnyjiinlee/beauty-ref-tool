import { PERIOD_PRESETS } from '../constants'
import { cn } from '../utils/cn'

interface PeriodFilterProps {
  periodMonths: number
  useCustomPeriod: boolean
  startDate: string
  endDate: string
  onPresetClick: (months: number) => void
  onCustomToggle: () => void
  onStartChange: (date: string) => void
  onEndChange: (date: string) => void
}

export function PeriodFilter({
  periodMonths,
  useCustomPeriod,
  startDate,
  endDate,
  onPresetClick,
  onCustomToggle,
  onStartChange,
  onEndChange,
}: PeriodFilterProps) {
  const chipBase = 'rounded-lg px-3.5 py-1.5 text-xs font-medium transition-all'
  const chipActive = 'bg-accent/20 text-accent border border-accent/40'
  const chipInactive = 'bg-dark-700 text-subtle border border-glass-border hover:border-dark-400'

  return (
    <div>
      <label className="block text-xs font-medium text-subtle mb-2 uppercase tracking-wider">
        Period
      </label>
      <div className="flex gap-2 flex-wrap">
        {PERIOD_PRESETS.map((preset) => (
          <button
            key={preset.months}
            type="button"
            onClick={() => onPresetClick(preset.months)}
            className={cn(
              chipBase,
              !useCustomPeriod && periodMonths === preset.months
                ? chipActive : chipInactive,
            )}
          >
            {preset.label}
          </button>
        ))}
        <button
          type="button"
          onClick={onCustomToggle}
          className={cn(chipBase, useCustomPeriod ? chipActive : chipInactive)}
        >
          직접 입력
        </button>
      </div>
      {useCustomPeriod && (
        <div className="mt-3 flex gap-2 items-center animate-fade-in">
          <input
            type="date"
            value={startDate}
            onChange={(e) => onStartChange(e.target.value)}
            className={cn(
              'rounded-lg bg-dark-700 border border-glass-border px-3 py-1.5',
              'text-xs text-white focus:border-accent/50 focus:outline-none',
            )}
          />
          <span className="text-dark-400 text-xs">~</span>
          <input
            type="date"
            value={endDate}
            onChange={(e) => onEndChange(e.target.value)}
            className={cn(
              'rounded-lg bg-dark-700 border border-glass-border px-3 py-1.5',
              'text-xs text-white focus:border-accent/50 focus:outline-none',
            )}
          />
        </div>
      )}
    </div>
  )
}
