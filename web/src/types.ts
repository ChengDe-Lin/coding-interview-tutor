export type PatternStatus = '未開始' | '學習中' | '需複習' | '已掌握'
export type ConfusionStatus = '需複習' | '已修正'

export interface PatternFrontmatter {
  last_updated: string | null
  status: PatternStatus
  tier: number | null
}

export interface PatternFile {
  slug: string
  name: string
  content: string
  frontmatter: PatternFrontmatter
}

export interface DataStructureFile {
  slug: string
  name: string
  content: string
}

export interface DeepDiveFile {
  slug: string
  name: string
  content: string
}

export interface RoadmapEntry {
  pattern: string
  status: PatternStatus
  lastStudied: string
  problemCount: number
  noteLink: string | null
}

export interface RoadmapTier {
  tier: number
  title: string
  description: string
  entries: RoadmapEntry[]
}

export interface ConfusionEntry {
  date: string
  topic: string
  blindSpot: string
  correction: string
  status: ConfusionStatus
  reviewAdvice: string
}

export type Page =
  | { type: 'dashboard' }
  | { type: 'roadmap' }
  | { type: 'pattern'; slug: string }
  | { type: 'data-structure'; slug: string }
  | { type: 'cheatsheet' }
  | { type: 'decision-tree' }
  | { type: 'example'; slug: string }
  | { type: 'confusion-ledger' }
  | { type: 'deep-dive'; slug: string }
