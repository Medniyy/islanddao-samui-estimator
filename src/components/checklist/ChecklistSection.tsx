import { useId, type ReactNode } from 'react';

export interface ChecklistSectionProps {
  title: ReactNode;
  expanded: boolean;
  onToggleExpand: () => void;
  done: boolean;
  onToggleDone: () => void;
  children: ReactNode;
}

export function ChecklistSection({
  title,
  expanded,
  onToggleExpand,
  done,
  onToggleDone,
  children,
}: ChecklistSectionProps) {
  const uid = useId();
  const headingId = `${uid}-heading`;
  const panelId = `${uid}-panel`;

  return (
    <section
      className={`ps1-checklist-section ${done ? 'ps1-checklist-section--done' : ''}`}
      aria-labelledby={headingId}
    >
      <div className="ps1-checklist-section__header">
        <button
          type="button"
          className="ps1-checklist-section__toggle"
          aria-expanded={expanded}
          aria-controls={panelId}
          id={headingId}
          onClick={onToggleExpand}
        >
          <span
            className={`ps1-checklist-section__expand-icon ${expanded ? 'ps1-checklist-section__expand-icon--open' : ''}`}
            aria-hidden
          >
            ▸
          </span>
          <span className="ps1-checklist-section__title-wrap">
            <span className="ps1-checklist-section__title">{title}</span>
          </span>
        </button>
        <label className="ps1-checklist-section__done">
          <input
            type="checkbox"
            className="ps1-checklist-section__done-input"
            checked={done}
            onChange={() => onToggleDone()}
            aria-label="Mark step done"
          />
          <span className="ps1-checklist-section__done-label">Done</span>
        </label>
      </div>
      <div className="ps1-checklist-section__body" id={panelId} role="region" hidden={!expanded}>
        {children}
      </div>
    </section>
  );
}
