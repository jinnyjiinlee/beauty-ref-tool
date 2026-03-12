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
      <label className="block text-sm font-medium text-gray-700 mb-1">
        최소 조회수
      </label>
      <div className="flex gap-2 flex-wrap">
        {VIEW_COUNT_PRESETS.map((preset) => (
          <button
            key={preset.value}
            type="button"
            onClick={() => { onPresetClick(preset.value); onCustomChange('') }}
            className={cn(
              'rounded-full px-4 py-1 text-sm border',
              !customViewCount && minViewCount === preset.value
                ? 'bg-pink-500 text-white border-pink-500'
                : 'border-gray-300 hover:border-pink-300',
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
          className="w-32 rounded-lg border border-gray-300 px-3 py-1 text-sm focus:border-pink-500 focus:outline-none"
        />
      </div>
    </div>
  )
}
