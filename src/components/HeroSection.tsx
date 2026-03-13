import { cn } from '../utils/cn'

export function HeroSection() {
  return (
    <div className={cn(
      'relative rounded-2xl overflow-hidden',
      'bg-gradient-to-br from-accent/10 via-dark-800 to-pink-400/5',
      'border border-glass-border p-8 sm:p-10',
    )}>
      <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-pink-400/5 rounded-full blur-3xl" />

      <div className="relative space-y-3">
        <h2 className="text-2xl sm:text-3xl font-bold text-white leading-tight">
          뷰티 숏폼 트렌드를
          <br />
          <span className="text-accent">한눈에</span> 분석하세요
        </h2>
        <p className="text-sm text-subtle max-w-md leading-relaxed">
          키워드 검색으로 인기 뷰티 숏폼을 찾고,
          조회수/참여율/댓글을 비교 분석하세요.
          국가별 트렌드도 한번에 확인할 수 있습니다.
        </p>
        <div className="flex items-center gap-4 pt-2">
          <Stat value="8개국" label="국가 필터" />
          <Divider />
          <Stat value="실시간" label="YouTube 데이터" />
          <Divider />
          <Stat value="11가지" label="포맷 분류" />
        </div>
      </div>
    </div>
  )
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <p className="text-sm font-bold text-white">{value}</p>
      <p className="text-[11px] text-dark-400">{label}</p>
    </div>
  )
}

function Divider() {
  return <div className="w-px h-8 bg-glass-border" />
}
