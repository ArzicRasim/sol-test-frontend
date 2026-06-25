/**
 * Generiert 2 Varianten pro Originalfrage.
 * Options-Shuffle erfolgt zur Laufzeit in QuestionCard (seed aus question.id).
 * Ausführen: node scripts/generate-variants.mjs
 */
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..')
const questionsDir = path.join(root, 'src/data/questions')
const outputPath = path.join(root, 'src/data/variants/all-variants.json')

const questionFiles = [
  'a-grundlagen.json',
  'b1-containerkomposition.json',
  'b2-orchestrierung.json',
  'c1-containerdienstleister.json',
  'c2-anbietervergleich.json',
  'd1-entwicklung.json',
  'd2-cicd.json',
  'e1-pca-betrieb.json',
  'e2-skaliierung.json',
  'f-qualitaet.json',
]

/** @param {Record<string, unknown>} question @param {number} variantNum */
function createVariant(question, variantNum) {
  const { id, source, parentId, ...rest } = question
  void id
  void source
  void parentId

  return {
    ...rest,
    id: `${question.id}-v${variantNum}`,
    source: 'variant',
    parentId: question.id,
    question: `[Variante ${variantNum}] ${question.question}`,
  }
}

const originals = questionFiles.flatMap((file) => {
  const content = fs.readFileSync(path.join(questionsDir, file), 'utf8')
  return JSON.parse(content)
})

const variants = originals.flatMap((q) => [
  createVariant(q, 1),
  createVariant(q, 2),
])

fs.writeFileSync(outputPath, `${JSON.stringify(variants, null, 2)}\n`)
console.log(`Generated ${variants.length} variants from ${originals.length} originals.`)
