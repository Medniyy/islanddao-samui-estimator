export const CHECKLIST_STEP_IDS = [
  'register',
  'visa',
  'pack',
  'budget',
  'stays',
  'flights',
  'tdac',
  'insurance',
  'apps',
] as const;

export type ChecklistStepId = (typeof CHECKLIST_STEP_IDS)[number];

export interface ChecklistStep {
  id: ChecklistStepId;
  title: string;
  summary: string;
}

export const CHECKLIST_STEPS: ChecklistStep[] = [
  {
    id: 'register',
    title: 'Register for IslandDAO V4',
    summary: 'Required — capacity is limited',
  },
  {
    id: 'visa',
    title: 'Check visa & passport',
    summary: 'Eligibility & policy changes',
  },
  {
    id: 'pack',
    title: 'Know before you pack',
    summary: 'Vapes illegal + customs rules',
  },
  {
    id: 'budget',
    title: 'Plan your budget',
    summary: 'Live trip cost estimate',
  },
  {
    id: 'stays',
    title: 'Book accommodation',
    summary: 'Crypto or traditional sites',
  },
  {
    id: 'flights',
    title: 'Book flights',
    summary: 'International + Bangkok ↔ Samui',
  },
  {
    id: 'tdac',
    title: 'Submit TDAC',
    summary: 'Arrival card ≥72h before landing',
  },
  {
    id: 'insurance',
    title: 'Travel insurance',
    summary: 'Compare & buy coverage',
  },
  {
    id: 'apps',
    title: 'Local apps & eSIM',
    summary: 'Grab, Bolt, connectivity',
  },
];
