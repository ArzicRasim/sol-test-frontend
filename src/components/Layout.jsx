import { Link, Outlet, useLocation } from 'react-router-dom'
import { useProgress } from '../hooks/useProgress.js'

export default function Layout() {
  const location = useLocation()
  const { globalStats } = useProgress()

  const navItems = [
    { to: '/', label: 'Dashboard' },
    { to: '/progress', label: 'Fortschritt' },
    { to: '/exam', label: 'Prüfungssimulation' },
  ]

  return (
    <div className="app-layout">
      <header className="app-header">
        <div className="header-inner">
          <Link to="/" className="brand">
            <span className="brand-module">Modul 347</span>
            <span className="brand-title">Container — Prüfungs-Lernapp</span>
          </Link>
          <nav className="main-nav">
            {navItems.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className={location.pathname === to ? 'nav-link active' : 'nav-link'}
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="header-stats">
          {globalStats.correct}/{globalStats.total} Originalfragen korrekt
          {globalStats.allMastered && (
            <span className="badge badge-success">Alle gemeistert</span>
          )}
        </div>
      </header>
      <main className="app-main">
        <Outlet />
      </main>
      <footer className="app-footer">
        Modul 347 — 30 Competencies · Offline-Lernmodus
      </footer>
    </div>
  )
}
