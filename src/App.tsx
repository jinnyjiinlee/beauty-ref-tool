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
    <div className="min-h-screen bg-gray-50">
      <header className="border-b bg-white">
        <div className="mx-auto max-w-5xl px-4 py-4">
          <h1 className="text-xl font-bold text-pink-600">
            Beauty Shortform Reference
          </h1>
        </div>
      </header>

      <nav className="border-b bg-white">
        <div className="mx-auto max-w-5xl px-4 flex gap-4">
          <TabButton
            label="검색"
            active={activeTab === 'search'}
            onClick={() => setActiveTab('search')}
          />
          <TabButton
            label="저장된 레퍼런스"
            active={activeTab === 'saved'}
            onClick={() => { setActiveTab('saved'); void refs.refresh() }}
          />
        </div>
      </nav>

      <main className="mx-auto max-w-5xl px-4 py-6 space-y-6">
        {activeTab === 'search' && (
          <>
            <SearchBar onSearch={handleSearch} isLoading={isLoading} />
            {error && (
              <p className="rounded-lg bg-red-50 p-4 text-sm text-red-600">
                {error}
              </p>
            )}
            {results.length > 0 && (
              <p className="text-sm text-gray-500">
                검색 결과 {results.length}건
              </p>
            )}
            <VideoGrid videos={results} searchKeywords={lastKeywords} />
          </>
        )}

        {activeTab === 'saved' && (
          <>
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">저장된 레퍼런스</h2>
              <ExportButton references={refs.references} />
            </div>
            {refs.error && (
              <p className="rounded-lg bg-red-50 p-4 text-sm text-red-600">
                {refs.error}
              </p>
            )}
            <ReferenceList
              references={refs.references}
              isLoading={refs.isLoading}
              activeTag={refs.activeTag}
              onFilterTag={refs.filterByTag}
              onDelete={(id) => void refs.remove(id)}
            />
          </>
        )}
      </main>
    </div>
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
        'border-b-2 px-4 py-3 text-sm font-medium',
        active
          ? 'border-pink-500 text-pink-600'
          : 'border-transparent text-gray-500 hover:text-gray-700',
      )}
    >
      {label}
    </button>
  )
}

export default App
