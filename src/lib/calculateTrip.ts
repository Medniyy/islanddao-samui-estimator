import pricesData from '../data/samui-prices.json';
import type {
  CalculatorInput,
  CategoryGroup,
  CurrencyConfig,
  ExpenseCategory,
  LineItem,
  PriceBand,
  SamuiPrices,
  TripResult,
} from './types';
import { CATEGORY_LABELS } from './types';

const prices = pricesData as SamuiPrices;

function bandMid(band: PriceBand): number {
  return band.mid;
}

function applyMargin(mid: number, marginPercent: number): { low: number; high: number } {
  const factor = marginPercent / 100;
  return {
    low: mid * (1 - factor),
    high: mid * (1 + factor),
  };
}

function lineFromMid(
  id: string,
  label: string,
  mid: number,
  marginPercent: number,
  category: ExpenseCategory,
): LineItem {
  const { low, high } = applyMargin(mid, marginPercent);
  return { id, label, mid, low, high, marginPercent, category };
}

function groupLineItems(items: LineItem[]): CategoryGroup[] {
  const map = new Map<ExpenseCategory, LineItem[]>();
  for (const item of items) {
    const list = map.get(item.category) ?? [];
    list.push(item);
    map.set(item.category, list);
  }

  const groups: CategoryGroup[] = [];
  for (const [category, catItems] of map) {
    const sorted = [...catItems].sort((a, b) => b.mid - a.mid);
    groups.push({
      category,
      label: CATEGORY_LABELS[category],
      items: sorted,
      subtotalMid: sorted.reduce((s, i) => s + i.mid, 0),
      subtotalLow: sorted.reduce((s, i) => s + i.low, 0),
      subtotalHigh: sorted.reduce((s, i) => s + i.high, 0),
    });
  }

  return groups.sort((a, b) => b.subtotalMid - a.subtotalMid);
}

export function durationToDays(value: number, unit: CalculatorInput['durationUnit']): number {
  if (value <= 0) return 1;
  switch (unit) {
    case 'weeks':
      return value * 7;
    case 'months':
      return value * 30;
    default:
      return value;
  }
}

export function getPrices(): SamuiPrices {
  return prices;
}

export function getCurrencies(): CurrencyConfig[] {
  return prices.currencies;
}

export function getCurrency(code: string): CurrencyConfig {
  return prices.currencies.find((c) => c.code === code) ?? prices.currencies[0];
}

export function isThailandOrigin(originId: string): boolean {
  const origin = prices.origins.find((o) => o.id === originId);
  return origin?.skipInternational === true;
}

export function calculateTrip(input: CalculatorInput): TripResult {
  const days = durationToDays(input.durationValue, input.durationUnit);
  const nights = Math.max(days - 1, 1);
  const m = prices.margins;
  const tier = prices.tiers[input.tier];
  const { enabled } = input;
  const lineItems: LineItem[] = [];
  const inThailand = isThailandOrigin(input.originId);

  if (enabled.internationalFlights && !inThailand) {
    let flightMid: number;
    if (input.originId === 'other') {
      flightMid = input.customFlightMid ?? 0;
    } else {
      const origin = prices.origins.find((o) => o.id === input.originId);
      flightMid = origin ? bandMid(origin.flights) : 0;
    }
    lineItems.push(
      lineFromMid(
        'flights',
        'International flights (round-trip to Bangkok)',
        flightMid,
        m.internationalFlights,
        'transport',
      ),
    );
  }

  if (enabled.bangkokSamui) {
    const bkkBand = prices.bangkokSamui[input.bangkokRoute];
    const bkkMid = bandMid(bkkBand);
    lineItems.push(
      lineFromMid(
        'bkkSamui',
        input.bangkokRoute === 'flight'
          ? 'Bangkok ↔ Koh Samui (flights)'
          : 'Bangkok ↔ Koh Samui (bus/train + ferry)',
        bkkMid,
        m.bangkokSamui,
        'transport',
      ),
    );
  }

  if (enabled.accommodation) {
    const stayMid = bandMid(tier.accommodationPerNight) * nights;
    lineItems.push(
      lineFromMid('accommodation', `Stay (${nights} nights)`, stayMid, m.accommodation, 'accommodation'),
    );
  }

  const foodBand = tier.foodPerDay;
  const foodPerDayMid = bandMid(foodBand);
  const foodPerDayMargins = applyMargin(foodPerDayMid, m.food);

  if (enabled.food) {
    const foodMid = foodPerDayMid * days;
    lineItems.push(
      lineFromMid(
        'food',
        `Food & drinks (${formatPerDayLabel(foodPerDayMid)} × ${days} days)`,
        foodMid,
        m.food,
        'food',
      ),
    );
  }

  if (enabled.nightlife) {
    const nightlifeMid = bandMid(tier.nightlifePerDay) * days;
    lineItems.push(
      lineFromMid('nightlife', 'Going out / bars', nightlifeMid, m.nightlife, 'lifestyle'),
    );
  }

  if (enabled.motorbike) {
    const weeks = Math.ceil(days / 7);
    const bundleWeeks = weeks * prices.motorbike.weeklyBundle.mid;
    const dailyTotal = prices.motorbike.perDay.mid * days;
    const motorbikeMid = Math.min(bundleWeeks, dailyTotal);
    lineItems.push(
      lineFromMid('motorbike', 'Motorbike rental', motorbikeMid, m.motorbike, 'transport'),
    );
  }

  if (enabled.extras) {
    const extrasMid = prices.extras.sim.mid + prices.extras.miscBuffer.mid;
    lineItems.push(
      lineFromMid('extras', 'SIM + misc (Grab, laundry, ATM)', extrasMid, m.extras, 'extras'),
    );
  }

  const totalMid = lineItems.reduce((s, l) => s + l.mid, 0);
  const totalLow = lineItems.reduce((s, l) => s + l.low, 0);
  const totalHigh = lineItems.reduce((s, l) => s + l.high, 0);
  const overallMarginPercent =
    totalMid > 0 ? Math.round(((totalHigh - totalMid) / totalMid) * 100) : 0;

  let affordability: TripResult['affordability'];
  if (input.budgetUsd != null && input.budgetUsd > 0) {
    const withinBudget = input.budgetUsd >= totalHigh;
    affordability = {
      withinBudget,
      overBy: withinBudget ? 0 : totalHigh - input.budgetUsd,
      budget: input.budgetUsd,
    };
  }

  const foodLine = lineItems.find((l) => l.id === 'food');

  return {
    days,
    nights,
    lineItems,
    categoryGroups: groupLineItems(lineItems),
    totalMid,
    totalLow,
    totalHigh,
    overallMarginPercent,
    perDayMid: days > 0 ? totalMid / days : 0,
    perWeekMid: days > 0 ? (totalMid / days) * 7 : 0,
    perMonthMid: days > 0 ? (totalMid / days) * 30 : 0,
    foodDaily: {
      enabled: enabled.food,
      perDayMid: foodPerDayMid,
      perDayLow: foodPerDayMargins.low,
      perDayHigh: foodPerDayMargins.high,
      tripTotalMid: foodLine?.mid ?? foodPerDayMid * days,
      marginPercent: m.food,
    },
    affordability,
  };
}

function formatPerDayLabel(usdPerDay: number): string {
  return `~$${Math.round(usdPerDay)}/day`;
}

export function formatMoney(usd: number, currencyCode: string): string {
  const c = getCurrency(currencyCode);
  const amount = usd * c.ratePerUsd;
  const rounded =
    c.decimals === 0 ? Math.round(amount) : Number(amount.toFixed(c.decimals));
  return `${c.symbol}${rounded.toLocaleString()}`;
}
