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
import { withCompetencyCode } from './competencies.js'
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

/**
 * @param {import('./schema.js').Question[]} questions
 * @returns {import('./schema.js').Question[]}
 */
function enrichWithCompetencyCodes(questions) {
  const indexBySection = /** @type {Record<string, number>} */ ({})
  return questions.map((q) => {
    const idx = indexBySection[q.section] ?? 0
    indexBySection[q.section] = idx + 1
    return withCompetencyCode(q, idx)
  })
}

/** @type {import('./schema.js').Question[]} */
const enrichedOriginalQuestions = enrichWithCompetencyCodes(originalQuestions)

export function getOriginalQuestions(sectionId) {
  if (sectionId === 'all') {
    return enrichedOriginalQuestions
  }
  const filtered = originalQuestions.filter((q) => q.section === sectionId)
  return enrichWithCompetencyCodes(filtered)
}

export function getVariantQuestions(sectionId) {
  const variants = allVariants.filter((q) => q.source === 'variant')
  if (sectionId === 'all') return variants
  return variants.filter((q) => q.section === sectionId)
}

/** Exam: 30 originals in fixed section order A → F, no shuffle. */
export function getExamQuestions() {
  return sections.flatMap((section) => getOriginalQuestions(section.id))
}

export function getQuestionsForMode(sectionId, mode) {
  if (mode === 'exam') {
    return sectionId === 'all' ? getExamQuestions() : getOriginalQuestions(sectionId)
  }
  if (mode === 'variants') {
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
