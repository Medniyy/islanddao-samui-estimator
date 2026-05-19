import type { ReactNode } from 'react';
import { CHECKLIST_STEPS, type ChecklistStepId } from '../data/checklist-steps';
import { useChecklistProgress } from '../hooks/useChecklistProgress';
import {
  BookFlights,
  BookStays,
  GlobalDisclaimer,
  InsuranceNote,
  LocalApps,
  ProhibitedItems,
  RegisterStep,
  TdacStep,
  VisaChecker,
} from './checklist';

type Props = {
  children?: ReactNode;
};

function StepBody({ id, budgetSlot }: { id: ChecklistStepId; budgetSlot?: ReactNode }) {
  switch (id) {
    case 'register':
      return <RegisterStep />;
    case 'visa':
      return <VisaChecker />;
    case 'pack':
      return <ProhibitedItems />;
    case 'budget':
      return budgetSlot ? <div className="checklist-budget-slot">{budgetSlot}</div> : null;
    case 'stays':
      return <BookStays />;
    case 'flights':
      return <BookFlights />;
    case 'tdac':
      return <TdacStep />;
    case 'insurance':
      return <InsuranceNote />;
    case 'apps':
      return <LocalApps />;
    default:
      return null;
  }
}

export function TripChecklist({ children }: Props) {
  const {
    completedCount,
    totalSteps,
    fraction,
    progressLabel,
    isComplete,
    toggleStep,
    clearProgress,
  } = useChecklistProgress();

  return (
    <section className="ps1-checklist-wrap" aria-labelledby="trip-checklist-title">
      <header className="ps1-hero ps1-hero--checklist">
        <h1 id="trip-checklist-title" className="ps1-title">
          IslandDAO Samui prep
        </h1>
        <p className="ps1-sub">
          Your personal checklist + budget planner · 3–28 June 2026
        </p>
      </header>

      <GlobalDisclaimer />

      <div className="ps1-card ps1-checklist">
        <p className="ps1-checklist__intro">
          Tick steps as you go — for <strong>your own tracking</strong>. Progress is saved in this
          browser only (<code className="ps1-checklist__code">localStorage</code>).
        </p>

        <div
          className="ps1-progress"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={totalSteps}
          aria-valuenow={completedCount}
          aria-label="Checklist progress"
        >
          <div className="ps1-progress__bar" style={{ width: `${Math.round(fraction * 100)}%` }} />
        </div>
        <p className="ps1-checklist__count" aria-live="polite">
          {progressLabel} complete
        </p>

        <button type="button" className="ps1-btn ps1-btn--small" onClick={clearProgress}>
          Clear progress
        </button>

        <div className="ps1-checklist-sections" role="list">
          {CHECKLIST_STEPS.map((step) => (
            <div
              key={step.id}
              className="ps1-accordion__row"
              data-complete={isComplete(step.id) ? 'true' : 'false'}
              role="listitem"
            >
              <label
                className="ps1-checklist-done ps1-checklist-done--row"
                onClick={(e) => e.stopPropagation()}
              >
                <input
                  type="checkbox"
                  className="ps1-checklist-done__input"
                  checked={isComplete(step.id)}
                  onChange={() => toggleStep(step.id)}
                  aria-label={`Mark "${step.title}" as done`}
                />
                <span className="ps1-checklist-done__label">Done</span>
              </label>

              <details className="ps1-accordion__section" open={step.id === 'register'}>
                <summary className="ps1-accordion__summary">
                  <span className="ps1-accordion__summary-text">
                    <span className="ps1-accordion__title">{step.title}</span>
                    <span className="ps1-accordion__subtitle">{step.summary}</span>
                  </span>
                </summary>

                <div className="ps1-accordion__panel">
                  <StepBody id={step.id} budgetSlot={children} />
                </div>
              </details>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
