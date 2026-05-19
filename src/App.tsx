import { useMemo, useState } from 'react';
import { ActionLinks } from './components/ActionLinks';
import { ThemeToggle } from './components/ThemeToggle';
import {
  CalculatorForm,
  defaultEnabled,
  formStateToInput,
  type FormState,
} from './components/CalculatorForm';
import { Methodology } from './components/Methodology';
import { ResultsBreakdown } from './components/ResultsBreakdown';
import { SiteFooter } from './components/SiteFooter';
import { calculateTrip } from './lib/calculateTrip';

const defaultState: FormState = {
  originId: 'vn',
  customFlightMid: '',
  durationValue: 7,
  durationUnit: 'days',
  tier: 'budget',
  bangkokRoute: 'flight',
  enabled: { ...defaultEnabled },
  standOutOnline: false,
  budgetUsd: '',
  currencyCode: 'USD',
};

function App() {
  const [form, setForm] = useState<FormState>(defaultState);

  const result = useMemo(() => calculateTrip(formStateToInput(form)), [form]);

  const patch = (p: Partial<FormState>) => setForm((s) => ({ ...s, ...p }));

  return (
    <>
      <ThemeToggle />
      <ActionLinks />
      <main className="ps1-shell ps1-stack">
        <header className="ps1-hero">
          <h1 className="ps1-title">Can you afford Samui?</h1>
          <p className="ps1-sub">
            IslandDAO Thailand · 3–28 June 2026 · Koh Samui cost planner
          </p>
        </header>

        <CalculatorForm state={form} onChange={patch} />
        <ResultsBreakdown result={result} currencyCode={form.currencyCode} />
        <Methodology />

        <SiteFooter />
      </main>
    </>
  );
}

export default App;
