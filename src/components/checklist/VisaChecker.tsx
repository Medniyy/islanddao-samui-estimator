import { useId, useMemo, useState } from 'react';
import { getPrices } from '../../lib/calculateTrip';
import { getVisaDisplay } from '../../lib/visaCheck';

const IMMIGRATION_URL = 'https://www.immigration.go.th/';

export function VisaChecker() {
  const prices = useMemo(() => getPrices(), []);
  const selectId = useId();
  const [originId, setOriginId] = useState(prices.origins[0]?.id ?? 'us');

  const visa = getVisaDisplay(originId);

  return (
    <div className="ps1-stack">
      <aside className="ps1-visa-warning-banner" role="note">
        <p>
          <strong>Immigration rules are not stable advice.</strong>
          Thai visa exemptions, e-visas, landing procedures, and enforcement change with little notice. This panel uses
          open summaries and rough patterns — policies may be under active review.{' '}
          <strong>You are personally responsible</strong> for meeting entry rules; verify with Thai immigration, your
          airline, and your embassy before travel.
        </p>
      </aside>

      <label className="ps1-field">
        <span className="ps1-label" id={`${selectId}-label`}>
          Your passport country
        </span>
        <select
          id={selectId}
          className="ps1-select"
          aria-labelledby={`${selectId}-label`}
          value={originId}
          onChange={(e) => setOriginId(e.target.value)}
        >
          {prices.origins.map((o) => (
            <option key={o.id} value={o.id}>
              {o.label}
            </option>
          ))}
          <option value="other">Other country (not listed)</option>
        </select>
      </label>

      <div className="ps1-visa-result">
        <p
          className={
            visa.showPreliminaryWarning
              ? 'ps1-visa-result__preliminary'
              : 'ps1-visa-result__preliminary ps1-visa-result__preliminary--neutral'
          }
        >
          {visa.preliminaryHeadline}
        </p>
        <p className="ps1-visa-result__detail">{visa.detail}</p>
      </div>

      <aside className="ps1-visa-verify-cta" role="note">
        <p>
          <strong>Verify on the official immigration portal before you travel</strong> —{' '}
          <a href={IMMIGRATION_URL} target="_blank" rel="noopener noreferrer">
            immigration.go.th
          </a>
        </p>
      </aside>
    </div>
  );
}
