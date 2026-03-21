import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import { getCheatSheet } from '../data'

function hasContent(md: string): boolean {
  // Meaningful content = at least one h2 heading with bullet points
  return /^##\s+.+/m.test(md)
}

export default function CheatSheet() {
  const content = getCheatSheet()
  const meaningful = hasContent(content)

  return (
    <div className="cheatsheet">
      <h1>Cheat Sheet — 面試前速查</h1>
      {meaningful ? (
        <div className="prose">
          <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
            {content}
          </ReactMarkdown>
        </div>
      ) : (
        <div className="empty-state">
          還沒有踩坑紀錄。開始跟 tutor 討論 pattern 後，這裡會自動填入你的個人速查筆記。
        </div>
      )}
    </div>
  )
}
