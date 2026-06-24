export default function QuizControls({
  currentIndex,
  total,
  onPrev,
  onNext,
  canPrev,
  canNext,
  finished,
}) {
  return (
    <div className="quiz-controls">
      <span className="quiz-counter">
        Frage {Math.min(currentIndex + 1, total)} / {total}
      </span>
      <div className="quiz-nav">
        <button
          type="button"
          className="btn btn-secondary"
          onClick={onPrev}
          disabled={!canPrev}
        >
          Zurück
        </button>
        {!finished && (
          <button
            type="button"
            className="btn btn-primary"
            onClick={onNext}
            disabled={!canNext}
          >
            Weiter
          </button>
        )}
      </div>
    </div>
  )
}
