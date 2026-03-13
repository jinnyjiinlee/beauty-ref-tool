import { cn } from '../utils/cn'
import { COUNTRY_PRESETS } from '../constants'

interface CountryFilterProps {
  selectedCode: string
  onChange: (code: string, language: string) => void
}

export function CountryFilter({ selectedCode, onChange }: CountryFilterProps) {
  return (
    <div>
      <label className="block text-xs font-medium text-subtle mb-2 uppercase tracking-wider">
        Country
      </label>
      <div className="flex flex-wrap gap-2">
        {COUNTRY_PRESETS.map((country) => {
          const active = selectedCode === country.code
          return (
            <button
              key={country.code}
              type="button"
              onClick={() => onChange(country.code, country.language)}
              className={cn(
                'rounded-lg px-3 py-1.5 text-xs font-medium border transition-all',
                active
                  ? 'bg-accent/15 text-accent border-accent/30'
                  : 'bg-dark-700 text-dark-300 border-glass-border hover:text-white hover:border-dark-400',
              )}
            >
              {country.flag} {country.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}
