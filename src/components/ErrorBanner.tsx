import { useState } from 'react'
import { cn } from '../utils/cn'

interface ErrorBannerProps {
  message: string
}

export function ErrorBanner({ message }: ErrorBannerProps) {
  const [dismissed, setDismissed] = useState(false)
  if (dismissed) return null

  return (
    <div className={cn(
      'flex items-start gap-3 rounded-xl bg-red-500/10 border border-red-500/20 p-4',
      'animate-fade-in',
    )}>
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-red-400 shrink-0 mt-0.5">
        <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
        <path d="M8 5v3.5M8 10.5v.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
      <p className="flex-1 text-sm text-red-400">{message}</p>
      <button
        onClick={() => setDismissed(true)}
        className="text-red-400/50 hover:text-red-400 transition-colors shrink-0"
        aria-label="닫기"
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M3 3l8 8M11 3l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>
    </div>
  )
}
