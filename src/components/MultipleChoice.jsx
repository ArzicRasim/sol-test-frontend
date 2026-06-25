export default function MultipleChoice({
  question,
  options,
  value,
  onChange,
  disabled,
  showResult,
}) {
  const displayOptions = options ?? question.options ?? []

  return (
    <div className="question-options">
      {displayOptions.map((option) => {
        const isSelected = value === option
        const isCorrectOption = option === question.correctAnswer ||
          (Array.isArray(question.correctAnswer) && question.correctAnswer.includes(option))
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
            onClick={() => onChange(option)}
          >
            {option}
          </button>
        )
      })}
    </div>
  )
}
