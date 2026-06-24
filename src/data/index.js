import aGrundlagen from './questions/a-grundlagen.json'
import b1Containerkomposition from './questions/b1-containerkomposition.json'
import b2Orchestrierung from './questions/b2-orchestrierung.json'
import c1Containerdienstleister from './questions/c1-containerdienstleister.json'
import c2Anbietervergleich from './questions/c2-anbietervergleich.json'
import d1Entwicklung from './questions/d1-entwicklung.json'
import d2Cicd from './questions/d2-cicd.json'
import e1PcaBetrieb from './questions/e1-pca-betrieb.json'
import e2Skalierung from './questions/e2-skaliierung.json'
import fQualitaet from './questions/f-qualitaet.json'
import allVariants from './variants/all-variants.json'
import { sections, getSectionById } from './sections.js'

/** @type {import('./schema.js').Question[]} */
const originalQuestions = [
  ...aGrundlagen,
  ...b1Containerkomposition,
  ...b2Orchestrierung,
  ...c1Containerdienstleister,
  ...c2Anbietervergleich,
  ...d1Entwicklung,
  ...d2Cicd,
  ...e1PcaBetrieb,
  ...e2Skalierung,
  ...fQualitaet,
]

/** @type {import('./schema.js').Question[]} */
export const allQuestions = [...originalQuestions, ...allVariants]

export function getOriginalQuestions(sectionId) {
  if (sectionId === 'all') {
    return originalQuestions
  }
  return originalQuestions.filter((q) => q.section === sectionId)
}

export function getVariantQuestions(sectionId) {
  const variants = allVariants.filter((q) => q.source === 'variant')
  if (sectionId === 'all') return variants
  return variants.filter((q) => q.section === sectionId)
}

export function getQuestionsForMode(sectionId, mode) {
  if (mode === 'exam' || mode === 'variants') {
    return getVariantQuestions(sectionId)
  }
  if (mode === 'weak') {
    return getOriginalQuestions(sectionId)
  }
  return getOriginalQuestions(sectionId)
}

export function getQuestionById(id) {
  return allQuestions.find((q) => q.id === id)
}

export function getSectionStats(sectionId) {
  const originals = getOriginalQuestions(sectionId)
  const variants = getVariantQuestions(sectionId)
  return {
    originalCount: originals.length,
    variantCount: variants.length,
    totalCount: originals.length + variants.length,
  }
}

export { sections, getSectionById, originalQuestions }
