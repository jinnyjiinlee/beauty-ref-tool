import { useState, type FormEvent } from 'react'
import type { SearchFilters } from '../types'
import { DEFAULT_MIN_VIEW_COUNT, DEFAULT_PERIOD_MONTHS } from '../constants'
import { getDateMonthsAgo } from '../utils'
import { cn } from '../utils/cn'
import { ViewCountFilter } from './ViewCountFilter'
import { PeriodFilter } from './PeriodFilter'

interface SearchBarProps {
  onSearch: (filters: SearchFilters) => Promise<void>
  isLoading: boolean
}

export function SearchBar({ onSearch, isLoading }: SearchBarProps) {
  const [keywordInput, setKeywordInput] = useState('')
  const [minViewCount, setMinViewCount] = useState(DEFAULT_MIN_VIEW_COUNT)
  const [customViewCount, setCustomViewCount] = useState('')
  const [periodMonths, setPeriodMonths] = useState(DEFAULT_PERIOD_MONTHS)
  const [useCustomPeriod, setUseCustomPeriod] = useState(false)
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const keywords = keywordInput
      .split(',')
      .map((k) => k.trim())
      .filter(Boolean)

    if (keywords.length === 0) return

    const now = new Date().toISOString()
    const filters: SearchFilters = {
      keywords,
      minViewCount: customViewCount ? Number(customViewCount) : minViewCount,
      publishedAfter: useCustomPeriod
        ? new Date(startDate).toISOString()
        : getDateMonthsAgo(periodMonths),
      publishedBefore: useCustomPeriod
        ? new Date(endDate).toISOString()
        : now,
    }

    void onSearch(filters)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl bg-dark-800 border border-glass-border p-6 space-y-5"
    >
      <div>
        <label className="block text-xs font-medium text-subtle mb-2 uppercase tracking-wider">
          Keywords
        </label>
        <input
          type="text"
          value={keywordInput}
          onChange={(e) => setKeywordInput(e.target.value)}
          placeholder="립글로스, 쿠션 파운데이션, 선크림"
          className={cn(
            'w-full rounded-xl bg-dark-700 border border-glass-border px-4 py-3',
            'text-white placeholder-dark-400 text-sm',
            'focus:border-accent/50 focus:ring-1 focus:ring-accent/30 focus:outline-none',
            'transition-all',
          )}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <ViewCountFilter
          minViewCount={minViewCount}
          customViewCount={customViewCount}
          onPresetClick={setMinViewCount}
          onCustomChange={setCustomViewCount}
        />
        <PeriodFilter
          periodMonths={periodMonths}
          useCustomPeriod={useCustomPeriod}
          startDate={startDate}
          endDate={endDate}
          onPresetClick={(m) => { setPeriodMonths(m); setUseCustomPeriod(false) }}
          onCustomToggle={() => setUseCustomPeriod(true)}
          onStartChange={setStartDate}
          onEndChange={setEndDate}
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className={cn(
          'w-full rounded-xl bg-accent px-6 py-3.5 text-sm font-semibold text-white',
          'hover:bg-accent-light active:scale-[0.98] transition-all',
          'disabled:opacity-40 disabled:cursor-not-allowed disabled:active:scale-100',
          isLoading && 'animate-pulse',
        )}
      >
        {isLoading ? '검색 중...' : '숏폼 검색'}
      </button>
    </form>
  )
}
