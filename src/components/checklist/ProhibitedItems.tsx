import prohibitedData from '../../data/prohibited-items.json';

interface ProhibitedPayload {
  lastUpdated: string;
  sources: string[];
  intro: string;
  vapeWarning: string;
  carryOn: string[];
  checkedAndCustoms: string[];
  customsUrl: string;
  customsLinkLabel: string;
  prohibited: string[];
  restricted: string[];
}

const data = prohibitedData as ProhibitedPayload;

export function ProhibitedItems() {
  return (
    <div className="ps1-stack">
      <p className="ps1-hint" style={{ marginTop: 0 }}>
        {data.intro}{' '}
        <span className="ps1-fine">Reference updated {data.lastUpdated}.</span>
      </p>

      <div className="ps1-vape-warning" role="note">
        <strong>Vapes &amp; e-cigarettes — extreme caution</strong> {data.vapeWarning}
      </div>

      <div className="ps1-prohibited-block">
        <h3 className="ps1-prohibited-block__title">Cabin &amp; aviation security cues</h3>
        <ul className="ps1-prohibited-list">
          {data.carryOn.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>

      <div className="ps1-prohibited-block">
        <h3 className="ps1-prohibited-block__title">Customs-listed prohibitions</h3>
        <ul className="ps1-prohibited-list">
          {data.prohibited.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>

      <div className="ps1-prohibited-block">
        <h3 className="ps1-prohibited-block__title">Restricted / declare workflows</h3>
        <ul className="ps1-prohibited-list">
          {data.restricted.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>

      <div className="ps1-prohibited-block">
        <h3 className="ps1-prohibited-block__title">Illustrative high-risk combos</h3>
        <ul className="ps1-prohibited-list">
          {data.checkedAndCustoms.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>

      <p className="ps1-fine" style={{ marginBottom: 0 }}>
        <a href={data.customsUrl} target="_blank" rel="noopener noreferrer">
          {data.customsLinkLabel}
        </a>
        {' — supplemental PDFs:'}
        <span>
          {' '}
          {data.sources
            .filter((url) => url !== data.customsUrl)
            .map((url) => (
              <span key={url}>
                {' '}
                <a href={url} target="_blank" rel="noopener noreferrer">
                  Guidance PDF
                </a>
              </span>
            ))}
        </span>
        . Airlines may exceed customs minimums — read carrier-specific notices too.
      </p>
    </div>
  );
}
