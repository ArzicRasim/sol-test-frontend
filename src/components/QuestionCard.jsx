import { useCallback, useMemo, useState } from 'react'
import {
  evaluateAnswer,
  getShuffledOptions,
  matchOpenTextKeywords,
} from '../data/schema.js'
import MultipleChoice from './MultipleChoice.jsx'
import MultipleSelect from './MultipleSelect.jsx'
import OpenText from './OpenText.jsx'
import OrderingQuestion from './OrderingQuestion.jsx'
import MatrixQuestion from './MatrixQuestion.jsx'
import QuestionText from './QuestionText.jsx'

/**
 * @param {Object} props
 * @param {import('../data/schema.js').Question} props.question
 * @param {'learn' | 'quiz'} props.mode
 * @param {(correct: boolean) => void} [props.onSubmit]
 */
export default function QuestionCard({ question, mode, onSubmit }) {
  const isLearn = mode === 'learn'
  const shuffledOptions = useMemo(
    () => getShuffledOptions(question),
    [question],
  )
  const [revealed, setRevealed] = useState(isLearn)
  const [answer, setAnswer] = useState(() =>
    getInitialAnswer(question, shuffledOptions),
  )
  const [showResult, setShowResult] = useState(isLearn)
  const [isCorrect, setIsCorrect] = useState(false)
  const [keywordResult, setKeywordResult] = useState(null)
  const [selfGrade, setSelfGrade] = useState(null)

  const handleSubmit = useCallback(() => {
    if (question.type === 'open_text') {
      const result = matchOpenTextKeywords(
        String(answer),
        question.keywords ?? [],
      )
      setKeywordResult(result)
      setShowResult(true)
      setRevealed(true)
      setIsCorrect(result.correct)
      onSubmit?.(result.correct)
      return
    }

    const correct = evaluateAnswer(answer, question.correctAnswer, question.type)
    setIsCorrect(correct)
    setShowResult(true)
    setRevealed(true)
    onSubmit?.(correct)
  }, [answer, question, onSubmit])

  function handleSelfGrade(correct) {
    setSelfGrade(correct)
    setIsCorrect(correct)
    onSubmit?.(correct)
  }

  function renderInput() {
    const common = {
      question,
      disabled: showResult && !isLearn,
      showResult: revealed,
      isCorrect,
    }

    switch (question.type) {
      case 'multiple_choice':
        return (
          <MultipleChoice
            {...common}
            options={shuffledOptions}
            value={answer}
            onChange={setAnswer}
          />
        )
      case 'multiple_select':
        return (
          <MultipleSelect
            {...common}
            options={shuffledOptions}
            value={answer}
            onChange={setAnswer}
          />
        )
      case 'open_text':
        return (
          <OpenText
            value={String(answer)}
            onChange={setAnswer}
            disabled={showResult && !isLearn}
            showResult={revealed}
            keywordResult={keywordResult}
          />
        )
      case 'ordering':
        return (
          <OrderingQuestion
            {...common}
            value={answer}
            onChange={setAnswer}
          />
        )
      case 'matrix':
        return (
          <MatrixQuestion
            {...common}
            value={answer}
            onChange={setAnswer}
          />
        )
      default:
        return <p>Unbekannter Fragetyp: {question.type}</p>
    }
  }

  function formatCorrectAnswer() {
    if (question.type === 'matrix') {
      const entries = Object.entries(
        /** @type {Record<string, number>} */ (question.correctAnswer),
      )
      return entries.map(([k, v]) => `${k}: ${v}`).join(', ')
    }
    if (Array.isArray(question.correctAnswer)) {
      return question.correctAnswer.join(' → ')
    }
    return String(question.correctAnswer)
  }

  return (
    <article className="question-card">
      <div className="question-meta">
        <span className="question-section">{question.section}</span>
        {question.source === 'variant' && (
          <span className="badge badge-accent">Variante</span>
        )}
        <span className="question-type">{question.type.replace('_', ' ')}</span>
      </div>
      <QuestionText
        question={question.question}
        codeSnippet={question.codeSnippet}
        image={question.image}
      />
      {renderInput()}

      {!isLearn && !showResult && (
        <div className="question-actions">
          <button type="button" className="btn btn-primary" onClick={handleSubmit}>
            Antwort prüfen
          </button>
        </div>
      )}

      {isLearn && !revealed && (
        <div className="question-actions">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => setRevealed(true)}
          >
            Lösung anzeigen
          </button>
        </div>
      )}

      {revealed && (
        <div className={`explanation ${showResult && !isLearn ? (isCorrect ? 'result-correct' : 'result-wrong') : ''}`}>
          {!isLearn && showResult && (
            <p className="result-label">
              {isCorrect ? '✓ Richtig!' : '✗ Nicht ganz richtig'}
            </p>
          )}
          <p>
            <strong>Musterlösung:</strong> {formatCorrectAnswer()}
          </p>
          <p>{question.explanation}</p>
          {question.type === 'open_text' && showResult && !isLearn && !keywordResult?.correct && (
            <div className="self-grade">
              <p>War deine Antwort inhaltlich richtig?</p>
              <button
                type="button"
                className="btn btn-ghost"
                disabled={selfGrade !== null}
                onClick={() => handleSelfGrade(true)}
              >
                Ja, zählen
              </button>
              <button
                type="button"
                className="btn btn-ghost"
                disabled={selfGrade !== null}
                onClick={() => handleSelfGrade(false)}
              >
                Nein
              </button>
            </div>
          )}
        </div>
      )}
    </article>
  )
}

/**
 * @param {import('../data/schema.js').Question} question
 * @param {string[]} shuffledOptions
 */
function getInitialAnswer(question, shuffledOptions) {
  switch (question.type) {
    case 'multiple_select':
      return []
    case 'ordering':
      return [...shuffledOptions]
    case 'matrix':
      return Object.fromEntries(
        (question.matrixItems ?? []).map((item) => [item, 1]),
      )
    case 'open_text':
      return ''
    default:
      return ''
  }
}
