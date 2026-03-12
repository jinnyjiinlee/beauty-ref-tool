import type { SavedReference } from '../types'
import { generateCsv, downloadCsv } from '../utils'
import { cn } from '../utils/cn'

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
      className={cn(
        'rounded-lg bg-dark-700 border border-glass-border px-4 py-2',
        'text-xs font-medium text-subtle',
        'hover:bg-dark-600 hover:text-white transition-all',
        'disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-dark-700',
      )}
    >
      CSV Export ({references.length})
    </button>
  )
}
