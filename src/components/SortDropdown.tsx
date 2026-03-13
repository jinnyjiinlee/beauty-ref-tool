import type { SortKey } from '../types'
import { SORT_OPTIONS } from '../constants'
import { cn } from '../utils/cn'

interface SortDropdownProps {
  value: SortKey
  onChange: (key: SortKey) => void
}

export function SortDropdown({ value, onChange }: SortDropdownProps) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value as SortKey)}
      className={cn(
        'rounded-lg bg-dark-700 border border-glass-border px-3 py-1.5',
        'text-xs text-white font-medium',
        'focus:border-accent/50 focus:ring-1 focus:ring-accent/30 focus:outline-none',
        'cursor-pointer appearance-none',
      )}
    >
      {SORT_OPTIONS.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  )
}
