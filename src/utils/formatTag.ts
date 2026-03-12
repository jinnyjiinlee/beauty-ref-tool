import type { FormatTag } from '../types'
import { FORMAT_TAG_RULES, DEFAULT_TAG } from '../constants'

export function detectFormatTag(title: string, description: string): FormatTag {
  const text = `${title} ${description}`.toLowerCase()

  for (const rule of FORMAT_TAG_RULES) {
    const matched = rule.keywords.some((kw) =>
      text.includes(kw.toLowerCase()),
    )
    if (matched) {
      return rule.tag
    }
  }

  return DEFAULT_TAG
}
