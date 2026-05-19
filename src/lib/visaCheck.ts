import visaRaw from '../data/visa-eligibility.json';

/** Origin IDs align with {@link SamuiPrices} `origins[].id` (`samui-prices.json`). */
export type SupportedVisaOriginId =
  | 'th'
  | 'vn'
  | 'us'
  | 'uk'
  | 'de'
  | 'fr'
  | 'nl'
  | 'se'
  | 'ae'
  | 'in'
  | 'cn'
  | 'jp'
  | 'kr'
  | 'hk'
  | 'sg'
  | 'my'
  | 'au'
  | 'nz'
  | 'ca'
  | 'br'
  | 'za';

export type VisaStayWindow = 30 | 60 | null;

export type VisaDisplayLevel = 'domestic' | 'exempt' | 'unknown' | 'verify';

export interface VisaAssessment {
  visaFree: boolean;
  stayDays: VisaStayWindow;
  note: string;
}

export interface VisaEligibilityDataset {
  lastUpdated: string;
  noteDisclaimer: string;
  origins: Record<string, VisaAssessment>;
}

export interface VisaDisplay {
  preliminaryHeadline: string;
  detail: string;
  showPreliminaryWarning: boolean;
  level: VisaDisplayLevel;
}

const dataset = visaRaw as VisaEligibilityDataset;

const VERIFY_SUFFIX =
  ' Rules change — confirm passport type, entry mode (air vs land), and stamp length before you book.';

/** Returns embassy-style guidance keyed off calculator origin selections. */
export function checkVisa(originId: string): VisaAssessment | null {
  const match = dataset.origins[originId];
  return match ?? null;
}

/** User-facing preliminary visa orientation (not legal advice). */
export function getVisaDisplay(originId: string): VisaDisplay {
  if (originId === 'other') {
    return {
      preliminaryHeadline: "We can't estimate — verify on official sources",
      detail:
        'Your passport is not in our preliminary list. Check Thai immigration and your embassy for visa exemption, e-visa, or visa-on-arrival rules.' +
        VERIFY_SUFFIX,
      showPreliminaryWarning: true,
      level: 'verify',
    };
  }

  if (originId === 'th') {
    return {
      preliminaryHeadline: 'No visa needed — already in Thailand',
      detail:
        (dataset.origins.th?.note ??
          'Residents / nationals already in Thailand — no inbound visa applies for domestic hops.') +
        VERIFY_SUFFIX,
      showPreliminaryWarning: false,
      level: 'domestic',
    };
  }

  const assessment = dataset.origins[originId];

  if (!assessment) {
    return {
      preliminaryHeadline: "We can't estimate — verify on official sources",
      detail:
        'No preliminary data for this selection. Check Thai immigration and your embassy before you travel.' +
        VERIFY_SUFFIX,
      showPreliminaryWarning: true,
      level: 'verify',
    };
  }

  if (!assessment.visaFree) {
    return {
      preliminaryHeadline: 'Preliminary: visa or permit likely required',
      detail: assessment.note + VERIFY_SUFFIX,
      showPreliminaryWarning: true,
      level: 'verify',
    };
  }

  let preliminaryHeadline: string;

  if (assessment.stayDays === 30) {
    preliminaryHeadline = 'Preliminary: visa-exempt tourist stay ~30 days';
  } else if (assessment.stayDays === 60) {
    preliminaryHeadline = 'Preliminary: visa-exempt tourist stay ~60 days';
  } else {
    preliminaryHeadline = 'Preliminary: likely visa-exempt — confirm permitted stay length';
  }

  return {
    preliminaryHeadline,
    detail: assessment.note + VERIFY_SUFFIX,
    showPreliminaryWarning: true,
    level: 'exempt',
  };
}

export function getVisaDatasetDisclaimer(): string {
  return dataset.noteDisclaimer;
}
