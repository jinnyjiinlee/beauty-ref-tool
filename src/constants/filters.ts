import type { ViewCountPreset, PeriodPreset } from '../types'

export const VIEW_COUNT_PRESETS: ViewCountPreset[] = [
  { label: '10만+', value: 100_000 },
  { label: '50만+', value: 500_000 },
  { label: '100만+', value: 1_000_000 },
]

export const PERIOD_PRESETS: PeriodPreset[] = [
  { label: '1개월', months: 1 },
  { label: '3개월', months: 3 },
  { label: '6개월', months: 6 },
  { label: '1년', months: 12 },
]

export const DEFAULT_MIN_VIEW_COUNT = 500_000
export const DEFAULT_PERIOD_MONTHS = 6
export const MAX_RESULTS_PER_SEARCH = 50
