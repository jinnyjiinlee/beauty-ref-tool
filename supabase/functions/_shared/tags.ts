export const TAG_RULES: [string, string[]][] = [
  ['ASMR', ['asmr', '에이에스엠알', '팅글', 'tingle']],
  ['GRWM', ['grwm', '겟레디', 'get ready with me', '같이준비']],
  ['스킨케어루틴', ['스킨케어', 'skincare', '루틴', 'routine', '모닝루틴', '나이트루틴']],
  ['제품리뷰', ['리뷰', 'review', '솔직', '언박싱', '추천', '비교', '찐템', '인생템']],
  ['하울', ['하울', 'haul', '쇼핑', '올리브영', '다이소', '구매템']],
  ['튜토리얼', ['tutorial', '튜토리얼', '하는법', '방법', 'how to']],
  ['연예인', ['아이돌', '연예인', '셀럽', 'idol', 'celebrity', '따라하기']],
  ['K뷰티반응', ['k-beauty', 'k beauty', 'korean', '한국', 'reaction', '반응']],
  ['후킹형', ['충격', '역대급', '난리', '대박', '미쳤', '레전드', '혜자']],
  ['비포애프터', ['before', 'after', '비포', '애프터', '전후', '변신']],
]

export function detectTag(text: string): string {
  for (const [tag, keywords] of TAG_RULES) {
    if (keywords.some((kw) => text.includes(kw))) return tag
  }
  return '기타'
}
