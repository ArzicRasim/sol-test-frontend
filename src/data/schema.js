/**
 * @typedef {'multiple_choice' | 'multiple_select' | 'open_text' | 'matrix' | 'ordering'} QuestionType
 * @typedef {'original' | 'variant'} QuestionSource
 *
 * @typedef {Object} Question
 * @property {string} id
 * @property {string} section
 * @property {string} sectionTitle
 * @property {QuestionType} type
 * @property {QuestionSource} source
 * @property {string|null} parentId
 * @property {string} question
 * @property {string[]} [options]
 * @property {string|string[]} correctAnswer
 * @property {string} explanation
 * @property {string[]} [tags]
 * @property {string[]} [keywords]
 * @property {Record<string, number>} [matrixWeights]
 * @property {string[]} [matrixItems]
 */

/**
 * @param {unknown} question
 * @returns {question is Question}
 */
export function isValidQuestion(question) {
  if (!question || typeof question !== 'object') return false
  const q = /** @type {Question} */ (question)
  return (
    typeof q.id === 'string' &&
    typeof q.section === 'string' &&
    typeof q.question === 'string' &&
    typeof q.explanation === 'string' &&
    q.correctAnswer !== undefined
  )
}

/**
 * @param {string} userAnswer
 * @param {string[]} keywords
 */
export function matchOpenTextKeywords(userAnswer, keywords) {
  const normalized = userAnswer.toLowerCase().trim()
  if (!normalized) return { correct: false, matched: [] }

  const matched = keywords.filter((kw) =>
    normalized.includes(kw.toLowerCase()),
  )
  const threshold = Math.ceil(keywords.length * 0.5)
  return {
    correct: matched.length >= threshold,
    matched,
    total: keywords.length,
  }
}

/**
 * @param {string|string[]} userAnswer
 * @param {string|string[]} correctAnswer
 * @param {QuestionType} type
 */
export function evaluateAnswer(userAnswer, correctAnswer, type) {
  switch (type) {
    case 'multiple_choice':
      return String(userAnswer).trim() === String(correctAnswer).trim()

    case 'multiple_select': {
      const user = Array.isArray(userAnswer)
        ? [...userAnswer].sort()
        : [String(userAnswer)]
      const correct = Array.isArray(correctAnswer)
        ? [...correctAnswer].sort()
        : [String(correctAnswer)]
      return (
        user.length === correct.length &&
        user.every((v, i) => v === correct[i])
      )
    }

    case 'ordering': {
      const user = Array.isArray(userAnswer) ? userAnswer : []
      const correct = Array.isArray(correctAnswer) ? correctAnswer : []
      return (
        user.length === correct.length &&
        user.every((v, i) => v === correct[i])
      )
    }

    case 'matrix': {
      if (
        typeof userAnswer !== 'object' ||
        userAnswer === null ||
        Array.isArray(userAnswer)
      ) {
        return false
      }
      const expected = /** @type {Record<string, number>} */ (correctAnswer)
      const actual = /** @type {Record<string, number>} */ (userAnswer)
      return Object.keys(expected).every(
        (key) => Number(actual[key]) === Number(expected[key]),
      )
    }

    case 'open_text':
      return false

    default:
      return false
  }
}
