export type TierId = 'budget' | 'mid' | 'premium';
export type BangkokRoute = 'flight' | 'budgetRoute';
export type DurationUnit = 'days' | 'weeks' | 'months';
export type ExpenseCategory = 'transport' | 'accommodation' | 'food' | 'lifestyle' | 'extras';
export type ExpenseToggleId =
  | 'internationalFlights'
  | 'bangkokSamui'
  | 'accommodation'
  | 'food'
  | 'nightlife'
  | 'motorbike'
  | 'extras';

export interface PriceBand {
  low: number;
  mid: number;
  high: number;
}

export interface TierDaily {
  accommodationPerNight: PriceBand;
  foodPerDay: PriceBand;
  nightlifePerDay: PriceBand;
}

export interface Origin {
  id: string;
  label: string;
  flights: PriceBand;
  skipInternational?: boolean;
}

export interface CurrencyConfig {
  code: string;
  label: string;
  symbol: string;
  ratePerUsd: number;
  decimals: number;
}

export interface SamuiPrices {
  lastUpdated: string;
  sources: string[];
  thbPerUsd: number;
  currencies: CurrencyConfig[];
  margins: Record<string, number>;
  origins: Origin[];
  bangkokSamui: {
    flight: PriceBand;
    budgetRoute: PriceBand;
  };
  tiers: Record<TierId, TierDaily>;
  extras: {
    sim: { mid: number };
    miscBuffer: { mid: number };
  };
  motorbike: {
    perDay: { mid: number };
    weeklyBundle: { mid: number };
  };
}

export type ExpenseToggles = Record<ExpenseToggleId, boolean>;

export interface CalculatorInput {
  originId: string;
  customFlightMid?: number;
  durationValue: number;
  durationUnit: DurationUnit;
  tier: TierId;
  bangkokRoute: BangkokRoute;
  enabled: ExpenseToggles;
  budgetUsd?: number;
  currencyCode: string;
}

export interface LineItem {
  id: string;
  label: string;
  mid: number;
  low: number;
  high: number;
  marginPercent: number;
  category: ExpenseCategory;
}

export interface CategoryGroup {
  category: ExpenseCategory;
  label: string;
  items: LineItem[];
  subtotalMid: number;
  subtotalLow: number;
  subtotalHigh: number;
}

export interface FoodDailyInsight {
  enabled: boolean;
  perDayMid: number;
  perDayLow: number;
  perDayHigh: number;
  tripTotalMid: number;
  marginPercent: number;
}

export interface TripResult {
  days: number;
  nights: number;
  lineItems: LineItem[];
  categoryGroups: CategoryGroup[];
  totalMid: number;
  totalLow: number;
  totalHigh: number;
  overallMarginPercent: number;
  perDayMid: number;
  perWeekMid: number;
  perMonthMid: number;
  foodDaily: FoodDailyInsight;
  affordability?: {
    withinBudget: boolean;
    overBy: number;
    budget: number;
  };
}

export const CATEGORY_LABELS: Record<ExpenseCategory, string> = {
  transport: 'Transport',
  accommodation: 'Accommodation',
  food: 'Food',
  lifestyle: 'Going out & bars',
  extras: 'Extras & misc',
};
