// Supabase Edge Function: YouTube 검색
// Deno Deploy 런타임에서 실행됨

const YOUTUBE_API_BASE = 'https://www.googleapis.com/youtube/v3'

interface RequestBody {
  keywords: string[]
  minViewCount: number
  publishedAfter: string
  publishedBefore: string
}

interface VideoResult {
  videoId: string
  title: string
  description: string
  thumbnailUrl: string
  channelTitle: string
  publishedAt: string
  viewCount: number
  likeCount: number
  commentCount: number
  engagementRate: number
  formatTag: string
}

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders() })
  }

  try {
    const body: RequestBody = await req.json()
    const apiKey = Deno.env.get('YOUTUBE_API_KEY')

    if (!apiKey) {
      return jsonResponse({ error: 'YouTube API 키가 설정되지 않았습니다' }, 500)
    }

    const allResults: VideoResult[] = []

    for (const keyword of body.keywords) {
      const videos = await searchAndEnrich(
        apiKey,
        keyword,
        body.publishedAfter,
        body.publishedBefore,
      )
      allResults.push(...videos)
    }

    const filtered = allResults
      .filter((v) => v.viewCount >= body.minViewCount)
      .sort((a, b) => b.viewCount - a.viewCount)

    const unique = deduplicateByVideoId(filtered)

    return jsonResponse({ results: unique })
  } catch (err) {
    const message = err instanceof Error ? err.message : '알 수 없는 오류'
    return jsonResponse({ error: message }, 500)
  }
})

async function searchAndEnrich(
  apiKey: string,
  keyword: string,
  publishedAfter: string,
  publishedBefore: string,
): Promise<VideoResult[]> {
  const searchUrl = buildSearchUrl(apiKey, keyword, publishedAfter, publishedBefore)
  const searchRes = await fetch(searchUrl)
  const searchData = await searchRes.json()

  const videoIds: string[] = (searchData.items ?? [])
    .map((item: { id?: { videoId?: string } }) => item.id?.videoId)
    .filter(Boolean)

  if (videoIds.length === 0) return []

  return fetchVideoDetails(apiKey, videoIds)
}

function buildSearchUrl(
  apiKey: string,
  keyword: string,
  publishedAfter: string,
  publishedBefore: string,
): string {
  const params = new URLSearchParams({
    part: 'snippet',
    q: keyword,
    type: 'video',
    videoDuration: 'short',
    maxResults: '50',
    order: 'viewCount',
    publishedAfter,
    publishedBefore,
    key: apiKey,
  })
  return `${YOUTUBE_API_BASE}/search?${params}`
}

async function fetchVideoDetails(
  apiKey: string,
  videoIds: string[],
): Promise<VideoResult[]> {
  const params = new URLSearchParams({
    part: 'snippet,statistics',
    id: videoIds.join(','),
    key: apiKey,
  })

  const res = await fetch(`${YOUTUBE_API_BASE}/videos?${params}`)
  const data = await res.json()

  return (data.items ?? []).map(mapToVideoResult)
}

function mapToVideoResult(item: {
  id: string
  snippet: {
    title: string
    description: string
    thumbnails: { high?: { url: string } }
    channelTitle: string
    publishedAt: string
  }
  statistics: {
    viewCount?: string
    likeCount?: string
    commentCount?: string
  }
}): VideoResult {
  const views = parseInt(item.statistics.viewCount ?? '0', 10)
  const likes = parseInt(item.statistics.likeCount ?? '0', 10)
  const comments = parseInt(item.statistics.commentCount ?? '0', 10)
  const engagement = views > 0 ? ((likes + comments) / views) * 100 : 0
  const text = `${item.snippet.title} ${item.snippet.description}`.toLowerCase()

  return {
    videoId: item.id,
    title: item.snippet.title,
    description: item.snippet.description,
    thumbnailUrl: item.snippet.thumbnails.high?.url ?? '',
    channelTitle: item.snippet.channelTitle,
    publishedAt: item.snippet.publishedAt,
    viewCount: views,
    likeCount: likes,
    commentCount: comments,
    engagementRate: Math.round(engagement * 100) / 100,
    formatTag: detectTag(text),
  }
}

function detectTag(text: string): string {
  const rules: [string, string[]][] = [
    ['ASMR', ['asmr', '에이에스엠알', '팅글']],
    ['루틴', ['루틴', 'routine', '모닝', '나이트', '겟레디', 'grwm']],
    ['리뷰', ['리뷰', 'review', '솔직', '언박싱', '하울', '추천', '비교']],
    ['후킹형', ['충격', '역대급', '난리', '대박', '미쳤', '레전드', '혜자']],
  ]
  for (const [tag, keywords] of rules) {
    if (keywords.some((kw) => text.includes(kw))) return tag
  }
  return '기타'
}

function deduplicateByVideoId(videos: VideoResult[]): VideoResult[] {
  const seen = new Set<string>()
  return videos.filter((v) => {
    if (seen.has(v.videoId)) return false
    seen.add(v.videoId)
    return true
  })
}

function corsHeaders(): Record<string, string> {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers':
      'authorization, x-client-info, apikey, content-type',
  }
}

function jsonResponse(
  body: Record<string, unknown>,
  status = 200,
): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', ...corsHeaders() },
  })
}
