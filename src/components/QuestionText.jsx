import { getQuestionImage } from '../data/questionImages.js'

/**
 * @param {Object} props
 * @param {string} props.question
 * @param {string} [props.codeSnippet]
 * @param {string} [props.image]
 */
export default function QuestionText({ question, codeSnippet, image }) {
  const imageSrc = image ? getQuestionImage(image) : undefined

  return (
    <div className="question-text-block">
      <h3 className="question-text">{question}</h3>
      {codeSnippet && (
        <pre className="question-code">
          <code>{codeSnippet}</code>
        </pre>
      )}
      {imageSrc && (
        <img
          className="question-image"
          src={imageSrc}
          alt="Abbildung zur Aufgabe"
        />
      )}
    </div>
  )
}
