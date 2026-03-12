export function calcEngagementRate(
  likeCount: number,
  commentCount: number,
  viewCount: number,
): number {
  if (viewCount === 0) return 0
  return ((likeCount + commentCount) / viewCount) * 100
}
