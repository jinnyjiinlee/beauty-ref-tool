import { describe, it, expect } from 'vitest'
import { generateCsv } from './csv'
import type { SavedReference } from '../types'

const mockRef: SavedReference = {
  id: '1',
  videoId: 'abc123',
  title: '테스트 영상',
  description: '설명',
  thumbnailUrl: 'https://example.com/thumb.jpg',
  channelTitle: '테스트 채널',
  publishedAt: '2024-06-15T00:00:00Z',
  viewCount: 1000000,
  likeCount: 50000,
  commentCount: 2000,
  engagementRate: 5.2,
  formatTag: '리뷰',
  keywords: ['립스틱', '추천'],
  savedAt: '2024-07-01T00:00:00Z',
  memo: '좋은 영상',
}

describe('generateCsv', () => {
  it('헤더 행을 포함한다', () => {
    const csv = generateCsv([mockRef])
    const header = csv.split('\n')[0]
    expect(header).toContain('제목')
    expect(header).toContain('채널명')
    expect(header).toContain('조회수')
  })

  it('데이터 행을 올바르게 생성한다', () => {
    const csv = generateCsv([mockRef])
    const rows = csv.split('\n')
    expect(rows).toHaveLength(2)
    expect(rows[1]).toContain('테스트 영상')
    expect(rows[1]).toContain('1000000')
  })

  it('빈 배열이면 헤더만 반환한다', () => {
    const csv = generateCsv([])
    const rows = csv.split('\n')
    expect(rows).toHaveLength(1)
  })

  it('쉼표가 포함된 필드를 이스케이프한다', () => {
    const refWithComma = { ...mockRef, title: '립스틱, 추천' }
    const csv = generateCsv([refWithComma])
    expect(csv).toContain('"립스틱, 추천"')
  })
})
