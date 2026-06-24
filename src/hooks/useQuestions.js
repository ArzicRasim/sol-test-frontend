import {
  allQuestions,
  getOriginalQuestions,
  getQuestionById,
  getSectionStats,
  getVariantQuestions,
  sections,
} from '../data/index.js'

export function useQuestions(sectionId) {
  const originals = getOriginalQuestions(sectionId ?? 'all')
  const variants = getVariantQuestions(sectionId ?? 'all')
  const stats = getSectionStats(sectionId ?? 'all')

  return {
    sections,
    allQuestions,
    originals,
    variants,
    stats,
    getQuestionById,
  }
}
