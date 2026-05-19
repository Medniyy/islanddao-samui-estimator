export function LocalApps() {
  return (
    <div className="ps1-stack">
      <p className="ps1-hint" style={{ marginTop: 0 }}>
        For rides and deliveries, Grab and Bolt are widely used in Thai tourist hubs. Compare pickup ETAs and surge
        pricing before you commit — both compete on overlapping routes.
      </p>
      <div className="ps1-local-apps">
        <a className="ps1-local-apps__item" href="https://www.grab.com/th/" target="_blank" rel="noopener noreferrer">
          <img src={`${import.meta.env.BASE_URL}apps/grab.svg`} alt="" width={36} height={36} />
          <span className="ps1-local-apps__meta">
            <span className="ps1-local-apps__name">Grab</span>
            <span className="ps1-local-apps__hint">Rides &amp; food delivery</span>
          </span>
        </a>
        <a className="ps1-local-apps__item" href="https://bolt.eu/" target="_blank" rel="noopener noreferrer">
          <img src={`${import.meta.env.BASE_URL}apps/bolt.svg`} alt="" width={36} height={36} />
          <span className="ps1-local-apps__meta">
            <span className="ps1-local-apps__name">Bolt</span>
            <span className="ps1-local-apps__hint">Ride-hailing alternative</span>
          </span>
        </a>
      </div>
      <p className="ps1-fine" style={{ marginBottom: 0 }}>
        <strong>eSIM / local SIM:</strong> Hardware-free eSIM plans and airport SIM booths both work for many travelers.
        Pricing and data caps change often — compare a neutral aggregator or carrier site rather than assuming one winner.
      </p>
    </div>
  );
}
