export interface SearchFilters {
  keywords: string[]
  minViewCount: number
  publishedAfter: string
  publishedBefore: string
}

export interface ViewCountPreset {
  label: string
  value: number
}

export interface PeriodPreset {
  label: string
  months: number
}
