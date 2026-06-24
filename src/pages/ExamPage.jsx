import { useCallback, useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { getVariantQuestions, originalQuestions } from '../data/index.js'
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

function ExamSession({ submitAnswer, onFinish }) {
  const questions = useMemo(() => shuffle(getVariantQuestions('all')), [])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answered, setAnswered] = useState(() => new Set())
  const [sessionScore, setSessionScore] = useState({ correct: 0, total: 0 })
  const [timeLeft, setTimeLeft] = useState(45 * 60)

  const currentQuestion = questions[currentIndex]
  const finished = currentIndex >= questions.length

  useEffect(() => {
    if (finished) return
    const timer = setInterval(() => {
      setTimeLeft((t) => (t > 0 ? t - 1 : 0))
    }, 1000)
    return () => clearInterval(timer)
  }, [finished])

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

  if (finished) {
    return (
      <div className="quiz-summary">
        <h2>Prüfung abgeschlossen</h2>
        <p>
          Ergebnis: {sessionScore.correct}/{sessionScore.total} richtig (
          {sessionScore.total > 0
            ? Math.round((sessionScore.correct / sessionScore.total) * 100)
            : 0}
          %)
        </p>
        <div className="quiz-summary-actions">
          <Link to="/" className="btn btn-secondary">Dashboard</Link>
          <button type="button" className="btn btn-primary" onClick={onFinish}>
            Neue Prüfung
          </button>
        </div>
      </div>
    )
  }

  return (
    <>
      <header className="page-header exam-header">
        <h1>Prüfungssimulation</h1>
        <span className="exam-timer">
          {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, '0')}
        </span>
      </header>

      {currentQuestion && (
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
    </>
  )
}

export default function ExamPage() {
  const { globalStats, submitAnswer } = useProgress()
  const [examRun, setExamRun] = useState(0)

  if (!globalStats.allMastered) {
    return (
      <div className="page">
        <Link to="/" className="back-link">← Dashboard</Link>
        <h1>Prüfungssimulation gesperrt</h1>
        <p>
          Beantworte zuerst alle {originalQuestions.length} Originalfragen korrekt
          ({globalStats.correct}/{globalStats.total} erledigt).
        </p>
        <Link to="/" className="btn btn-primary">Zum Dashboard</Link>
      </div>
    )
  }

  if (examRun === 0) {
    return (
      <div className="page exam-intro">
        <Link to="/" className="back-link">← Dashboard</Link>
        <h1>Prüfungssimulation</h1>
        <p>
          Dieser Modus enthält ausschliesslich <strong>Varianten-Fragen</strong> aus
          allen Abschnitten — ähnliche Aufgaben zu den Originalfragen.
        </p>
        <ul className="exam-info">
          <li>{getVariantQuestions('all').length} Fragen (zufällige Reihenfolge)</li>
          <li>Empfohlene Zeit: 45 Minuten (optional)</li>
          <li>Sofort-Feedback nach jeder Antwort</li>
        </ul>
        <button
          type="button"
          className="btn btn-accent btn-lg"
          onClick={() => setExamRun(1)}
        >
          Prüfung starten
        </button>
      </div>
    )
  }

  return (
    <div className="page exam-page">
      <ExamSession
        key={examRun}
        submitAnswer={submitAnswer}
        onFinish={() => setExamRun(0)}
      />
    </div>
  )
}
