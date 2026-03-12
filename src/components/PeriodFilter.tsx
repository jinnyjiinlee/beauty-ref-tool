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
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        기간
      </label>
      <div className="flex gap-2 flex-wrap items-center">
        {PERIOD_PRESETS.map((preset) => (
          <button
            key={preset.months}
            type="button"
            onClick={() => onPresetClick(preset.months)}
            className={cn(
              'rounded-full px-4 py-1 text-sm border',
              !useCustomPeriod && periodMonths === preset.months
                ? 'bg-pink-500 text-white border-pink-500'
                : 'border-gray-300 hover:border-pink-300',
            )}
          >
            {preset.label}
          </button>
        ))}
        <button
          type="button"
          onClick={onCustomToggle}
          className={cn(
            'rounded-full px-4 py-1 text-sm border',
            useCustomPeriod
              ? 'bg-pink-500 text-white border-pink-500'
              : 'border-gray-300 hover:border-pink-300',
          )}
        >
          직접 입력
        </button>
      </div>
      {useCustomPeriod && (
        <div className="mt-2 flex gap-2">
          <input
            type="date"
            value={startDate}
            onChange={(e) => onStartChange(e.target.value)}
            className="rounded-lg border border-gray-300 px-3 py-1 text-sm"
          />
          <span className="self-center text-gray-500">~</span>
          <input
            type="date"
            value={endDate}
            onChange={(e) => onEndChange(e.target.value)}
            className="rounded-lg border border-gray-300 px-3 py-1 text-sm"
          />
        </div>
      )}
    </div>
  )
}
