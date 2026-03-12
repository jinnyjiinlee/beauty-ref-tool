import { useState } from 'react'
import { SearchBar } from './components/SearchBar'
import { VideoGrid } from './components/VideoGrid'
import { ReferenceList } from './components/ReferenceList'
import { ExportButton } from './components/ExportButton'
import { useSearch } from './hooks/useSearch'
import { useReferences } from './hooks/useReferences'
import { cn } from './utils/cn'

type Tab = 'search' | 'saved'

function App() {
  const [activeTab, setActiveTab] = useState<Tab>('search')
  const [lastKeywords, setLastKeywords] = useState<string[]>([])

  const { results, isLoading, error, search } = useSearch()
  const refs = useReferences()

  const handleSearch = async (filters: Parameters<typeof search>[0]) => {
    setLastKeywords(filters.keywords)
    await search(filters)
  }

  return (
    <div className="min-h-screen bg-dark-900">
      <Header />
      <Nav activeTab={activeTab} onTabChange={(tab) => {
        setActiveTab(tab)
        if (tab === 'saved') void refs.refresh()
      }} />

      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        {activeTab === 'search' && (
          <div className="space-y-8 animate-fade-in">
            <SearchBar onSearch={handleSearch} isLoading={isLoading} />
            {error && <ErrorBanner message={error} />}
            {results.length > 0 && (
              <p className="text-sm text-subtle">
                {results.length}개의 숏폼을 찾았습니다
              </p>
            )}
            <VideoGrid videos={results} searchKeywords={lastKeywords} isLoading={isLoading} />
          </div>
        )}

        {activeTab === 'saved' && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-white">
                저장된 레퍼런스
              </h2>
              <ExportButton references={refs.references} />
            </div>
            {refs.error && <ErrorBanner message={refs.error} />}
            <ReferenceList
              references={refs.references}
              isLoading={refs.isLoading}
              activeTag={refs.activeTag}
              onFilterTag={refs.filterByTag}
              onDelete={(id) => void refs.remove(id)}
            />
          </div>
        )}
      </main>
    </div>
  )
}

function Header() {
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

interface NavProps {
  activeTab: Tab
  onTabChange: (tab: Tab) => void
}

function Nav({ activeTab, onTabChange }: NavProps) {
  return (
    <nav className="border-b border-glass-border bg-dark-800/50 backdrop-blur-md">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 flex gap-1">
        <TabButton
          label="검색"
          active={activeTab === 'search'}
          onClick={() => onTabChange('search')}
        />
        <TabButton
          label="저장됨"
          active={activeTab === 'saved'}
          onClick={() => onTabChange('saved')}
        />
      </div>
    </nav>
  )
}

interface TabButtonProps {
  label: string
  active: boolean
  onClick: () => void
}

function TabButton({ label, active, onClick }: TabButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'relative px-5 py-3 text-sm font-medium transition-colors',
        active ? 'text-white' : 'text-subtle hover:text-white',
      )}
    >
      {label}
      {active && (
        <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent rounded-full" />
      )}
    </button>
  )
}

function ErrorBanner({ message }: { message: string }) {
  return (
    <div className="rounded-xl bg-red-500/10 border border-red-500/20 p-4 text-sm text-red-400">
      {message}
    </div>
  )
}

export default App
