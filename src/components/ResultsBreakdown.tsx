import { formatMoney } from '../lib/calculateTrip';
import type { TripResult } from '../lib/types';
import { DailyInsights } from './DailyInsights';
import { Disclaimer } from './Disclaimer';

interface Props {
  result: TripResult;
  currencyCode: string;
}

export function ResultsBreakdown({ result, currencyCode }: Props) {
  const {
    categoryGroups,
    totalMid,
    totalLow,
    totalHigh,
    overallMarginPercent,
    perDayMid,
    perWeekMid,
    perMonthMid,
    days,
    affordability,
    foodDaily,
  } = result;

  const fmt = (n: number) => formatMoney(n, currencyCode);

  return (
    <section className="ps1-results" aria-live="polite">
      <Disclaimer prominent />

      <DailyInsights food={foodDaily} days={days} currencyCode={currencyCode} />

      <div className="ps1-card ps1-card--total">
        <p className="ps1-card__label">Estimated total</p>
        <p className="ps1-total-mid">{fmt(totalMid)}</p>
        <p className="ps1-total-range">
          Range: {fmt(totalLow)} – {fmt(totalHigh)}
          <span className="ps1-margin-badge"> ±~{overallMarginPercent}%</span>
        </p>
        <p className="ps1-subcopy">
          {days} days · only includes items you turned on
        </p>
        <dl className="ps1-period-grid">
          <div>
            <dt>Per day</dt>
            <dd>{fmt(perDayMid)}</dd>
          </div>
          <div>
            <dt>Per week</dt>
            <dd>{fmt(perWeekMid)}</dd>
          </div>
          <div>
            <dt>Per month (30d)</dt>
            <dd>{fmt(perMonthMid)}</dd>
          </div>
        </dl>
      </div>

      {affordability && (
        <div
          className={`ps1-card ps1-afford ${affordability.withinBudget ? 'ps1-afford--ok' : 'ps1-afford--over'}`}
        >
          {affordability.withinBudget ? (
            <p>
              Your budget ({fmt(affordability.budget)}) likely covers the upper estimate for your
              selection.
            </p>
          ) : (
            <p>
              Upper estimate exceeds your budget by <strong>{fmt(affordability.overBy)}</strong>{' '}
              (budget: {fmt(affordability.budget)} vs high {fmt(totalHigh)}).
            </p>
          )}
        </div>
      )}

      {categoryGroups.length > 0 ? (
        <div className="ps1-card">
          <h2 className="ps1-card__label">Breakdown by category</h2>
          <p className="ps1-hint">Sorted highest → lowest</p>
          <div className="ps1-category-list">
            {categoryGroups.map((group) => (
              <article key={group.category} className="ps1-category-block">
                <header className="ps1-category-header">
                  <h3 className="ps1-category-title">{group.label}</h3>
                  <span className="ps1-category-subtotal">{fmt(group.subtotalMid)}</span>
                </header>
                <ul className="ps1-category-items">
                  {group.items.map((line) => (
                    <li key={line.id} className="ps1-category-line">
                      <span className="ps1-category-line__name">
                        {line.label}
                        {line.id === 'food' && days > 0 && (
                          <span className="ps1-category-line__perday">
                            {' '}
                            · {fmt(line.mid / days)}/day
                          </span>
                        )}
                      </span>
                      <span className="ps1-category-line__amount">{fmt(line.mid)}</span>
                    </li>
                  ))}
                </ul>
                <p className="ps1-category-range">
                  Range {fmt(group.subtotalLow)} – {fmt(group.subtotalHigh)}
                </p>
              </article>
            ))}
            <footer className="ps1-category-footer">
              <span>Total (selected)</span>
              <strong>{fmt(totalMid)}</strong>
            </footer>
          </div>
        </div>
      ) : (
        <div className="ps1-card">
          <p>Turn on at least one item above to see an estimate.</p>
        </div>
      )}
    </section>
  );
}
