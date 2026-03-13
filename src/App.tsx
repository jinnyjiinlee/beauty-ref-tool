import { useState, useMemo, useRef } from 'react'
import { Header } from './components/Header'
import { Nav } from './components/Nav'
import { ErrorBanner } from './components/ErrorBanner'
import { SearchBar } from './components/SearchBar'
import { VideoGrid } from './components/VideoGrid'
import { StatsSummary } from './components/StatsSummary'
import { SortDropdown } from './components/SortDropdown'
import { ViewToggle } from './components/ViewToggle'
import { ChannelList } from './components/ChannelList'
import { FormatStatsPanel } from './components/FormatStatsPanel'
import { ChannelRanking } from './components/ChannelRanking'
import { HeroSection } from './components/HeroSection'
import { ScrollToTop } from './components/ScrollToTop'
import { useSearch } from './hooks/useSearch'
import { useChannels } from './hooks/useChannels'
import { calcSearchStats, sortVideos, calcFormatStats, calcChannelRanking } from './utils'
import { DEFAULT_SORT, DEFAULT_COUNTRY_CODE } from './constants'
import { COUNTRY_PRESETS } from './constants'
import { getDateMonthsAgo } from './utils'
import type { SortKey, SearchFilters } from './types'

type Tab = 'search' | 'channels'
type ViewMode = 'grid' | 'list'

function App() {
  const [activeTab, setActiveTab] = useState<Tab>('search')
  const [lastKeywords, setLastKeywords] = useState<string[]>([])
  const [sortKey, setSortKey] = useState<SortKey>(DEFAULT_SORT)
  const [viewMode, setViewMode] = useState<ViewMode>('grid')
  const [channelLabel, setChannelLabel] = useState<string | null>(null)
  const [hasSearched, setHasSearched] = useState(false)
  const resultsRef = useRef<HTMLDivElement>(null)

  const { results, isLoading, error, search } = useSearch()
  const chs = useChannels()

  const stats = useMemo(() => calcSearchStats(results), [results])
  const formatStats = useMemo(() => calcFormatStats(results), [results])
  const channelRanking = useMemo(() => calcChannelRanking(results), [results])
  const sortedResults = useMemo(() => sortVideos(results, sortKey), [results, sortKey])

  const handleSearch = async (filters: SearchFilters) => {
    setLastKeywords(filters.keywords)
    setChannelLabel(null)
    setHasSearched(true)
    await search(filters)
    resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const handleChannelDig = async (channelId: string, channelTitle: string) => {
    setChannelLabel(channelTitle)
    setActiveTab('search')
    const defaultLang = COUNTRY_PRESETS.find((c) => c.code === DEFAULT_COUNTRY_CODE)
    const filters: SearchFilters = {
      keywords: [''],
      minViewCount: 0,
      publishedAfter: getDateMonthsAgo(12),
      publishedBefore: new Date().toISOString(),
      regionCode: DEFAULT_COUNTRY_CODE,
      relevanceLanguage: defaultLang?.language ?? 'ko',
      channelId,
    }
    setLastKeywords([channelTitle])
    await search(filters)
  }

  const handleChannelClick = async (channelId: string, channelTitle: string) => {
    try { await chs.add(channelId, channelTitle) } catch { /* ignore */ }
    void handleChannelDig(channelId, channelTitle)
  }

  return (
    <div className="min-h-screen bg-dark-900">
      <Header />
      <Nav
        activeTab={activeTab}
        resultCount={results.length}
        channelCount={chs.channels.length}
        onTabChange={(tab) => {
          setActiveTab(tab)
          if (tab === 'channels') void chs.refresh()
        }}
      />

      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        {activeTab === 'search' && (
          <div className="space-y-6 animate-fade-in">
            {results.length === 0 && !isLoading && <HeroSection />}
            <SearchBar onSearch={handleSearch} isLoading={isLoading} />
            {error && <ErrorBanner message={error} />}
            {channelLabel && (
              <ChannelBanner label={channelLabel} onClear={() => setChannelLabel(null)} />
            )}
            <StatsSummary stats={stats} />
            {formatStats.length > 0 && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <FormatStatsPanel stats={formatStats} />
                <ChannelRanking channels={channelRanking} onChannelClick={handleChannelClick} />
              </div>
            )}
            {sortedResults.length > 0 && (
              <div className="flex items-center justify-between">
                <p className="text-sm text-subtle">
                  {sortedResults.length}편의 숏폼
                </p>
                <div className="flex items-center gap-3">
                  <SortDropdown value={sortKey} onChange={setSortKey} />
                  <ViewToggle mode={viewMode} onChange={setViewMode} />
                </div>
              </div>
            )}
            <div ref={resultsRef}>
              <VideoGrid
                videos={sortedResults}
                searchKeywords={lastKeywords}
                isLoading={isLoading}
                viewMode={viewMode}
                onChannelClick={handleChannelClick}
                hasSearched={hasSearched}
              />
            </div>
          </div>
        )}

        {activeTab === 'channels' && (
          <div className="space-y-6 animate-fade-in">
            <div>
              <h2 className="text-lg font-semibold text-white">즐겨찾기 채널</h2>
              <p className="text-xs text-dark-400 mt-1">클릭하면 해당 채널의 영상을 검색합니다</p>
            </div>
            {chs.error && <ErrorBanner message={chs.error} />}
            <ChannelList
              channels={chs.channels}
              isLoading={chs.isLoading}
              onDigChannel={handleChannelDig}
              onDelete={(id) => void chs.remove(id)}
            />
          </div>
        )}
      </main>
      <ScrollToTop />
    </div>
  )
}

function ChannelBanner({ label, onClear }: { label: string; onClear: () => void }) {
  return (
    <div className="flex items-center gap-2 rounded-xl bg-accent/10 border border-accent/20 px-4 py-2.5">
      <span className="text-sm text-accent font-medium">
        채널 디깅: {label}
      </span>
      <button
        onClick={onClear}
        className="ml-auto text-xs text-dark-400 hover:text-white transition-colors"
      >
        닫기
      </button>
    </div>
  )
}

export default App
