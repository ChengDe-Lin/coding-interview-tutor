import type {
  PatternFile,
  PatternFrontmatter,
  DataStructureFile,
  DeepDiveFile,
  RoadmapTier,
  RoadmapEntry,
  ConfusionEntry,
  PatternStatus,
  ConfusionStatus,
} from './types'

// --- Lightweight frontmatter parser (no gray-matter — it needs Node.js builtins) ---

function parseFrontmatter(raw: string): { data: Record<string, string>; content: string } {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/)
  if (!match) return { data: {}, content: raw }
  const data: Record<string, string> = {}
  for (const line of match[1].split('\n')) {
    const idx = line.indexOf(':')
    if (idx > 0) {
      const key = line.slice(0, idx).trim()
      const val = line.slice(idx + 1).trim()
      data[key] = val
    }
  }
  return { data, content: match[2] }
}

// --- Raw markdown loading via Vite glob ---

const patternMds = import.meta.glob('../../patterns/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>

const dataStructureMds = import.meta.glob('../../data_structures/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>

const deepDiveMds = import.meta.glob('../../deep_dives/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>

const cheatsheetMd = import.meta.glob('../../cheatsheets/master.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>

const decisionTreeMd = import.meta.glob('../../cheatsheets/pattern_decision_tree.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>

const exampleMds = import.meta.glob('../../cheatsheets/examples/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>

const roadmapMd = import.meta.glob('../../roadmap.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>

const confusionMd = import.meta.glob('../../assessments/confusion_ledger.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>

// --- Helpers ---

function slugFromPath(path: string): string {
  const filename = path.split('/').pop() || ''
  return filename.replace(/\.md$/, '')
}

function nameFromSlug(slug: string): string {
  return slug
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase())
}

function extractH1(content: string): string | null {
  const match = content.match(/^#\s+(.+)$/m)
  return match ? match[1].trim() : null
}

// --- Pattern files ---

export function getPatterns(): PatternFile[] {
  return Object.entries(patternMds)
    .filter(([path]) => !path.includes('_template'))
    .map(([path, raw]) => {
      const { data, content } = parseFrontmatter(raw)
      const slug = slugFromPath(path)
      const fm = data as Partial<PatternFrontmatter>
      return {
        slug,
        name: extractH1(content) || nameFromSlug(slug),
        content,
        frontmatter: {
          last_updated: fm.last_updated ? String(fm.last_updated) : null,
          status: (fm.status as PatternStatus) || '未開始',
          tier: fm.tier ? Number(fm.tier) : null,
        },
      }
    })
}

// --- Data structure files ---

export function getDataStructures(): DataStructureFile[] {
  return Object.entries(dataStructureMds)
    .filter(([path]) => !path.includes('_template'))
    .map(([path, raw]) => {
      const { content } = parseFrontmatter(raw)
      const slug = slugFromPath(path)
      return {
        slug,
        name: extractH1(content) || nameFromSlug(slug),
        content,
      }
    })
}

// --- Deep dive files ---

export function getDeepDives(): DeepDiveFile[] {
  return Object.entries(deepDiveMds)
    .map(([path, raw]) => {
      const { content } = parseFrontmatter(raw)
      const slug = slugFromPath(path)
      return {
        slug,
        name: extractH1(content) || nameFromSlug(slug),
        content,
      }
    })
}

// --- Cheat sheet ---

export function getCheatSheet(): string {
  const raw = Object.values(cheatsheetMd)[0]
  if (!raw) return ''
  const { content } = parseFrontmatter(raw)
  return content
}

// --- Decision tree ---

export function getDecisionTree(): string {
  const raw = Object.values(decisionTreeMd)[0]
  if (!raw) return ''
  const { content } = parseFrontmatter(raw)
  return content
}

// --- Pattern examples ---

export interface ExampleFile {
  slug: string
  name: string
  content: string
}

const exampleNameMap: Record<string, string> = {
  fundamentals: '基礎 (Two Pointers, BS, SW)',
  stack_queue_heap: 'Stack / Queue / Heap',
  dp: 'Dynamic Programming',
  graph: 'Graph',
  advanced: '進階技巧',
  linked_list: 'Linked List',
  tier3_advanced: 'Tier 3 — 睡前故事',
}

export function getExamples(): ExampleFile[] {
  return Object.entries(exampleMds)
    .map(([path, raw]) => {
      const { content } = parseFrontmatter(raw)
      const slug = slugFromPath(path)
      return {
        slug,
        name: exampleNameMap[slug] || nameFromSlug(slug),
        content,
      }
    })
    .sort((a, b) => {
      const order = Object.keys(exampleNameMap)
      return order.indexOf(a.slug) - order.indexOf(b.slug)
    })
}

// --- Roadmap parsing ---

const STATUS_VALUES: PatternStatus[] = ['未開始', '學習中', '需複習', '已掌握']

function parseRoadmapTable(lines: string[]): RoadmapEntry[] {
  const dataLines = lines.filter(
    (l) => l.startsWith('|') && !l.includes('---') && !l.includes('Pattern')
  )
  return dataLines.map((line) => {
    const cells = line
      .split('|')
      .map((c) => c.trim())
      .filter(Boolean)
    const linkMatch = cells[4]?.match(/\[.*?\]\((.*?)\)/)
    return {
      pattern: cells[0] || '',
      status: STATUS_VALUES.includes(cells[1] as PatternStatus)
        ? (cells[1] as PatternStatus)
        : '未開始',
      lastStudied: cells[2] || '—',
      problemCount: parseInt(cells[3] || '0', 10) || 0,
      noteLink: linkMatch ? linkMatch[1] : null,
    }
  })
}

export function getRoadmap(): RoadmapTier[] {
  const raw = Object.values(roadmapMd)[0]
  if (!raw) return []
  const { content } = parseFrontmatter(raw)
  const lines = content.split('\n')

  const tiers: RoadmapTier[] = []
  let currentTier: RoadmapTier | null = null
  let tableLines: string[] = []

  for (const line of lines) {
    const tierMatch = line.match(/^## Tier (\d+)\s*[—–-]\s*(.+)/)
    if (tierMatch) {
      if (currentTier && tableLines.length > 0) {
        currentTier.entries = parseRoadmapTable(tableLines)
      }
      currentTier = {
        tier: parseInt(tierMatch[1], 10),
        title: tierMatch[2].trim(),
        description: '',
        entries: [],
      }
      tiers.push(currentTier)
      tableLines = []
      continue
    }
    if (currentTier && line.startsWith('>')) {
      currentTier.description = line.replace(/^>\s*/, '').trim()
      continue
    }
    if (currentTier && line.startsWith('|')) {
      tableLines.push(line)
    }
  }
  if (currentTier && tableLines.length > 0) {
    currentTier.entries = parseRoadmapTable(tableLines)
  }

  return tiers
}

// --- Confusion ledger parsing ---

export function getConfusionEntries(): ConfusionEntry[] {
  const raw = Object.values(confusionMd)[0]
  if (!raw) return []
  const { content } = parseFrontmatter(raw)
  const lines = content.split('\n').filter(
    (l) => l.startsWith('|') && !l.includes('---') && !l.includes('日期')
  )
  return lines.map((line) => {
    const cells = line
      .split('|')
      .map((c) => c.trim())
      .filter(Boolean)
    return {
      date: cells[0] || '',
      topic: cells[1] || '',
      blindSpot: cells[2] || '',
      correction: cells[3] || '',
      status: cells[4] === '已修正' ? '已修正' as ConfusionStatus : '需複習' as ConfusionStatus,
      reviewAdvice: cells[5] || '',
    }
  })
}

// --- Aggregated stats ---

export function getStats() {
  const roadmap = getRoadmap()
  const allEntries = roadmap.flatMap((t) => t.entries)
  const confusion = getConfusionEntries()

  return {
    totalPatterns: allEntries.length,
    mastered: allEntries.filter((e) => e.status === '已掌握').length,
    inProgress: allEntries.filter((e) => e.status === '學習中').length,
    needsReview: allEntries.filter((e) => e.status === '需複習').length,
    notStarted: allEntries.filter((e) => e.status === '未開始').length,
    confusionOpen: confusion.filter((e) => e.status === '需複習').length,
    confusionResolved: confusion.filter((e) => e.status === '已修正').length,
  }
}
