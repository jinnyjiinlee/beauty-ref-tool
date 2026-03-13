import { useState, useEffect, useRef } from 'react'
import { KEYWORD_BY_COUNTRY, DEFAULT_KEYWORDS } from '../constants'
import { cn } from '../utils/cn'

interface KeywordSuggestionsProps {
  regionCode: string
  onSelect: (keyword: string) => void
}

export function KeywordSuggestions({ regionCode, onSelect }: KeywordSuggestionsProps) {
  const [openIdx, setOpenIdx] = useState<number | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const { categories } = KEYWORD_BY_COUNTRY[regionCode] ?? DEFAULT_KEYWORDS

  useEffect(() => {
    if (openIdx === null) return
    const handleClickOutside = (e: MouseEvent): void => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpenIdx(null)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [openIdx])

  return (
    <div ref={containerRef} className="space-y-2">
      <span className="block text-xs font-medium text-subtle uppercase tracking-wider">
        추천 키워드
      </span>
      <div className="flex flex-wrap gap-2">
        {categories.map((cat, i) => (
          <div key={cat.label} className="relative">
            <button
              type="button"
              onClick={() => setOpenIdx(openIdx === i ? null : i)}
              className={cn(
                'rounded-lg px-3 py-1.5 text-xs font-medium border transition-all',
                openIdx === i
                  ? 'bg-accent/15 text-accent border-accent/30'
                  : 'bg-dark-700 text-dark-300 border-glass-border hover:text-white',
              )}
            >
              {cat.label}
            </button>
            {openIdx === i && (
              <div className={cn(
                'absolute top-full left-0 mt-1 z-10 min-w-[180px]',
                'rounded-lg bg-dark-700 border border-glass-border p-2 shadow-lg',
                'animate-fade-in',
              )}>
                {cat.keywords.map((kw) => (
                  <button
                    key={kw}
                    type="button"
                    onClick={() => { onSelect(kw); setOpenIdx(null) }}
                    className={cn(
                      'block w-full text-left px-2.5 py-1.5 text-xs text-dark-300',
                      'hover:text-white hover:bg-dark-600 rounded transition-colors',
                    )}
                  >
                    {kw}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
