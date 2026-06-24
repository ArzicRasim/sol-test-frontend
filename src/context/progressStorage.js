const STORAGE_KEY = 'modul347-progress'

/**
 * @typedef {{ attempts: number, correct: boolean, lastAnswered: string }} QuestionProgress
 * @typedef {Record<string, QuestionProgress>} ProgressState
 */

/** @returns {ProgressState} */
export function loadProgress() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return {}
    return JSON.parse(raw)
  } catch {
    return {}
  }
}

/** @param {ProgressState} progress */
export function saveProgress(progress) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress))
}

export function resetProgress() {
  localStorage.removeItem(STORAGE_KEY)
}

/**
 * @param {ProgressState} progress
 * @param {string} questionId
 * @param {boolean} correct
 */
export function recordAnswer(progress, questionId, correct) {
  const existing = progress[questionId] ?? { attempts: 0, correct: false, lastAnswered: '' }
  return {
    ...progress,
    [questionId]: {
      attempts: existing.attempts + 1,
      correct: existing.correct || correct,
      lastAnswered: new Date().toISOString(),
    },
  }
}

/**
 * @param {ProgressState} progress
 * @param {import('./schema.js').Question[]} originals
 */
export function isSectionMastered(progress, originals) {
  if (originals.length === 0) return false
  return originals.every((q) => progress[q.id]?.correct === true)
}

/**
 * @param {ProgressState} progress
 * @param {import('./schema.js').Question[]} allOriginals
 */
export function isAllMastered(progress, allOriginals) {
  return isSectionMastered(progress, allOriginals)
}

/**
 * @param {ProgressState} progress
 * @param {import('./schema.js').Question[]} originals
 */
export function getSectionProgress(progress, originals) {
  const correct = originals.filter((q) => progress[q.id]?.correct).length
  return { correct, total: originals.length }
}

/**
 * @param {ProgressState} progress
 * @param {import('./schema.js').Question[]} originals
 */
export function getWeakQuestions(progress, originals) {
  return originals.filter((q) => !progress[q.id]?.correct)
}

export { STORAGE_KEY }
