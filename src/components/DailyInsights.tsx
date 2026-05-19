import { formatMoney } from '../lib/calculateTrip';
import type { FoodDailyInsight } from '../lib/types';

interface Props {
  food: FoodDailyInsight;
  days: number;
  currencyCode: string;
}

export function DailyInsights({ food, days, currencyCode }: Props) {
  const fmt = (n: number) => formatMoney(n, currencyCode);

  return (
    <section className="ps1-card ps1-daily-card" aria-labelledby="daily-heading">
      <h2 id="daily-heading" className="ps1-card__label">
        Food per day
      </h2>
      {food.enabled ? (
        <>
          <div className="ps1-daily-hero">
            <p className="ps1-daily-amount">{fmt(food.perDayMid)} / day</p>
            <p className="ps1-daily-trip">
              {fmt(food.tripTotalMid)} total · {days} days
            </p>
          </div>
          <p className="ps1-daily-note">
            Expect about {fmt(food.perDayLow)} – {fmt(food.perDayHigh)} per day for meals & drinks
            (±{food.marginPercent}% vs mid). This is <strong>only food</strong> — not bars or your
            full trip total.
          </p>
        </>
      ) : (
        <p className="ps1-daily-note ps1-daily-card--muted">
          For your tier, food runs about {fmt(food.perDayMid)} / day ({fmt(food.perDayLow)} –{' '}
          {fmt(food.perDayHigh)}). Turn on <strong>Food & drinks</strong> above to include it in
          your total.
        </p>
      )}
    </section>
  );
}
