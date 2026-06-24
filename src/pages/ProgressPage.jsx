import { Link } from 'react-router-dom'
import { getOriginalQuestions, getVariantQuestions, sections } from '../data/index.js'
import { useProgress } from '../hooks/useProgress.js'
import ProgressBar from '../components/ProgressBar.jsx'

export default function ProgressPage() {
  const { progress, clearProgress, globalStats } = useProgress()

  const sectionDetails = sections.map((section) => {
    const originals = getOriginalQuestions(section.id)
    const variants = getVariantQuestions(section.id)
    const correct = originals.filter((q) => progress[q.id]?.correct).length
    const attempts = originals.reduce(
      (sum, q) => sum + (progress[q.id]?.attempts ?? 0),
      0,
    )
    const variantAttempts = variants.reduce(
      (sum, q) => sum + (progress[q.id]?.attempts ?? 0),
      0,
    )
    const variantCorrect = variants.filter((q) => progress[q.id]?.correct).length
    return {
      section,
      correct,
      total: originals.length,
      attempts,
      variantAttempts,
      variantCorrect,
      variantTotal: variants.length,
      mastered: correct === originals.length && originals.length > 0,
    }
  })

  const openQuestions = sections.flatMap((s) =>
    getOriginalQuestions(s.id).filter((q) => !progress[q.id]?.correct),
  )

  return (
    <div className="page progress-page">
      <header className="page-header">
        <Link to="/" className="back-link">← Dashboard</Link>
        <h1>Fortschritt & Statistik</h1>
      </header>

      <section className="stats-overview">
        <div className="stat-card">
          <span className="stat-value">{globalStats.correct}</span>
          <span className="stat-label">Originalfragen korrekt</span>
        </div>
        <div className="stat-card">
          <span className="stat-value">
            {globalStats.sectionsMastered}/{globalStats.sectionCount}
          </span>
          <span className="stat-label">Abschnitte gemeistert</span>
        </div>
        <div className="stat-card">
          <span className="stat-value">{openQuestions.length}</span>
          <span className="stat-label">Noch offene Fragen</span>
        </div>
      </section>

      <ProgressBar
        correct={globalStats.correct}
        total={globalStats.total}
        label="Gesamtfortschritt"
      />

      <section className="section-stats-list">
        <h2>Pro Abschnitt</h2>
        {sectionDetails.map(
          ({
            section,
            correct,
            total,
            attempts,
            variantCorrect,
            variantTotal,
            mastered,
          }) => (
            <div key={section.id} className="section-stat-row">
              <div className="section-stat-info">
                <strong>
                  {section.id} — {section.title}
                </strong>
                {mastered && <span className="badge badge-success">Gemeistert</span>}
              </div>
              <ProgressBar correct={correct} total={total} />
              <p className="stat-detail">
                Versuche: {attempts} · Varianten: {variantCorrect}/{variantTotal}
              </p>
            </div>
          ),
        )}
      </section>

      {openQuestions.length > 0 && (
        <section className="open-questions">
          <h2>Offene Originalfragen</h2>
          <ul>
            {openQuestions.map((q) => (
              <li key={q.id}>
                <Link to={`/quiz/${q.section}?mode=weak`}>
                  [{q.section}] {q.question.slice(0, 80)}
                  {q.question.length > 80 ? '…' : ''}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="danger-zone">
        <h2>Fortschritt zurücksetzen</h2>
        <p>Alle gespeicherten Antworten werden gelöscht.</p>
        <button type="button" className="btn btn-danger" onClick={clearProgress}>
          Fortschritt löschen
        </button>
      </section>
    </div>
  )
}
