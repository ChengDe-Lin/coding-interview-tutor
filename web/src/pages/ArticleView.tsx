import { useState, useEffect, useMemo } from 'react'
import ReactMarkdown, { type Components } from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import rehypeHighlight from 'rehype-highlight'
import 'highlight.js/styles/github-dark.css'

// ─── Types ───

interface Props {
  content: string
  name: string
  onBack: () => void
}

interface Heading {
  text: string
  depth: number
  id: string
}

// ─── Helpers ───

function extractHeadings(md: string): Heading[] {
  const headings: Heading[] = []
  for (const line of md.split('\n')) {
    const match = line.match(/^(#{1,3})\s+(.+)/)
    if (match) {
      const text = match[2].trim()
      headings.push({
        text,
        depth: match[1].length,
        id: text
          .toLowerCase()
          .replace(/[^a-z0-9\u4e00-\u9fff]+/g, '-')
          .replace(/^-|-$/g, ''),
      })
    }
  }
  return headings
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\u4e00-\u9fff]+/g, '-')
    .replace(/^-|-$/g, '')
}

function getTextContent(node: React.ReactNode): string {
  if (typeof node === 'string') return node
  if (typeof node === 'number') return String(node)
  if (Array.isArray(node)) return node.map(getTextContent).join('')
  if (node && typeof node === 'object' && 'props' in node) {
    return getTextContent((node as { props: { children?: React.ReactNode } }).props.children)
  }
  return ''
}

// ─── Component ───

export default function ArticleView({ content, name: _name, onBack }: Props) {
  const [activeHeadingId, setActiveHeadingId] = useState('')

  const headings = useMemo(() => extractHeadings(content), [content])

  // IntersectionObserver for TOC highlighting
  useEffect(() => {
    if (headings.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((e) => e.isIntersecting)
        if (visible) setActiveHeadingId(visible.target.id)
      },
      { rootMargin: '-60px 0px -75% 0px' },
    )

    const timer = setTimeout(() => {
      headings.forEach(({ id }) => {
        const el = document.getElementById(id)
        if (el) observer.observe(el)
      })
    }, 80)

    return () => {
      clearTimeout(timer)
      observer.disconnect()
    }
  }, [headings])

  // Reset scroll & active heading on content change
  useEffect(() => {
    setActiveHeadingId('')
  }, [content])

  const mdComponents: Components = useMemo(
    () => ({
      h1: ({ children, ...props }: React.ComponentProps<'h1'>) => (
        <h1 id={slugify(getTextContent(children))} {...props}>
          {children}
        </h1>
      ),
      h2: ({ children, ...props }: React.ComponentProps<'h2'>) => (
        <h2 id={slugify(getTextContent(children))} {...props}>
          {children}
        </h2>
      ),
      h3: ({ children, ...props }: React.ComponentProps<'h3'>) => (
        <h3 id={slugify(getTextContent(children))} {...props}>
          {children}
        </h3>
      ),
      table: ({ children, ...props }: React.ComponentProps<'table'>) => (
        <div className="table-wrapper">
          <table {...props}>{children}</table>
        </div>
      ),
    }),
    [],
  )

  return (
    <div className="article-layout">
      <div className="article-content prose">
        <button className="article-back" onClick={onBack}>
          &larr; Back
        </button>
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeRaw, rehypeHighlight]}
          components={mdComponents}
        >
          {content}
        </ReactMarkdown>
      </div>

      {headings.length > 0 && (
        <nav className="toc">
          <h3 className="toc-title">On This Page</h3>
          <ul className="toc-list">
            {headings.map((h, i) => (
              <li key={`${h.id}-${i}`}>
                <button
                  className={`toc-item${h.depth === 3 ? ' depth-3' : ''}${
                    activeHeadingId === h.id ? ' active' : ''
                  }`}
                  onClick={() => {
                    document
                      .getElementById(h.id)
                      ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                  }}
                >
                  {h.text}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </div>
  )
}
