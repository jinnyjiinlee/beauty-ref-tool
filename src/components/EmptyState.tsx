import { cn } from '../utils/cn'

interface EmptyStateProps {
  hasSearched?: boolean
}

export function EmptyState({ hasSearched }: EmptyStateProps) {
  if (hasSearched) {
    return <NoResults />
  }
  return <InitialGuide />
}

function NoResults() {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className={cn(
        'w-16 h-16 rounded-2xl mb-5',
        'bg-dark-700 border border-glass-border',
        'flex items-center justify-center',
      )}>
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="text-dark-400">
          <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
          <path d="m16 16 4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M9 9l4 4M13 9l-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </div>
      <h3 className="text-base font-semibold text-white mb-2">
        조건에 맞는 영상이 없습니다
      </h3>
      <p className="text-sm text-subtle max-w-xs">
        조회수 기준을 낮추거나 기간을 넓혀보세요
      </p>
    </div>
  )
}

function InitialGuide() {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className={cn(
        'w-20 h-20 rounded-2xl mb-6',
        'bg-gradient-to-br from-accent/20 to-pink-400/10',
        'border border-accent/20',
        'flex items-center justify-center',
      )}>
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className="text-accent">
          <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
          <path d="m16 16 4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>

      <h3 className="text-base font-semibold text-white mb-2">
        검색 결과가 여기에 표시됩니다
      </h3>
      <p className="text-sm text-subtle mb-8 max-w-sm">
        위 검색바에서 키워드를 입력하거나
        추천 키워드를 클릭해보세요
      </p>

      <div className="flex items-center gap-8">
        <Step num="1" text="키워드 입력" />
        <Arrow />
        <Step num="2" text="필터 설정" />
        <Arrow />
        <Step num="3" text="분석 & 저장" />
      </div>
    </div>
  )
}

function Step({ num, text }: { num: string; text: string }) {
  return (
    <div className="flex flex-col items-center gap-1.5">
      <div className={cn(
        'w-8 h-8 rounded-full flex items-center justify-center',
        'bg-dark-700 border border-glass-border text-xs font-bold text-accent',
      )}>
        {num}
      </div>
      <span className="text-[11px] text-dark-400">{text}</span>
    </div>
  )
}

function Arrow() {
  return (
    <svg width="20" height="12" viewBox="0 0 20 12" className="text-dark-500 -mt-4">
      <path d="M0 6h16m0 0-4-4m4 4-4 4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
