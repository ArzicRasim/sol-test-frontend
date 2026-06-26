import { calculateSwissGrade } from '../data/grading.js'

/**
 * @param {Object} props
 * @param {string} props.title
 * @param {number} props.correctCount
 * @param {number} props.maxPoints
 * @param {import('react').ReactNode} props.actions
 */
export default function SessionResultSummary({
  title,
  correctCount,
  maxPoints,
  actions,
}) {
  const result = calculateSwissGrade(correctCount, maxPoints)

  return (
    <div className="quiz-summary">
      <h2>{title}</h2>
      <p className="exam-result-points">
        Ergebnis: {result.points} / {result.maxPoints} Punkte
      </p>
      <p className="exam-grade">
        Note: <strong>{result.grade.toFixed(1)}</strong>
        {' '}(Schweizer Notensystem, 6 = best)
      </p>
      {!result.passed && (
        <p className="exam-grade-hint">Bestehensgrenze: Note 4.0</p>
      )}
      <div className="quiz-summary-actions">{actions}</div>
    </div>
  )
}
