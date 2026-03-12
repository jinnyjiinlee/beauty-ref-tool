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
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          키워드 (쉼표로 구분)
        </label>
        <input
          type="text"
          value={keywordInput}
          onChange={(e) => setKeywordInput(e.target.value)}
          placeholder="예: 립글로스, 쿠션 파운데이션"
          className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-pink-500 focus:outline-none"
        />
      </div>

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

      <button
        type="submit"
        disabled={isLoading}
        className={cn(
          'w-full rounded-lg bg-pink-500 px-6 py-3 font-semibold text-white',
          'hover:bg-pink-600 disabled:opacity-50 disabled:cursor-not-allowed',
        )}
      >
        {isLoading ? '검색 중...' : '검색'}
      </button>
    </form>
  )
}
