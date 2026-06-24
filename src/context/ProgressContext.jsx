import { createContext, useCallback, useEffect, useMemo, useState } from 'react'
import {
  getOriginalQuestions,
  getSectionStats,
  getVariantQuestions,
  originalQuestions,
  sections,
} from '../data/index.js'
import {
  getSectionProgress,
  getWeakQuestions,
  isAllMastered,
  isSectionMastered,
  loadProgress,
  recordAnswer,
  resetProgress,
  saveProgress,
} from './progressStorage.js'

const ProgressContext = createContext(null)

export { ProgressContext }

export function ProgressProvider({ children }) {
  const [progress, setProgress] = useState(loadProgress)

  useEffect(() => {
    saveProgress(progress)
  }, [progress])

  const submitAnswer = useCallback((questionId, correct) => {
    setProgress((prev) => recordAnswer(prev, questionId, correct))
  }, [])

  const clearProgress = useCallback(() => {
    resetProgress()
    setProgress({})
  }, [])

  const getSectionData = useCallback(
    (sectionId) => {
      const originals = getOriginalQuestions(sectionId)
      const stats = getSectionProgress(progress, originals)
      const mastered = isSectionMastered(progress, originals)
      const variantsUnlocked = mastered
      const weak = getWeakQuestions(progress, originals)
      return { originals, stats, mastered, variantsUnlocked, weak }
    },
    [progress],
  )

  const globalStats = useMemo(() => {
    const total = originalQuestions.length
    const correct = originalQuestions.filter((q) => progress[q.id]?.correct).length
    const allMastered = isAllMastered(progress, originalQuestions)
    const sectionsMastered = sections.filter((s) =>
      isSectionMastered(progress, getOriginalQuestions(s.id)),
    ).length
    return { total, correct, allMastered, sectionsMastered, sectionCount: sections.length }
  }, [progress])

  const value = useMemo(
    () => ({
      progress,
      submitAnswer,
      clearProgress,
      getSectionData,
      globalStats,
      isSectionMastered: (sectionId) =>
        isSectionMastered(progress, getOriginalQuestions(sectionId)),
      getVariantQuestions: (sectionId) => getVariantQuestions(sectionId),
      getSectionStats,
    }),
    [progress, submitAnswer, clearProgress, getSectionData, globalStats],
  )

  return (
    <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>
  )
}
