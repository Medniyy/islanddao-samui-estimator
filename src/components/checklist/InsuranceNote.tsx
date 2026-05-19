export function InsuranceNote() {
  return (
    <div className="ps1-stack">
      <p className="ps1-disclaimer" style={{ paddingTop: 0 }}>
        Travel medical insurance is <strong>not included</strong> in this calculator’s totals. Coverage, exclusions, and
        rescue benefits vary wildly by policy — read the fine print for motorbikes, scuba, and pre-existing conditions.
      </p>
      <p className="ps1-hint" style={{ margin: 0 }}>
        As a purely illustrative anchor for budgeting (not a quote): short trips often land roughly{' '}
        <strong>USD $30–$120</strong> per person for basic comprehensive policies, depending on age, trip length, and
        activities — shop independently; this band is <strong>not</strong> modeled in the estimate above.
      </p>
    </div>
  );
}
