export function Header() {
  return (
    <header className="border-b border-glass-border bg-dark-800/80 backdrop-blur-xl sticky top-0 z-50">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-4 flex items-center gap-3">
        <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-accent to-pink-400 flex items-center justify-center">
          <span className="text-white text-sm font-bold">B</span>
        </div>
        <h1 className="text-lg font-bold text-white tracking-tight">
          Beauty Ref
        </h1>
        <span className="text-xs text-subtle font-medium ml-1">
          Shortform
        </span>
      </div>
    </header>
  )
}
