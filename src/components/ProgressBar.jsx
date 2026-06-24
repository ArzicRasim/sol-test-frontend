export default function ProgressBar({ correct, total, label }) {
  const pct = total > 0 ? Math.round((correct / total) * 100) : 0

  return (
    <div className="progress-bar-wrap">
      {label && (
        <div className="progress-bar-label">
          <span>{label}</span>
          <span>
            {correct}/{total} ({pct}%)
          </span>
        </div>
      )}
      <div className="progress-bar-track" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100}>
        <div className="progress-bar-fill" style={{ width: `${pct}%` }} />
      </div>
    </div>
  )
}
