-- 저장된 레퍼런스 테이블
CREATE TABLE IF NOT EXISTS saved_references (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  video_id TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT DEFAULT '',
  thumbnail_url TEXT NOT NULL,
  channel_title TEXT NOT NULL,
  published_at TIMESTAMPTZ NOT NULL,
  view_count INTEGER NOT NULL DEFAULT 0,
  like_count INTEGER NOT NULL DEFAULT 0,
  comment_count INTEGER NOT NULL DEFAULT 0,
  engagement_rate NUMERIC(6, 4) NOT NULL DEFAULT 0,
  format_tag TEXT NOT NULL DEFAULT '기타',
  keywords TEXT[] DEFAULT '{}',
  memo TEXT DEFAULT '',
  saved_at TIMESTAMPTZ DEFAULT NOW(),

  CONSTRAINT valid_format_tag CHECK (
    format_tag IN ('ASMR', '루틴', '리뷰', '후킹형', '기타')
  )
);

-- 중복 저장 방지
CREATE UNIQUE INDEX IF NOT EXISTS idx_saved_references_video_id
  ON saved_references (video_id);

-- 조회수 필터 인덱스
CREATE INDEX IF NOT EXISTS idx_saved_references_view_count
  ON saved_references (view_count DESC);

-- 저장일 정렬 인덱스
CREATE INDEX IF NOT EXISTS idx_saved_references_saved_at
  ON saved_references (saved_at DESC);

-- 포맷 태그 필터 인덱스
CREATE INDEX IF NOT EXISTS idx_saved_references_format_tag
  ON saved_references (format_tag);
