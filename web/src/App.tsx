import { useState } from 'react'
import type { Page } from './types'
import { getPatterns, getDataStructures, getDeepDives, getStats } from './data'
import Dashboard from './pages/Dashboard'
import Roadmap from './pages/Roadmap'
import ArticleView from './pages/ArticleView'
import CheatSheet from './pages/CheatSheet'
import ConfusionLedger from './pages/ConfusionLedger'

export default function App() {
  const [page, setPage] = useState<Page>({ type: 'dashboard' })

  const patterns = getPatterns()
  const dataStructures = getDataStructures()
  const deepDives = getDeepDives()
  const stats = getStats()

  const navSections = [
    { label: 'Dashboard', page: { type: 'dashboard' } as Page },
    { label: 'Roadmap', page: { type: 'roadmap' } as Page },
    { label: 'Cheat Sheet', page: { type: 'cheatsheet' } as Page },
    { label: 'Confusion Ledger', page: { type: 'confusion-ledger' } as Page },
  ]

  function renderPage() {
    switch (page.type) {
      case 'dashboard':
        return <Dashboard stats={stats} onNavigate={setPage} />
      case 'roadmap':
        return <Roadmap onNavigate={setPage} />
      case 'pattern': {
        const pat = patterns.find((p) => p.slug === page.slug)
        if (!pat) return <div className="empty-state">Pattern not found</div>
        return (
          <ArticleView
            content={pat.content}
            name={pat.name}
            onBack={() => setPage({ type: 'roadmap' })}
          />
        )
      }
      case 'data-structure': {
        const ds = dataStructures.find((d) => d.slug === page.slug)
        if (!ds) return <div className="empty-state">Data structure not found</div>
        return (
          <ArticleView
            content={ds.content}
            name={ds.name}
            onBack={() => setPage({ type: 'dashboard' })}
          />
        )
      }
      case 'cheatsheet':
        return <CheatSheet />
      case 'confusion-ledger':
        return <ConfusionLedger />
      case 'deep-dive': {
        const dd = deepDives.find((d) => d.slug === page.slug)
        if (!dd) return <div className="empty-state">Deep dive not found</div>
        return (
          <ArticleView
            content={dd.content}
            name={dd.name}
            onBack={() => setPage({ type: 'dashboard' })}
          />
        )
      }
    }
  }

  const isActive = (type: string) => page.type === type

  return (
    <div className="app">
      <aside className="sidebar">
        <div
          className="sidebar-header"
          onClick={() => setPage({ type: 'dashboard' })}
        >
          <h1 className="sidebar-title">
            Coding Interview<br />Tutor
          </h1>
        </div>
        <nav className="sidebar-nav">
          {navSections.map((item) => (
            <button
              key={item.label}
              className={`nav-item ${isActive(item.page.type) ? 'active' : ''}`}
              onClick={() => setPage(item.page)}
            >
              {item.label}
            </button>
          ))}

          {patterns.length > 0 && (
            <>
              <div className="nav-section-header">Patterns</div>
              {patterns.map((p) => (
                <button
                  key={p.slug}
                  className={`nav-item nav-item-sub ${
                    page.type === 'pattern' && page.slug === p.slug
                      ? 'active'
                      : ''
                  }`}
                  onClick={() => setPage({ type: 'pattern', slug: p.slug })}
                >
                  {p.name}
                </button>
              ))}
            </>
          )}

          {dataStructures.length > 0 && (
            <>
              <div className="nav-section-header">Data Structures</div>
              {dataStructures.map((d) => (
                <button
                  key={d.slug}
                  className={`nav-item nav-item-sub ${
                    page.type === 'data-structure' && page.slug === d.slug
                      ? 'active'
                      : ''
                  }`}
                  onClick={() =>
                    setPage({ type: 'data-structure', slug: d.slug })
                  }
                >
                  {d.name}
                </button>
              ))}
            </>
          )}

          {deepDives.length > 0 && (
            <>
              <div className="nav-section-header">Deep Dives</div>
              {deepDives.map((d) => (
                <button
                  key={d.slug}
                  className={`nav-item nav-item-sub ${
                    page.type === 'deep-dive' && page.slug === d.slug
                      ? 'active'
                      : ''
                  }`}
                  onClick={() =>
                    setPage({ type: 'deep-dive', slug: d.slug })
                  }
                >
                  {d.name}
                </button>
              ))}
            </>
          )}
        </nav>
      </aside>
      <main className="main-content">{renderPage()}</main>
    </div>
  )
}
