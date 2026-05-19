import { useCallback, useEffect, useMemo, useState } from 'react';
import type { ChecklistStepId } from '../data/checklist-steps';
import { CHECKLIST_STEP_IDS } from '../data/checklist-steps';

/** Bumped when step IDs/count change (invalidates incompatible localStorage). */
const STORAGE_KEY = 'islanddao-trip-checklist-v4';

export type ChecklistProgress = Partial<Record<ChecklistStepId, boolean>>;

function isCompletedRecord(raw: unknown): raw is Record<string, boolean> {
  if (!raw || typeof raw !== 'object') return false;
  return Object.values(raw).every((v) => typeof v === 'boolean');
}

/** Keys limited to canonical checklist IDs to ignore stale migrations. */
function sanitizeProgress(entries: Record<string, boolean>): ChecklistProgress {
  const filtered: ChecklistProgress = {};
  for (const id of CHECKLIST_STEP_IDS) {
    const value = entries[id];
    if (typeof value === 'boolean') {
      filtered[id] = value;
    }
  }
  return filtered;
}

export function getStoredChecklistProgress(): ChecklistProgress {
  if (typeof window === 'undefined') return {};
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (!stored) return {};
    const parsed: unknown = JSON.parse(stored);
    if (!isCompletedRecord(parsed)) return {};
    return sanitizeProgress(parsed);
  } catch {
    return {};
  }
}

export function persistChecklistProgress(progress: ChecklistProgress) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

export function useChecklistProgress() {
  const [completed, setCompleted] = useState<ChecklistProgress>(() =>
    getStoredChecklistProgress(),
  );

  useEffect(() => {
    persistChecklistProgress(completed);
  }, [completed]);

  const toggle = useCallback((stepId: ChecklistStepId) => {
    setCompleted((curr) => {
      const prev = !!curr[stepId];
      return { ...curr, [stepId]: !prev };
    });
  }, []);

  const toggleStep = toggle;

  const clearAll = useCallback(() => {
    setCompleted({});
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  const clearProgress = clearAll;

  const completedCount = useMemo(
    () => CHECKLIST_STEP_IDS.filter((stepId) => completed[stepId]).length,
    [completed],
  );

  const totalSteps = CHECKLIST_STEP_IDS.length;

  const fraction = totalSteps > 0 ? completedCount / totalSteps : 0;

  const progressLabel = useMemo(
    () => `${completedCount}/${totalSteps}`,
    [completedCount, totalSteps],
  );

  const isComplete = useCallback(
    (id: ChecklistStepId) => !!completed[id],
    [completed],
  );

  return {
    completed,
    toggle,
    toggleStep,
    clearAll,
    clearProgress,
    completedCount,
    totalSteps,
    fraction,
    progressLabel,
    isComplete,
  };
}
