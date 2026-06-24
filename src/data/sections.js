/** @typedef {{ id: string, title: string, description: string, order: number }} Section */

/** @type {Section[]} */
export const sections = [
  {
    id: 'A',
    title: 'Grundlagen',
    description: 'Container-Grundlagen, Docker-Konzepte und Unterschiede zu VMs',
    order: 1,
  },
  {
    id: 'B1',
    title: 'Containerkomposition (Architektur)',
    description: 'Architektur verteilter Container-Anwendungen',
    order: 2,
  },
  {
    id: 'B2',
    title: 'Container-Orchestrierung',
    description: 'Kubernetes, Pods, Services und Skalierung',
    order: 3,
  },
  {
    id: 'C1',
    title: 'Containerdienstleister auswählen',
    description: 'Bewertungskriterien für Cloud-Container-Plattformen',
    order: 4,
  },
  {
    id: 'C2',
    title: 'Anbietervergleich & Entscheidung',
    description: 'Vergleich PCA-Angebote und Entscheidungsfindung',
    order: 5,
  },
  {
    id: 'D1',
    title: 'Praxis: Container in der Entwicklung',
    description: 'Dockerfile, Compose, lokale Entwicklungsumgebung',
    order: 6,
  },
  {
    id: 'D2',
    title: 'Praxis: CI/CD mit Containern',
    description: 'Build-Pipelines, Registry und Deployment in der Entwicklung',
    order: 7,
  },
  {
    id: 'E1',
    title: 'Praxis: Container beim PCA (Betrieb)',
    description: 'Betrieb von Containern in der Public Cloud',
    order: 8,
  },
  {
    id: 'E2',
    title: 'Praxis: Betrieb & Skalierung in der Cloud',
    description: 'Monitoring, Logging und Hochverfügbarkeit im Betrieb',
    order: 9,
  },
  {
    id: 'F',
    title: 'Qualitätskontrollen',
    description: 'Tests, Reviews und Qualitätssicherung für Container-Projekte',
    order: 10,
  },
]

export function getSectionById(id) {
  return sections.find((s) => s.id === id)
}
