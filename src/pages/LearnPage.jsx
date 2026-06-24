import { Link, useParams } from 'react-router-dom'
import { getOriginalQuestions, getSectionById } from '../data/index.js'
import QuestionCard from '../components/QuestionCard.jsx'

export default function LearnPage() {
  const { sectionId } = useParams()
  const section = getSectionById(sectionId)
  const questions = getOriginalQuestions(sectionId)

  if (!section) {
    return (
      <div className="page">
        <p>Abschnitt nicht gefunden.</p>
        <Link to="/">Zurück zum Dashboard</Link>
      </div>
    )
  }

  return (
    <div className="page learn-page">
      <header className="page-header">
        <Link to="/" className="back-link">← Dashboard</Link>
        <h1>
          Lernmodus: {section.id} — {section.title}
        </h1>
        <p>{section.description}</p>
        <p className="hint">{questions.length} Fragen · Lösungen auf Klick sichtbar</p>
      </header>

      <div className="question-list">
        {questions.map((q) => (
          <QuestionCard key={q.id} question={q} mode="learn" />
        ))}
      </div>
    </div>
  )
}
