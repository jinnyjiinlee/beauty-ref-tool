import type { SavedReference } from '../types'
import { generateCsv, downloadCsv } from '../utils'

interface ExportButtonProps {
  references: SavedReference[]
}

export function ExportButton({ references }: ExportButtonProps) {
  const handleExport = () => {
    if (references.length === 0) return
    const csv = generateCsv(references)
    const date = new Date().toISOString().slice(0, 10)
    downloadCsv(csv, `beauty-references-${date}.csv`)
  }

  return (
    <button
      onClick={handleExport}
      disabled={references.length === 0}
      className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      CSV 내보내기 ({references.length}건)
    </button>
  )
}
