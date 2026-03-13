import { cn } from '../utils/cn'

type ViewMode = 'grid' | 'list'

interface ViewToggleProps {
  mode: ViewMode
  onChange: (mode: ViewMode) => void
}

export function ViewToggle({ mode, onChange }: ViewToggleProps) {
  return (
    <div className="flex rounded-lg border border-glass-border overflow-hidden">
      <ToggleButton
        active={mode === 'grid'}
        onClick={() => onChange('grid')}
        label="Grid"
      />
      <ToggleButton
        active={mode === 'list'}
        onClick={() => onChange('list')}
        label="List"
      />
    </div>
  )
}

interface ToggleButtonProps {
  active: boolean
  onClick: () => void
  label: string
}

function ToggleButton({ active, onClick, label }: ToggleButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'px-3 py-1.5 text-xs font-medium transition-colors',
        active
          ? 'bg-accent/15 text-accent'
          : 'bg-dark-700 text-dark-400 hover:text-white',
      )}
    >
      {label}
    </button>
  )
}
