import { describe, it, expect } from 'vitest'
import { detectFormatTag } from './formatTag'

describe('detectFormatTag', () => {
  it('ASMR 키워드를 감지한다', () => {
    expect(detectFormatTag('ASMR 메이크업', '')).toBe('ASMR')
    expect(detectFormatTag('팅글 립', '')).toBe('ASMR')
  })

  it('루틴 키워드를 감지한다', () => {
    expect(detectFormatTag('모닝 루틴', '')).toBe('루틴')
    expect(detectFormatTag('GRWM 겟레디', '')).toBe('루틴')
  })

  it('리뷰 키워드를 감지한다', () => {
    expect(detectFormatTag('솔직 리뷰', '')).toBe('리뷰')
    expect(detectFormatTag('', '언박싱 하울')).toBe('리뷰')
  })

  it('후킹형 키워드를 감지한다', () => {
    expect(detectFormatTag('역대급 발색', '')).toBe('후킹형')
    expect(detectFormatTag('대박 발색', '')).toBe('후킹형')
  })

  it('매칭 없으면 기타를 반환한다', () => {
    expect(detectFormatTag('립스틱 발색', '예쁜 컬러')).toBe('기타')
  })

  it('제목과 설명 모두에서 키워드를 탐색한다', () => {
    expect(detectFormatTag('메이크업', 'asmr 느낌')).toBe('ASMR')
  })

  it('첫 번째 매칭 태그를 반환한다 (우선순위)', () => {
    expect(detectFormatTag('ASMR 리뷰', '')).toBe('ASMR')
  })
})
