# Modul 347 — Prüfungs-Lernapp

Offline-Lernapp für Modul 347 (Container, 30 Competencies). Übe Original-Prüfungsfragen, verfolge deinen Fortschritt und schalte Varianten frei, wenn alle Fragen eines Abschnitts korrekt beantwortet sind.

## Features

- **Dashboard** — Übersicht aller Abschnitte (A–F) mit Fortschrittsbalken
- **Lernmodus** — Fragen mit Musterlösung und Erklärung durcharbeiten
- **Quizmodus** — Originalfragen mit Sofort-Feedback üben
- **Schwache Themen** — Nur noch nicht korrekt beantwortete Fragen wiederholen
- **Varianten** — Freigeschaltet nach Meisterschaft eines Abschnitts (2 Varianten pro Originalfrage)
- **Prüfungssimulation** — Global freigeschaltet, wenn alle Originalfragen korrekt sind
- **Fortschritt** — Persistiert in `localStorage`

## Starten

```bash
npm install
npm run dev
```

Die App läuft unter `http://localhost:5173`.

## Build

```bash
npm run build
npm run preview
```

## Datenstruktur

Fragen liegen als JSON unter `src/data/questions/`. Varianten unter `src/data/variants/all-variants.json`.

Fragentypen: `multiple_choice`, `multiple_select`, `open_text`, `ordering`, `matrix`

## Hinweis zu PDF-Inhalten

Die 30 Originalfragen (je 3 pro Abschnitt A–F) entsprechen dem Modul-347-Prüfungsfragen-PDF. Varianten werden mit `node scripts/generate-variants.mjs` aus den Originalen erzeugt (2 pro Frage).
