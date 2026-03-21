import { useState } from 'react'
import { getConfusionEntries } from '../data'
import type { ConfusionStatus } from '../types'

export default function ConfusionLedger() {
  const entries = getConfusionEntries()
  const [statusFilter, setStatusFilter] = useState<'' | ConfusionStatus>('')
  const [topicFilter, setTopicFilter] = useState('')

  const filtered = entries.filter((e) => {
    const matchStatus = statusFilter === '' || e.status === statusFilter
    const matchTopic = topicFilter === '' || e.topic.toLowerCase().includes(topicFilter.toLowerCase())
    return matchStatus && matchTopic
  })

  return (
    <div className="confusion-ledger">
      <h1>Confusion Ledger — 盲區追蹤</h1>

      {entries.length === 0 ? (
        <div className="empty-state">
          還沒有盲區紀錄。跟 tutor 討論時發現的盲區會自動記錄在這裡。
        </div>
      ) : (
        <>
          <div className="filter-bar">
            <button
              className={`filter-btn${statusFilter === '' ? ' active' : ''}`}
              onClick={() => setStatusFilter('')}
            >
              全部
            </button>
            <button
              className={`filter-btn${statusFilter === '需複習' ? ' active' : ''}`}
              onClick={() => setStatusFilter('需複習')}
            >
              需複習
            </button>
            <button
              className={`filter-btn${statusFilter === '已修正' ? ' active' : ''}`}
              onClick={() => setStatusFilter('已修正')}
            >
              已修正
            </button>
            <input
              className="filter-input"
              type="text"
              placeholder="搜尋主題..."
              value={topicFilter}
              onChange={(e) => setTopicFilter(e.target.value)}
            />
          </div>

          {filtered.length === 0 ? (
            <div className="empty-state">沒有符合篩選條件的紀錄</div>
          ) : (
            <div className="table-wrapper">
              <table className="confusion-table">
                <thead>
                  <tr>
                    <th>日期</th>
                    <th>主題</th>
                    <th>盲區/錯誤認知</th>
                    <th>核心正解</th>
                    <th>狀態</th>
                    <th>複習建議</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((e, i) => (
                    <tr key={i}>
                      <td>{e.date}</td>
                      <td>{e.topic}</td>
                      <td>{e.blindSpot}</td>
                      <td>{e.correction}</td>
                      <td>
                        <span
                          className={`status-badge ${e.status === '需複習' ? 'needs-review' : 'mastered'}`}
                        >
                          {e.status}
                        </span>
                      </td>
                      <td>{e.reviewAdvice}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </div>
  )
}
