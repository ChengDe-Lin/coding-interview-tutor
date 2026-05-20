import { getConfusionEntries, getReviewPatterns } from '../data'
import type { Page } from '../types'

interface Props {
  onNavigate: (page: Page) => void
}

export default function QuickReview({ onNavigate }: Props) {
  const dueEntries = getConfusionEntries()
    .filter((entry) => entry.status === '需複習')
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, 5)

  const reviewPatterns = getReviewPatterns(6)
  const bitPattern = reviewPatterns.find((pattern) => pattern.slug === 'bit_manipulation')

  return (
    <div className="quick-review">
      <div className="quick-review-hero">
        <div>
          <h1>Quick Review</h1>
          <p className="quick-review-subtitle">
            給零碎時間用的速刷頁。先看最舊的盲點，再刷目前還不穩的 pattern cue / trap。
          </p>
        </div>

        <div className="quick-review-actions">
          <button
            className="quick-review-btn"
            onClick={() => onNavigate({ type: 'confusion-ledger' })}
          >
            打開 Confusion Ledger
          </button>
          {bitPattern?.slug ? (
            <button
              className="quick-review-btn secondary"
              onClick={() => onNavigate({ type: 'pattern', slug: bitPattern.slug! })}
            >
              打開 Bit 筆記
            </button>
          ) : null}
          <button
            className="quick-review-btn secondary"
            onClick={() => onNavigate({ type: 'example', slug: 'bit_manipulation' })}
          >
            看 Bit Example
          </button>
        </div>
      </div>

      <section className="quick-review-section">
        <div className="section-title">先驗收這些盲點</div>
        <div className="quick-review-grid">
          {dueEntries.length === 0 ? (
            <div className="empty-state">目前沒有待驗收的 confusion item。</div>
          ) : (
            dueEntries.map((entry) => (
              <article className="review-focus-card" key={`${entry.date}-${entry.topic}`}>
                <div className="review-focus-meta">
                  <span className="status-badge needs-review">需複習</span>
                  <span>{entry.date}</span>
                </div>
                <h2>{entry.topic}</h2>
                <p>
                  <strong>錯誤直覺：</strong>
                  {entry.blindSpot}
                </p>
                <p>
                  <strong>核心正解：</strong>
                  {entry.correction}
                </p>
                <p className="review-focus-advice">{entry.reviewAdvice}</p>
              </article>
            ))
          )}
        </div>
      </section>

      <section className="quick-review-section">
        <div className="section-title">Pattern Cue / Trap 速刷</div>
        <div className="pattern-review-list">
          {reviewPatterns.map((pattern) => (
            <article className="pattern-review-card" key={`${pattern.pattern}-${pattern.lastStudied}`}>
              <div className="pattern-review-header">
                <div>
                  <h2>{pattern.pattern}</h2>
                  <div className="pattern-review-meta">
                    <span
                      className={`status-badge ${
                        pattern.status === '已掌握'
                          ? 'mastered'
                          : pattern.status === '學習中'
                            ? 'learning'
                            : pattern.status === '需複習'
                              ? 'needs-review'
                              : 'not-started'
                      }`}
                    >
                      {pattern.status}
                    </span>
                    <span>上次學習 {pattern.lastStudied}</span>
                    <span>{pattern.problemCount} 題</span>
                  </div>
                </div>

                {pattern.slug ? (
                  <button
                    className="pattern-review-link"
                    onClick={() => onNavigate({ type: 'pattern', slug: pattern.slug! })}
                  >
                    完整筆記
                  </button>
                ) : null}
              </div>

              <div className="pattern-review-columns">
                <div className="pattern-review-block">
                  <h3>Recognition Signal</h3>
                  <ul>
                    {(pattern.recognitionSignals.length > 0
                      ? pattern.recognitionSignals
                      : ['這份筆記還沒整理出 cue，該補。']
                    ).map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div className="pattern-review-block">
                  <h3>Bug Trap</h3>
                  <ul>
                    {(pattern.traps.length > 0 ? pattern.traps : ['這份筆記還沒整理出 trap，該補。']).map(
                      (item) => (
                        <li key={item}>{item}</li>
                      ),
                    )}
                  </ul>
                </div>

                {pattern.quickOps.length > 0 ? (
                  <div className="pattern-review-block">
                    <h3>Quick Ops</h3>
                    <ul>
                      {pattern.quickOps.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}
