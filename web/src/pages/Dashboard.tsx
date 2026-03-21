import type { Page } from '../types'
import type { getStats } from '../data'

interface Props {
  stats: ReturnType<typeof getStats>
  onNavigate: (page: Page) => void
}

export default function Dashboard({ stats }: Props) {
  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-value">{stats.totalPatterns}</div>
          <div className="stat-label">Total Patterns</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{stats.mastered}</div>
          <div className="stat-label">Mastered</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{stats.inProgress}</div>
          <div className="stat-label">In Progress</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{stats.notStarted}</div>
          <div className="stat-label">Not Started</div>
        </div>
      </div>
    </div>
  )
}
