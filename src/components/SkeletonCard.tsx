export function SkeletonCard() {
  return (
    <div className="rounded-xl bg-dark-800 border border-glass-border overflow-hidden">
      <div className="w-full aspect-video skeleton" />
      <div className="p-3.5 space-y-3">
        <div className="h-4 w-4/5 skeleton" />
        <div className="h-3 w-2/5 skeleton" />
        <div className="h-3 w-3/5 skeleton" />
        <div className="h-8 w-full skeleton mt-2" />
      </div>
    </div>
  )
}
