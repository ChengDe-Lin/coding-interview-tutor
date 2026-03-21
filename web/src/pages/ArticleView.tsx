interface Props {
  content: string
  name: string
  onBack: () => void
}

export default function ArticleView({ name, onBack }: Props) {
  return (
    <div className="article-layout">
      <div className="article-content">
        <button className="article-back" onClick={onBack}>
          &larr; Back
        </button>
        <h1>{name}</h1>
      </div>
    </div>
  )
}
