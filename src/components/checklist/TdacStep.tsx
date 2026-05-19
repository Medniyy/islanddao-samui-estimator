export function TdacStep() {
  return (
    <div className="ps1-stack">
      <p className="ps1-hint" style={{ marginTop: 0 }}>
        Thailand Digital Arrival Card (TDAC) — submit through the official immigration domain when required for your
        route. Many travelers complete it <strong>within 72 hours before arrival</strong> (timing requirements can change —
        read the live instructions on the portal).
      </p>
      <a
        className="ps1-btn ps1-btn--primary"
        href="https://tdac.immigration.go.th/"
        target="_blank"
        rel="noopener noreferrer"
      >
        TDAC — tdac.immigration.go.th
      </a>
      <p className="ps1-fine" style={{ marginBottom: 0 }}>
        Keep a screenshot or PDF confirmation if the site provides one; airline and border staff may ask for it.
      </p>
    </div>
  );
}
