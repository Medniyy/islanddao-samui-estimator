interface Props {
  prominent?: boolean;
}

export function Disclaimer({ prominent }: Props) {
  if (prominent) {
    return (
      <aside className="ps1-disclaimer-banner" role="note">
        <p>
          <strong>All figures are estimates</strong> based on public averages — not live quotes.
          Real costs can differ. Toggle items above to match how you actually travel.
        </p>
      </aside>
    );
  }

  return (
    <p className="ps1-disclaimer">
      All figures are <strong>estimates</strong> based on public averages, not live quotes.
    </p>
  );
}
