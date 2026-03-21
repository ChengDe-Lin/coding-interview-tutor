import { getConfusionEntries, getPatterns } from '../data'
import type { Page } from '../types'
import type { getStats } from '../data'

interface Props {
  stats: ReturnType<typeof getStats>
  onNavigate: (page: Page) => void
}

export default function Dashboard({ stats, onNavigate }: Props) {
  const { totalPatterns, mastered, inProgress, needsReview, notStarted } = stats

  // Progress bar percentages
  const pct = (n: number) => (totalPatterns > 0 ? (n / totalPatterns) * 100 : 0)
  const pctMastered = pct(mastered)
  const pctInProgress = pct(inProgress)
  const pctReview = pct(needsReview)
  const pctNotStarted = pct(notStarted)

  // Review recommendations: confusion entries with status '需複習', sorted oldest first
  const reviewEntries = getConfusionEntries()
    .filter((e) => e.status === '需複習')
    .sort((a, b) => a.date.localeCompare(b.date))

  // Recently updated patterns: non-null last_updated, sorted newest first, top 5
  const recentPatterns = getPatterns()
    .filter((p) => p.frontmatter.last_updated !== null)
    .sort((a, b) =>
      (b.frontmatter.last_updated ?? '').localeCompare(a.frontmatter.last_updated ?? '')
    )
    .slice(0, 5)

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>

      {/* Stats Grid */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-value">{totalPatterns}</div>
          <div className="stat-label">Total Patterns</div>
        </div>
        <div className="stat-card">
          <div className="stat-value" style={{ color: 'var(--accent-green)' }}>{mastered}</div>
          <div className="stat-label">Mastered</div>
        </div>
        <div className="stat-card">
          <div className="stat-value" style={{ color: 'var(--accent)' }}>{inProgress}</div>
          <div className="stat-label">In Progress</div>
        </div>
        <div className="stat-card">
          <div className="stat-value" style={{ color: 'var(--accent-orange)' }}>{needsReview}</div>
          <div className="stat-label">Needs Review</div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="progress-bar">
        {totalPatterns > 0 ? (
          <>
            <div className="segment-mastered" style={{ width: `${pctMastered}%` }} />
            <div className="segment-learning" style={{ width: `${pctInProgress}%` }} />
            <div className="segment-review" style={{ width: `${pctReview}%` }} />
            <div className="segment-not-started" style={{ width: `${pctNotStarted}%` }} />
          </>
        ) : null}
      </div>

      {/* Review Recommendations */}
      <div className="section-title">需要複習</div>
      <div className="review-list">
        {reviewEntries.length === 0 ? (
          <div className="empty-state">目前沒有需要複習的項目</div>
        ) : (
          reviewEntries.map((entry, idx) => (
            <div className="review-card" key={idx}>
              <div className="review-card-title">{entry.topic}</div>
              <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '6px' }}>
                {entry.blindSpot}
              </div>
              <div className="review-card-meta">{entry.date}</div>
            </div>
          ))
        )}
      </div>

      {/* Recently Updated */}
      <div className="section-title">最近更新</div>
      <div className="recent-list">
        {recentPatterns.length === 0 ? (
          <div className="empty-state">還沒有筆記。開始第一個 pattern 吧！</div>
        ) : (
          recentPatterns.map((pattern) => (
            <div
              className="recent-card"
              key={pattern.slug}
              onClick={() => onNavigate({ type: 'pattern', slug: pattern.slug })}
            >
              <div style={{ fontWeight: 600, fontSize: '0.9375rem', color: 'var(--text-primary)', marginBottom: '4px' }}>
                {pattern.name}
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                {pattern.frontmatter.last_updated}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
