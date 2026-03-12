import type { SavedReference } from '../types'

const CSV_HEADERS = [
  '제목',
  '채널명',
  '조회수',
  '참여율(%)',
  '좋아요',
  '댓글수',
  '포맷태그',
  '게시일',
  '키워드',
  '메모',
  'URL',
]

function escapeCsvField(field: string): string {
  if (field.includes(',') || field.includes('"') || field.includes('\n')) {
    return `"${field.replace(/"/g, '""')}"`
  }
  return field
}

export function generateCsv(references: SavedReference[]): string {
  const header = CSV_HEADERS.join(',')
  const rows = references.map((ref) =>
    [
      escapeCsvField(ref.title),
      escapeCsvField(ref.channelTitle),
      ref.viewCount,
      ref.engagementRate.toFixed(2),
      ref.likeCount,
      ref.commentCount,
      ref.formatTag,
      ref.publishedAt,
      escapeCsvField(ref.keywords.join('; ')),
      escapeCsvField(ref.memo),
      `https://youtube.com/watch?v=${ref.videoId}`,
    ].join(','),
  )
  return [header, ...rows].join('\n')
}

export function downloadCsv(csv: string, filename: string): void {
  const bom = '\uFEFF'
  const blob = new Blob([bom + csv], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  link.click()
  URL.revokeObjectURL(url)
}
