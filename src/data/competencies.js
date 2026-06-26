/** Maps section IDs to competency band prefixes (ICT Kompetenzmatrix). */
export const COMPETENCY_BANDS = {
  A: 'A1',
  B1: 'B1',
  B2: 'B2',
  C1: 'C1',
  C2: 'C2',
  D1: 'D1',
  D2: 'D2',
  E1: 'E1',
  E2: 'E2',
  F: 'F1',
}

/** Gütestufen: G = Beginner, F = Intermediate, E = Advanced */
export const LEVEL_SUFFIXES = ['G', 'F', 'E']

/**
 * @param {string} section
 * @param {number} indexInSection 0-based index within the section (0–2)
 * @returns {string}
 */
export function getCompetencyCode(section, indexInSection) {
  const band = COMPETENCY_BANDS[section] ?? section
  const suffix = LEVEL_SUFFIXES[indexInSection] ?? LEVEL_SUFFIXES[0]
  return `${band}${suffix}`
}

/**
 * @param {import('./schema.js').Question} question
 * @param {number} indexInSection
 * @returns {import('./schema.js').Question}
 */
export function withCompetencyCode(question, indexInSection) {
  return {
    ...question,
    competencyCode: getCompetencyCode(question.section, indexInSection),
  }
}
