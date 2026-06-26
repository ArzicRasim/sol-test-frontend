import { Link } from 'react-router-dom'
import { sections } from '../data/index.js'
import { useProgress } from '../hooks/useProgress.js'
import SectionCard from '../components/SectionCard.jsx'
import ProgressBar from '../components/ProgressBar.jsx'

export default function Dashboard() {
  const { globalStats } = useProgress()

  return (
    <div className="page dashboard">
      <header className="page-header">
        <h1>Modul 347 — Prüfungsvorbereitung</h1>
        <p>
          Lerne und übe Prüfungsfragen zu Containern, Docker, Kubernetes und
          Cloud-Betrieb. Meistere alle Originalfragen, um Varianten freizuschalten.
        </p>
      </header>

      <section className="global-progress">
        <ProgressBar
          correct={globalStats.correct}
          total={globalStats.total}
          label="Gesamtfortschritt (Originalfragen)"
        />
        <div className="global-actions">
          <Link to="/quiz/all" className="btn btn-primary">
            Gesamt-Quiz starten
          </Link>
          {globalStats.allMastered && (
            <Link to="/exam" className="btn btn-accent">
              Prüfungssimulation
            </Link>
          )}
        </div>
      </section>

      <section className="sections-grid">
        {sections.map((section) => (
          <SectionCard key={section.id} section={section} />
        ))}
      </section>
    </div>
  )
}
