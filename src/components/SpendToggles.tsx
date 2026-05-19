import type { ExpenseToggleId, ExpenseToggles } from '../lib/types';
import { isThailandOrigin } from '../lib/calculateTrip';

const CALENDLY_URL = 'https://calendly.com/athcamera';

interface ToggleDef {
  id: ExpenseToggleId;
  label: string;
  hint?: string;
}

const TRIP_TOGGLES: ToggleDef[] = [
  { id: 'internationalFlights', label: 'Flights to Bangkok', hint: 'Round-trip from your country' },
  { id: 'bangkokSamui', label: 'Bangkok ↔ Samui', hint: 'Ferry or domestic flight' },
  { id: 'accommodation', label: 'Accommodation', hint: 'Hostel, room, or monthly rent style' },
  { id: 'food', label: 'Food & drinks', hint: 'Meals only — see per-day estimate below' },
  { id: 'nightlife', label: 'Going out / bars', hint: 'Optional — often the biggest surprise' },
  { id: 'motorbike', label: 'Motorbike rental', hint: 'Getting around the island' },
  { id: 'extras', label: 'SIM & misc', hint: 'Grab, laundry, ATM fees' },
];

interface Props {
  enabled: ExpenseToggles;
  standOutOnline: boolean;
  originId: string;
  onEnabledChange: (enabled: ExpenseToggles) => void;
  onStandOutOnlineChange: (value: boolean) => void;
}

function ToggleButton({
  label,
  hint,
  on,
  locked,
  onToggle,
}: {
  label: string;
  hint?: string;
  on: boolean;
  locked?: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      className={`ps1-toggle ${on ? 'ps1-toggle--on' : ''} ${locked ? 'ps1-toggle--locked' : ''}`}
      onClick={onToggle}
      disabled={locked}
      aria-pressed={on}
    >
      <span className="ps1-toggle__box" aria-hidden>
        {on ? '✓' : ''}
      </span>
      <span className="ps1-toggle__text">
        <span className="ps1-toggle__label">{label}</span>
        {hint && <span className="ps1-toggle__hint">{hint}</span>}
      </span>
    </button>
  );
}

export function SpendToggles({
  enabled,
  standOutOnline,
  originId,
  onEnabledChange,
  onStandOutOnlineChange,
}: Props) {
  const inThailand = isThailandOrigin(originId);

  const toggle = (id: ExpenseToggleId) => {
    if (id === 'internationalFlights' && inThailand) return;
    onEnabledChange({ ...enabled, [id]: !enabled[id] });
  };

  return (
    <div className="ps1-field">
      <span className="ps1-label">Include in your estimate</span>
      <p className="ps1-hint">Tap to add or remove — build your own trip</p>
      <div className="ps1-toggle-grid">
        {TRIP_TOGGLES.map((t) => {
          const locked = t.id === 'internationalFlights' && inThailand;
          const on = locked ? false : enabled[t.id];
          return (
            <ToggleButton
              key={t.id}
              label={t.label}
              hint={t.hint}
              on={on}
              locked={locked}
              onToggle={() => toggle(t.id)}
            />
          );
        })}
        <ToggleButton
          label="Stand out online"
          hint="Collab with ATH"
          on={standOutOnline}
          onToggle={() => onStandOutOnlineChange(!standOutOnline)}
        />
        {standOutOnline && (
          <a
            className="ps1-toggle ps1-toggle--cta"
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="ps1-toggle__text">
              <span className="ps1-toggle__label">Start the conversation</span>
              <span className="ps1-toggle__hint">
                Tell us what you&apos;re building. We&apos;ll see how ATH can help.
              </span>
            </span>
          </a>
        )}
      </div>
      {inThailand && (
        <p className="ps1-hint">Already in Thailand — only Bangkok ↔ Samui transport applies.</p>
      )}
    </div>
  );
}
