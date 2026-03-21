import type { Page, PatternStatus } from '../types'
import { getRoadmap, getStats } from '../data'

interface Props {
  onNavigate: (page: Page) => void
}

function toSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[()\/]/g, '')
    .replace(/\s+/g, '_')
    .replace(/_+/g, '_')
    .replace(/^_|_$/g, '')
}

function statusBadgeClass(status: PatternStatus): string {
  switch (status) {
    case '已掌握': return 'status-badge mastered'
    case '學習中': return 'status-badge learning'
    case '需複習': return 'status-badge needs-review'
    case '未開始': return 'status-badge not-started'
  }
}

export default function Roadmap({ onNavigate }: Props) {
  const tiers = getRoadmap()
  const stats = getStats()
  const { totalPatterns, mastered, inProgress, needsReview, notStarted } = stats

  const pct = (n: number) => (totalPatterns > 0 ? (n / totalPatterns) * 100 : 0)

  return (
    <div className="roadmap">
      <h1>Roadmap</h1>

      {/* Progress Summary */}
      <div style={{ display: 'flex', gap: '24px', marginBottom: '20px', flexWrap: 'wrap' }}>
        <span style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
          總計 <strong style={{ color: 'var(--text-primary)' }}>{totalPatterns}</strong>
        </span>
        <span style={{ fontSize: '0.8125rem', color: 'var(--accent-green)' }}>
          已掌握 <strong>{mastered}</strong>
        </span>
        <span style={{ fontSize: '0.8125rem', color: 'var(--accent)' }}>
          學習中 <strong>{inProgress}</strong>
        </span>
        <span style={{ fontSize: '0.8125rem', color: 'var(--accent-orange)' }}>
          需複習 <strong>{needsReview}</strong>
        </span>
        <span style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
          未開始 <strong>{notStarted}</strong>
        </span>
      </div>

      <div className="progress-bar">
        {totalPatterns > 0 ? (
          <>
            <div className="segment-mastered" style={{ width: `${pct(mastered)}%` }} />
            <div className="segment-learning" style={{ width: `${pct(inProgress)}%` }} />
            <div className="segment-review" style={{ width: `${pct(needsReview)}%` }} />
            <div className="segment-not-started" style={{ width: `${pct(notStarted)}%` }} />
          </>
        ) : null}
      </div>

      {/* Tier Sections */}
      {tiers.map((tier) => (
        <div className="tier-section" key={tier.tier}>
          <h2 className="tier-header">
            <span className="tier-number">Tier {tier.tier}</span>
            {' — '}
            {tier.title}
          </h2>
          {tier.description && (
            <p className="tier-description">{tier.description}</p>
          )}

          <div className="pattern-grid">
            {tier.entries.map((entry) => (
              <div
                className="pattern-card"
                key={entry.pattern}
                onClick={() => onNavigate({ type: 'pattern', slug: toSlug(entry.pattern) })}
              >
                <div className="pattern-card-name">{entry.pattern}</div>
                <div className="pattern-card-meta">
                  <span className={statusBadgeClass(entry.status)}>{entry.status}</span>
                  <span>{entry.problemCount} 題</span>
                  <span>{entry.lastStudied || '—'}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {tiers.length === 0 && (
        <p className="empty-state">尚未設定 Roadmap。請建立 roadmap.md 檔案。</p>
      )}
    </div>
  )
}
