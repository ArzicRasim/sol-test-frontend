import { useCallback, useMemo, useState } from 'react'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import {
  getOriginalQuestions,
  getSectionById,
  getVariantQuestions,
} from '../data/index.js'
import { getWeakQuestions } from '../context/progressStorage.js'
import { useProgress } from '../hooks/useProgress.js'
import QuestionCard from '../components/QuestionCard.jsx'
import QuizControls from '../components/QuizControls.jsx'

function shuffle(array) {
  const arr = [...array]
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

function buildQuestionPool(sectionId, mode, progress, variantsUnlocked) {
  if (mode === 'variants') {
    if (sectionId === 'all') return getVariantQuestions('all')
    if (!variantsUnlocked) return []
    return getVariantQuestions(sectionId)
  }
  if (mode === 'weak') {
    return getWeakQuestions(progress, getOriginalQuestions(sectionId))
  }
  if (sectionId === 'all') return getOriginalQuestions('all')
  return getOriginalQuestions(sectionId)
}

function QuizSession({ sectionId, mode, section, progress, submitAnswer, variantsUnlocked }) {
  const questions = useMemo(
    () => shuffle(buildQuestionPool(sectionId, mode, progress, variantsUnlocked)),
    // progress intentionally omitted — snapshot at session start via component key
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [sectionId, mode, variantsUnlocked],
  )

  const [currentIndex, setCurrentIndex] = useState(0)
  const [answered, setAnswered] = useState(() => new Set())
  const [sessionScore, setSessionScore] = useState({ correct: 0, total: 0 })

  const currentQuestion = questions[currentIndex]
  const finished = currentIndex >= questions.length

  const handleSubmit = useCallback(
    (correct) => {
      if (!currentQuestion) return
      submitAnswer(currentQuestion.id, correct)
      setAnswered((prev) => new Set(prev).add(currentQuestion.id))
      setSessionScore((s) => ({
        correct: s.correct + (correct ? 1 : 0),
        total: s.total + 1,
      }))
    },
    [currentQuestion, submitAnswer],
  )

  const title =
    sectionId === 'all'
      ? 'Gesamt-Quiz'
      : `${section.id} — ${section.title}`

  const modeLabel =
    mode === 'variants' ? ' (Varianten)' : mode === 'weak' ? ' (Schwache Themen)' : ''

  return (
    <div className="page quiz-page">
      <header className="page-header">
        <Link to="/" className="back-link">← Dashboard</Link>
        <h1>
          Quiz: {title}
          {modeLabel}
        </h1>
      </header>

      {!finished && currentQuestion && (
        <>
          <QuestionCard
            key={currentQuestion.id}
            question={currentQuestion}
            mode="quiz"
            onSubmit={handleSubmit}
          />
          <QuizControls
            currentIndex={currentIndex}
            total={questions.length}
            canPrev={currentIndex > 0}
            canNext={answered.has(currentQuestion.id)}
            onPrev={() => setCurrentIndex((i) => i - 1)}
            onNext={() => setCurrentIndex((i) => i + 1)}
            finished={false}
          />
        </>
      )}

      {finished && (
        <div className="quiz-summary">
          <h2>Quiz abgeschlossen</h2>
          <p>
            In dieser Session: {sessionScore.correct}/{sessionScore.total} richtig
          </p>
          <div className="quiz-summary-actions">
            <Link to="/" className="btn btn-secondary">Dashboard</Link>
            <Link to={`/quiz/${sectionId}${mode !== 'original' ? `?mode=${mode}` : ''}`} className="btn btn-primary">
              Nochmal
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}

export default function QuizPage() {
  const { sectionId } = useParams()
  const [searchParams] = useSearchParams()
  const mode = searchParams.get('mode') ?? 'original'
  const { progress, submitAnswer, getSectionData } = useProgress()

  const section = sectionId === 'all' ? null : getSectionById(sectionId)
  const sectionData = sectionId !== 'all' ? getSectionData(sectionId) : null
  const variantsUnlocked = sectionData?.variantsUnlocked ?? false

  if (sectionId !== 'all' && !section) {
    return (
      <div className="page">
        <p>Abschnitt nicht gefunden.</p>
        <Link to="/">Zurück</Link>
      </div>
    )
  }

  if (mode === 'variants' && sectionId !== 'all' && !variantsUnlocked) {
    return (
      <div className="page">
        <Link to="/" className="back-link">← Dashboard</Link>
        <h1>Varianten noch gesperrt</h1>
        <p>
          Beantworte zuerst alle Originalfragen in Abschnitt {sectionId} korrekt,
          um Varianten freizuschalten.
        </p>
        <Link to={`/quiz/${sectionId}`} className="btn btn-primary">
          Original-Quiz starten
        </Link>
      </div>
    )
  }

  const pool = buildQuestionPool(sectionId, mode, progress, variantsUnlocked)

  if (pool.length === 0) {
    return (
      <div className="page">
        <Link to="/" className="back-link">← Dashboard</Link>
        <h1>Keine Fragen verfügbar</h1>
        <p>
          {mode === 'weak'
            ? 'Alle Fragen in diesem Abschnitt wurden bereits korrekt beantwortet.'
            : 'Für diesen Modus sind keine Fragen vorhanden.'}
        </p>
        <Link to="/" className="btn btn-primary">Zum Dashboard</Link>
      </div>
    )
  }

  return (
    <QuizSession
      key={`${sectionId}-${mode}`}
      sectionId={sectionId}
      mode={mode}
      section={section ?? { id: 'all', title: 'Gesamt' }}
      progress={progress}
      submitAnswer={submitAnswer}
      variantsUnlocked={variantsUnlocked}
    />
  )
}
