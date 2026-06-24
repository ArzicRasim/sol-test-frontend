import { useState } from 'react'

export default function MatrixQuestion({
  question,
  value,
  onChange,
  disabled,
  showResult,
}) {
  const items = question.matrixItems ?? []
  const correct = /** @type {Record<string, number>} */ (question.correctAnswer)

  const [weights, setWeights] = useState(() => {
    if (value && typeof value === 'object' && !Array.isArray(value)) {
      return /** @type {Record<string, number>} */ (value)
    }
    return Object.fromEntries(items.map((item) => [item, 1]))
  })

  function setWeight(item, w) {
    if (disabled) return
    const next = { ...weights, [item]: Number(w) }
    setWeights(next)
    onChange(next)
  }

  return (
    <div className="matrix-table">
      <div className="matrix-header">
        <span>Kriterium</span>
        <span>Gewichtung (1–5)</span>
      </div>
      {items.map((item) => {
        const userVal = weights[item]
        const correctVal = correct[item]
        let rowClass = 'matrix-row'
        if (showResult && userVal === correctVal) rowClass += ' correct'
        if (showResult && userVal !== correctVal) rowClass += ' wrong'

        return (
          <div key={item} className={rowClass}>
            <span>{item}</span>
            <select
              value={userVal}
              disabled={disabled}
              onChange={(e) => setWeight(item, e.target.value)}
            >
              {[1, 2, 3, 4, 5].map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </div>
        )
      })}
    </div>
  )
}
