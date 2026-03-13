import { useState, type FormEvent } from 'react'
import type { SearchFilters } from '../types'
import { DEFAULT_PERIOD_MONTHS, DEFAULT_COUNTRY_CODE } from '../constants'
import { COUNTRY_PRESETS, KEYWORD_BY_COUNTRY, DEFAULT_KEYWORDS } from '../constants'
import { getDateMonthsAgo } from '../utils'
import { cn } from '../utils/cn'
import { ViewCountFilter } from './ViewCountFilter'
import { PeriodFilter } from './PeriodFilter'
import { CountryFilter } from './CountryFilter'
import { KeywordSuggestions } from './KeywordSuggestions'

interface SearchBarProps {
  onSearch: (filters: SearchFilters) => Promise<void>
  isLoading: boolean
}

export function SearchBar({ onSearch, isLoading }: SearchBarProps) {
  const defaultCountryPreset = COUNTRY_PRESETS.find((c) => c.code === DEFAULT_COUNTRY_CODE)
  const [keywordInput, setKeywordInput] = useState('')
  const [minViewCount, setMinViewCount] = useState(defaultCountryPreset?.defaultMinViewCount ?? 500_000)
  const [customViewCount, setCustomViewCount] = useState('')
  const [periodMonths, setPeriodMonths] = useState(DEFAULT_PERIOD_MONTHS)
  const [useCustomPeriod, setUseCustomPeriod] = useState(false)
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [regionCode, setRegionCode] = useState(DEFAULT_COUNTRY_CODE)
  const [relevanceLanguage, setRelevanceLanguage] = useState(defaultCountryPreset?.language ?? 'ko')
  const [showFilters, setShowFilters] = useState(false)
  const currentKeywords = KEYWORD_BY_COUNTRY[regionCode] ?? DEFAULT_KEYWORDS

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
      regionCode,
      relevanceLanguage,
    }

    void onSearch(filters)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl bg-dark-800 border border-glass-border p-6 space-y-5"
    >
      <CountryFilter
        selectedCode={regionCode}
        onChange={(code, lang) => {
          setRegionCode(code)
          setRelevanceLanguage(lang)
          const preset = COUNTRY_PRESETS.find((c) => c.code === code)
          if (preset) { setMinViewCount(preset.defaultMinViewCount); setCustomViewCount('') }
        }}
      />

      <div>
        <label className="block text-xs font-medium text-subtle mb-2 uppercase tracking-wider">
          Keywords
        </label>
        <div className="relative">
          <input
            type="text"
            value={keywordInput}
            onChange={(e) => setKeywordInput(e.target.value)}
            placeholder={currentKeywords.placeholder}
            className={cn(
              'w-full rounded-xl bg-dark-700 border border-glass-border px-4 py-3.5',
              keywordInput ? 'pr-[7.5rem]' : 'pr-24',
              'text-white placeholder-dark-400 text-sm',
              'focus:border-accent/50 focus:ring-1 focus:ring-accent/30 focus:outline-none',
              'transition-all',
            )}
          />
          {keywordInput && (
            <button
              type="button"
              onClick={() => setKeywordInput('')}
              className="absolute right-[4.5rem] top-1/2 -translate-y-1/2 text-dark-400 hover:text-white transition-colors p-1"
              aria-label="키워드 지우기"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M3.5 3.5l7 7M10.5 3.5l-7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
          )}
          <button
            type="submit"
            disabled={isLoading}
            className={cn(
              'absolute right-1.5 top-1.5 bottom-1.5 rounded-lg px-4',
              'bg-accent text-white text-xs font-semibold',
              'hover:bg-accent-light active:scale-95 transition-all',
              'disabled:opacity-40 disabled:cursor-not-allowed',
              isLoading && 'animate-pulse',
            )}
          >
            {isLoading ? '...' : '검색'}
          </button>
        </div>
        <div className="mt-3">
          <KeywordSuggestions regionCode={regionCode} onSelect={(kw) => {
            const current = keywordInput.trim()
            setKeywordInput(current ? `${current}, ${kw}` : kw)
          }} />
        </div>
      </div>

      <FilterToggleButton
        showFilters={showFilters}
        viewCount={customViewCount ? Number(customViewCount) : minViewCount}
        periodMonths={useCustomPeriod ? null : periodMonths}
        onClick={() => setShowFilters(!showFilters)}
      />

      {showFilters && (
        <div className="space-y-5 animate-fade-in">
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
        </div>
      )}
    </form>
  )
}

function formatFilterLabel(viewCount: number): string {
  if (viewCount >= 1_000_000) return `${viewCount / 1_000_000}백만+`
  if (viewCount >= 10_000) return `${viewCount / 10_000}만+`
  return `${viewCount.toLocaleString()}+`
}

function FilterToggleButton({ showFilters, viewCount, periodMonths, onClick }: {
  showFilters: boolean; viewCount: number; periodMonths: number | null; onClick: () => void
}) {
  const periodLabel = periodMonths ? (periodMonths >= 12 ? `${periodMonths / 12}년` : `${periodMonths}개월`) : '직접설정'
  return (
    <button type="button" onClick={onClick} className={cn(
      'flex items-center gap-2 text-xs font-medium transition-colors',
      showFilters ? 'text-accent' : 'text-dark-400 hover:text-white',
    )}>
      <svg width="12" height="12" viewBox="0 0 12 12" className={cn('transition-transform', showFilters && 'rotate-90')}>
        <path d="M4 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      </svg>
      필터 설정
      <span className="text-dark-500">({formatFilterLabel(viewCount)}, {periodLabel})</span>
    </button>
  )
}
