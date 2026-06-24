import { Link } from 'react-router-dom'
import { useProgress } from '../hooks/useProgress.js'
import ProgressBar from './ProgressBar.jsx'

export default function SectionCard({ section }) {
  const { getSectionData } = useProgress()
  const { stats, mastered, variantsUnlocked, weak } = getSectionData(section.id)

  return (
    <article className="section-card">
      <div className="section-card-header">
        <span className="section-id">{section.id}</span>
        <h2>{section.title}</h2>
      </div>
      <p className="section-desc">{section.description}</p>
      <ProgressBar
        correct={stats.correct}
        total={stats.total}
        label="Originalfragen"
      />
      <div className="section-badges">
        {mastered && <span className="badge badge-success">Gemeistert</span>}
        {variantsUnlocked && (
          <span className="badge badge-accent">Varianten freigeschaltet</span>
        )}
        {weak.length > 0 && (
          <span className="badge badge-warn">{weak.length} offen</span>
        )}
      </div>
      <div className="section-actions">
        <Link to={`/learn/${section.id}`} className="btn btn-secondary">
          Lernen
        </Link>
        <Link to={`/quiz/${section.id}`} className="btn btn-primary">
          Quiz
        </Link>
        {weak.length > 0 && (
          <Link to={`/quiz/${section.id}?mode=weak`} className="btn btn-ghost">
            Schwache Themen
          </Link>
        )}
        {variantsUnlocked && (
          <Link to={`/quiz/${section.id}?mode=variants`} className="btn btn-accent">
            Varianten
          </Link>
        )}
      </div>
    </article>
  )
}
