/** @typedef {{ id: string, title: string, description: string, order: number }} Section */

/** @type {Section[]} */
export const sections = [
  {
    id: 'A',
    title: 'Grundlagen',
    description: 'Container-Grundlagen und Unterschiede zu virtuellen Maschinen',
    order: 1,
  },
  {
    id: 'B1',
    title: 'Containerkomposition (Architektur)',
    description: 'Monolithische und Microservice-Architekturen mit Containern',
    order: 2,
  },
  {
    id: 'B2',
    title: 'Docker-Technologie und lokale Entwicklung',
    description: 'Docker-Bestandteile, docker compose und Netzwerksicherheit',
    order: 3,
  },
  {
    id: 'C1',
    title: 'Containerdienstleister auswählen',
    description: 'PCA-Dienste, Public Cloud und Entscheidungsmatrix',
    order: 4,
  },
  {
    id: 'C2',
    title: 'Container Registry und Orchestrierung',
    description: 'Registry, Orchestrierungstechnologien und private Registries',
    order: 5,
  },
  {
    id: 'D1',
    title: 'Praxis mit Containern in der Entwicklung',
    description: 'Docker-Befehle und docker-compose.yml',
    order: 6,
  },
  {
    id: 'D2',
    title: 'Image-Erstellung und Registry',
    description: 'docker run, Image-Build und Registry-Publikation',
    order: 7,
  },
  {
    id: 'E1',
    title: 'Praxis mit Containern beim PCA (Betrieb)',
    description: 'Cloud-Sicherheit, Firewall und Netzwerkarchitektur',
    order: 8,
  },
  {
    id: 'E2',
    title: 'Storage, Skalierung und Metadaten',
    description: 'Persistent Volumes, Skalierung und Cloud-Metadaten',
    order: 9,
  },
  {
    id: 'F',
    title: 'Qualitätskontrollen planen und umsetzen',
    description: 'Image-Scanning, Sicherheitsindikatoren und sichere Dockerfiles',
    order: 10,
  },
]

export function getSectionById(id) {
  return sections.find((s) => s.id === id)
}
