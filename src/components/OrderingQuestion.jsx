export default function OrderingQuestion({
  question,
  value,
  onChange,
  disabled,
  showResult,
}) {
  const items = Array.isArray(value) && value.length > 0
    ? value
    : [...(question.options ?? [])]

  function moveUp(index) {
    if (disabled || index === 0) return
    const next = [...items]
    ;[next[index - 1], next[index]] = [next[index], next[index - 1]]
    onChange(next)
  }

  function moveDown(index) {
    if (disabled || index === items.length - 1) return
    const next = [...items]
    ;[next[index], next[index + 1]] = [next[index + 1], next[index]]
    onChange(next)
  }

  const correct = Array.isArray(question.correctAnswer) ? question.correctAnswer : []

  return (
    <div className="ordering-list">
      <p className="hint">Mit ↑/↓ die Reihenfolge anpassen</p>
      {items.map((item, index) => {
        const isCorrectPos = showResult && correct[index] === item
        const isWrongPos = showResult && correct[index] !== item
        let className = 'ordering-item'
        if (isCorrectPos) className += ' correct'
        if (isWrongPos) className += ' wrong'

        return (
          <div key={item} className={className}>
            <span className="ordering-rank">{index + 1}.</span>
            <span className="ordering-text">{item}</span>
            {!disabled && (
              <span className="ordering-controls">
                <button type="button" onClick={() => moveUp(index)} disabled={index === 0}>
                  ↑
                </button>
                <button
                  type="button"
                  onClick={() => moveDown(index)}
                  disabled={index === items.length - 1}
                >
                  ↓
                </button>
              </span>
            )}
          </div>
        )
      })}
    </div>
  )
}
