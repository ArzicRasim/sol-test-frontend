export default function MultipleSelect({
  question,
  value,
  onChange,
  disabled,
  showResult,
}) {
  const selected = Array.isArray(value) ? value : []
  const correct = Array.isArray(question.correctAnswer)
    ? question.correctAnswer
    : [question.correctAnswer]

  function toggle(option) {
    if (disabled) return
    if (selected.includes(option)) {
      onChange(selected.filter((o) => o !== option))
    } else {
      onChange([...selected, option])
    }
  }

  return (
    <div className="question-options">
      <p className="hint">Mehrere Antworten möglich</p>
      {(question.options ?? []).map((option) => {
        const isSelected = selected.includes(option)
        const isCorrectOption = correct.includes(option)
        let className = 'option-btn'
        if (isSelected) className += ' selected'
        if (showResult && isCorrectOption) className += ' correct'
        if (showResult && isSelected && !isCorrectOption) className += ' wrong'

        return (
          <button
            key={option}
            type="button"
            className={className}
            disabled={disabled}
            onClick={() => toggle(option)}
          >
            {isSelected ? '☑ ' : '☐ '}
            {option}
          </button>
        )
      })}
    </div>
  )
}
