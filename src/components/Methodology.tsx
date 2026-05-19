import { useState } from 'react';
import { getPrices } from '../lib/calculateTrip';

export function Methodology() {
  const [open, setOpen] = useState(false);
  const prices = getPrices();

  return (
    <section className="ps1-methodology" id="methodology">
      <button
        type="button"
        className="ps1-btn ps1-methodology-toggle"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        {open ? '▼' : '▶'} Methodology & formulas
      </button>
      {open && (
        <div className="ps1-card ps1-methodology-body">
          <p className="ps1-fine">
            Last updated: {prices.lastUpdated} · Rates in JSON (USD base, converted per currency)
          </p>

          <h3 className="ps1-methodology-h">Total estimate</h3>
          <pre className="ps1-formula">
{`totalMid = sum of enabled line items only
perDay   = totalMid / days
perWeek  = perDay × 7
perMonth = perDay × 30`}
          </pre>

          <h3 className="ps1-methodology-h">Margin of error (per line)</h3>
          <pre className="ps1-formula">
{`lineLow  = lineMid × (1 - marginPercent / 100)
lineHigh = lineMid × (1 + marginPercent / 100)
overallMargin% ≈ (totalHigh - totalMid) / totalMid × 100`}
          </pre>

          <table className="ps1-table">
            <thead>
              <tr>
                <th>Category</th>
                <th className="num">±%</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(prices.margins).map(([key, pct]) => (
                <tr key={key}>
                  <td>{key}</td>
                  <td className="num">{pct}%</td>
                </tr>
              ))}
            </tbody>
          </table>

          <h3 className="ps1-methodology-h">Breakdown order</h3>
          <p className="ps1-fine">
            Categories sorted by subtotal (highest first). Thailand origin skips international
            flights; only Bangkok ↔ Samui applies.
          </p>

          <h3 className="ps1-methodology-h">Data sources</h3>
          <ul className="ps1-sources">
            {prices.sources.map((url) => (
              <li key={url}>
                <a href={url} target="_blank" rel="noopener noreferrer">
                  {url}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
