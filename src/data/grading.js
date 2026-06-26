export const EXAM_MAX_POINTS = 30

/**
 * Swiss grading scale: 6 = best, 1 = worst, linear mapping.
 * @param {number} correctCount
 * @param {number} [maxPoints]
 */
export function calculateSwissGrade(correctCount, maxPoints = EXAM_MAX_POINTS) {
  const points = correctCount
  const ratio = maxPoints > 0 ? points / maxPoints : 0
  const grade = Math.round((1 + 5 * ratio) * 10) / 10
  return {
    points,
    maxPoints,
    grade,
    passed: grade >= 4.0,
  }
}
