export default function OpenText({
  value,
  onChange,
  disabled,
  showResult,
  keywordResult,
}) {
  return (
    <div className="open-text-wrap">
      <textarea
        className="open-text-input"
        rows={4}
        placeholder="Deine Antwort..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
      />
      {showResult && keywordResult && (
        <p className="keyword-feedback">
          Erkannte Schlüsselbegriffe: {keywordResult.matched.length}/
          {keywordResult.total}
          {keywordResult.matched.length > 0 && (
            <span> ({keywordResult.matched.join(', ')})</span>
          )}
        </p>
      )}
    </div>
  )
}
