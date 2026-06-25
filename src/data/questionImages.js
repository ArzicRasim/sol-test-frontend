const images = import.meta.glob('../assets/Screenshots/*.png', {
  eager: true,
  import: 'default',
})

/**
 * @param {string} filename
 * @returns {string|undefined}
 */
export function getQuestionImage(filename) {
  if (!filename) return undefined
  return images[`../assets/Screenshots/${filename}`]
}
