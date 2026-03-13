import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { StatsSummary } from './StatsSummary'
import type { SearchStats } from '../types'

describe('StatsSummary', () => {
  it('renders nothing when totalResults is 0', () => {
    const stats: SearchStats = { avgViewCount: 0, avgEngagement: 0, uniqueChannels: 0, totalResults: 0 }
    const { container } = render(<StatsSummary stats={stats} />)
    expect(container.innerHTML).toBe('')
  })

  it('displays all stat cards', () => {
    const stats: SearchStats = {
      avgViewCount: 1500000,
      avgEngagement: 4.5,
      uniqueChannels: 12,
      totalResults: 25,
    }
    render(<StatsSummary stats={stats} />)
    expect(screen.getByText('1.5M')).toBeDefined()
    expect(screen.getByText('4.5%')).toBeDefined()
    expect(screen.getByText('12')).toBeDefined()
    expect(screen.getByText('25편')).toBeDefined()
  })
})
