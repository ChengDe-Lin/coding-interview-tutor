import type { Page } from '../types'

interface Props {
  onNavigate: (page: Page) => void
}

export default function Roadmap({ onNavigate: _onNavigate }: Props) {
  return (
    <div className="roadmap">
      <h1>Roadmap</h1>
      <p className="empty-state">Coming soon</p>
    </div>
  )
}
