import type { FormatTag } from '../types'

interface TagRule {
  tag: FormatTag
  keywords: string[]
}

export const FORMAT_TAG_RULES: TagRule[] = [
  {
    tag: 'ASMR',
    keywords: ['asmr', 'ASMR', '에이에스엠알', '팅글'],
  },
  {
    tag: '루틴',
    keywords: ['루틴', 'routine', '모닝', '나이트', '겟레디', 'grwm', 'GRWM'],
  },
  {
    tag: '리뷰',
    keywords: ['리뷰', 'review', '솔직', '언박싱', '하울', '추천', '비교'],
  },
  {
    tag: '후킹형',
    keywords: ['충격', '역대급', '난리', '대박', '미쳤', 'ㄹㅇ', '레전드', '혜자'],
  },
]

export const DEFAULT_TAG: FormatTag = '기타'
