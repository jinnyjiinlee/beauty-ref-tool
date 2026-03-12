import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ExportButton } from './ExportButton'

describe('ExportButton', () => {
  it('레퍼런스 수를 표시한다', () => {
    render(<ExportButton references={[]} />)
    expect(screen.getByText('CSV Export (0)')).toBeInTheDocument()
  })

  it('레퍼런스가 없으면 비활성화된다', () => {
    render(<ExportButton references={[]} />)
    expect(screen.getByRole('button')).toBeDisabled()
  })
})
