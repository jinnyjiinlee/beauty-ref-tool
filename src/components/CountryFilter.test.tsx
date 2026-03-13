import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { CountryFilter } from './CountryFilter'

describe('CountryFilter', () => {
  it('renders all country presets', () => {
    render(<CountryFilter selectedCode="KR" onChange={vi.fn()} />)
    expect(screen.getByText(/한국/)).toBeDefined()
    expect(screen.getByText(/미국/)).toBeDefined()
    expect(screen.getByText(/일본/)).toBeDefined()
  })

  it('calls onChange with code and language when clicked', () => {
    const onChange = vi.fn()
    render(<CountryFilter selectedCode="KR" onChange={onChange} />)
    fireEvent.click(screen.getByText(/미국/))
    expect(onChange).toHaveBeenCalledWith('US', 'en')
  })

  it('highlights the selected country', () => {
    render(<CountryFilter selectedCode="JP" onChange={vi.fn()} />)
    const jpBtn = screen.getByText(/일본/)
    expect(jpBtn.className).toContain('text-accent')
  })
})
