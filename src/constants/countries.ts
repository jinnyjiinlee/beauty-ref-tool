import type { CountryOption } from '../types'

export const COUNTRY_PRESETS: CountryOption[] = [
  { code: 'KR', label: '한국', language: 'ko', flag: '\uD83C\uDDF0\uD83C\uDDF7', defaultMinViewCount: 500_000 },
  { code: 'US', label: '미국', language: 'en', flag: '\uD83C\uDDFA\uD83C\uDDF8', defaultMinViewCount: 1_000_000 },
  { code: 'JP', label: '일본', language: 'ja', flag: '\uD83C\uDDEF\uD83C\uDDF5', defaultMinViewCount: 1_000_000 },
  { code: 'TH', label: '태국', language: 'th', flag: '\uD83C\uDDF9\uD83C\uDDED', defaultMinViewCount: 1_000_000 },
  { code: 'TW', label: '대만', language: 'zh', flag: '\uD83C\uDDF9\uD83C\uDDFC', defaultMinViewCount: 1_000_000 },
  { code: 'VN', label: '베트남', language: 'vi', flag: '\uD83C\uDDFB\uD83C\uDDF3', defaultMinViewCount: 1_000_000 },
  { code: 'ID', label: '인도네시아', language: 'id', flag: '\uD83C\uDDEE\uD83C\uDDE9', defaultMinViewCount: 1_000_000 },
  { code: 'FR', label: '프랑스', language: 'fr', flag: '\uD83C\uDDEB\uD83C\uDDF7', defaultMinViewCount: 1_000_000 },
]

export const DEFAULT_COUNTRY_CODE = 'KR'
