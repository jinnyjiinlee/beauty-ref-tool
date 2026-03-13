import type { FormatTag } from '../types'

interface TagRule {
  tag: FormatTag
  keywords: string[]
}

export const FORMAT_TAG_RULES: TagRule[] = [
  {
    tag: 'ASMR',
    keywords: ['asmr', 'ASMR', '에이에스엠알', '팅글', 'tingle'],
  },
  {
    tag: 'GRWM',
    keywords: ['grwm', 'GRWM', '겟레디', 'get ready with me', '같이준비'],
  },
  {
    tag: '스킨케어루틴',
    keywords: ['스킨케어', 'skincare', '루틴', 'routine', '모닝루틴', '나이트루틴', 'morning routine', 'night routine'],
  },
  {
    tag: '제품리뷰',
    keywords: ['리뷰', 'review', '솔직', '언박싱', '추천', '비교', '찐템', '인생템'],
  },
  {
    tag: '하울',
    keywords: ['하울', 'haul', '쇼핑', '올리브영', '다이소', '구매템'],
  },
  {
    tag: '튜토리얼',
    keywords: ['tutorial', '튜토리얼', '하는법', '방법', 'how to', '메이크업법'],
  },
  {
    tag: '연예인',
    keywords: ['아이돌', '연예인', '셀럽', 'idol', 'celebrity', '따라하기', '커버'],
  },
  {
    tag: 'K뷰티반응',
    keywords: ['k-beauty', 'k beauty', 'korean', '한국', 'reaction', '반응', '외국인'],
  },
  {
    tag: '후킹형',
    keywords: ['충격', '역대급', '난리', '대박', '미쳤', '레전드', '혜자', 'ㄹㅇ'],
  },
  {
    tag: '비포애프터',
    keywords: ['before', 'after', '비포', '애프터', '전후', '변신', 'transformation'],
  },
]

export const DEFAULT_TAG: FormatTag = '기타'
