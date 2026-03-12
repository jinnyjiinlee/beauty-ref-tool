import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { FormatBadge } from './FormatBadge'

describe('FormatBadge', () => {
  it('태그 텍스트를 렌더링한다', () => {
    render(<FormatBadge tag="ASMR" />)
    expect(screen.getByText('ASMR')).toBeInTheDocument()
  })

  it('리뷰 태그를 렌더링한다', () => {
    render(<FormatBadge tag="리뷰" />)
    expect(screen.getByText('리뷰')).toBeInTheDocument()
  })

  it('기타 태그를 렌더링한다', () => {
    render(<FormatBadge tag="기타" />)
    expect(screen.getByText('기타')).toBeInTheDocument()
  })
})
