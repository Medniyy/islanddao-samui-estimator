import type { BangkokRoute, DurationUnit, ExpenseToggles, TierId } from '../lib/types';
import { getCurrencies, getPrices, isThailandOrigin } from '../lib/calculateTrip';
import type { CalculatorInput } from '../lib/types';
import { SpendToggles } from './SpendToggles';

export interface FormState {
  originId: string;
  customFlightMid: string;
  durationValue: number;
  durationUnit: DurationUnit;
  tier: TierId;
  bangkokRoute: BangkokRoute;
  enabled: ExpenseToggles;
  standOutOnline: boolean;
  budgetUsd: string;
  currencyCode: string;
}

interface Props {
  state: FormState;
  onChange: (patch: Partial<FormState>) => void;
}

const DURATION_PRESETS = [
  { days: 7, label: '7d' },
  { days: 14, label: '14d' },
  { days: 30, label: '30d' },
];

export const defaultEnabled: ExpenseToggles = {
  internationalFlights: true,
  bangkokSamui: true,
  accommodation: true,
  food: true,
  nightlife: false,
  motorbike: false,
  extras: true,
};

export function formStateToInput(state: FormState): CalculatorInput {
  const inThailand = isThailandOrigin(state.originId);
  const enabled = { ...state.enabled };
  if (inThailand) {
    enabled.internationalFlights = false;
  }

  return {
    originId: state.originId,
    customFlightMid:
      state.originId === 'other' ? parseFloat(state.customFlightMid) || 0 : undefined,
    durationValue: state.durationValue,
    durationUnit: state.durationUnit,
    tier: state.tier,
    bangkokRoute: state.bangkokRoute,
    enabled,
    budgetUsd: state.budgetUsd ? parseFloat(state.budgetUsd) : undefined,
    currencyCode: state.currencyCode,
  };
}

export function CalculatorForm({ state, onChange }: Props) {
  const prices = getPrices();
  const currencies = getCurrencies();

  const applyPresetDays = (days: number) => {
    onChange({ durationValue: days, durationUnit: 'days' });
  };

  const handleOriginChange = (originId: string) => {
    const patch: Partial<FormState> = { originId };
    if (isThailandOrigin(originId)) {
      patch.enabled = { ...state.enabled, internationalFlights: false };
    }
    onChange(patch);
  };

  return (
    <section className="ps1-card">
      <h2 className="ps1-card__label">Your trip</h2>

      <label className="ps1-field">
        <span className="ps1-label">Flying from</span>
        <select
          className="ps1-select"
          value={state.originId}
          onChange={(e) => handleOriginChange(e.target.value)}
        >
          {prices.origins.map((o) => (
            <option key={o.id} value={o.id}>
              {o.label}
            </option>
          ))}
          <option value="other">Other country (enter price)</option>
        </select>
      </label>

      {state.originId === 'other' && (
        <label className="ps1-field">
          <span className="ps1-label">Round-trip to Bangkok (USD)</span>
          <input
            className="ps1-input"
            type="number"
            min={0}
            step={10}
            placeholder="e.g. 800"
            value={state.customFlightMid}
            onChange={(e) => onChange({ customFlightMid: e.target.value })}
          />
        </label>
      )}

      <div className="ps1-field">
        <span className="ps1-label">Duration</span>
        <div className="ps1-row">
          <input
            className="ps1-input ps1-input--short"
            type="number"
            min={1}
            value={state.durationValue}
            onChange={(e) =>
              onChange({ durationValue: Math.max(1, parseInt(e.target.value, 10) || 1) })
            }
          />
          <select
            className="ps1-select"
            value={state.durationUnit}
            onChange={(e) => onChange({ durationUnit: e.target.value as DurationUnit })}
          >
            <option value="days">days</option>
            <option value="weeks">weeks</option>
            <option value="months">months</option>
          </select>
        </div>
        <div className="ps1-chip-row">
          {DURATION_PRESETS.map((p) => (
            <button
              key={p.days}
              type="button"
              className={`ps1-chip ${state.durationValue === p.days && state.durationUnit === 'days' ? 'active' : ''}`}
              onClick={() => applyPresetDays(p.days)}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      <div className="ps1-field">
        <span className="ps1-label">Lifestyle tier</span>
        <div className="ps1-chip-row">
          {(['budget', 'mid', 'premium'] as TierId[]).map((t) => (
            <button
              key={t}
              type="button"
              className={`ps1-chip ${state.tier === t ? 'active' : ''}`}
              onClick={() => onChange({ tier: t })}
            >
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="ps1-field">
        <span className="ps1-label">Bangkok → Koh Samui</span>
        <div className="ps1-chip-row">
          <button
            type="button"
            className={`ps1-chip ${state.bangkokRoute === 'flight' ? 'active' : ''}`}
            onClick={() => onChange({ bangkokRoute: 'flight' })}
          >
            Flight
          </button>
          <button
            type="button"
            className={`ps1-chip ${state.bangkokRoute === 'budgetRoute' ? 'active' : ''}`}
            onClick={() => onChange({ bangkokRoute: 'budgetRoute' })}
          >
            Bus + ferry
          </button>
        </div>
      </div>

      <SpendToggles
        enabled={state.enabled}
        standOutOnline={state.standOutOnline}
        originId={state.originId}
        onEnabledChange={(enabled) => onChange({ enabled })}
        onStandOutOnlineChange={(standOutOnline) => onChange({ standOutOnline })}
      />

      <label className="ps1-field">
        <span className="ps1-label">Currency</span>
        <select
          className="ps1-select"
          value={state.currencyCode}
          onChange={(e) => onChange({ currencyCode: e.target.value })}
        >
          {currencies.map((c) => (
            <option key={c.code} value={c.code}>
              {c.code} — {c.label}
            </option>
          ))}
        </select>
      </label>

      <label className="ps1-field">
        <span className="ps1-label">My total budget (USD, optional)</span>
        <input
          className="ps1-input"
          type="number"
          min={0}
          step={100}
          placeholder="e.g. 500"
          value={state.budgetUsd}
          onChange={(e) => onChange({ budgetUsd: e.target.value })}
        />
        <span className="ps1-hint">Compared to the high end of your selected items</span>
      </label>
    </section>
  );
}
