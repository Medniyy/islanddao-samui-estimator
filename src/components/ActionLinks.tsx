export function ActionLinks() {
  return (
    <nav className="ps1-action-bar" aria-label="Quick links">
      <div className="ps1-action-bar__actions">
        <a
          className="ps1-btn ps1-btn--primary"
          href="https://nomadz.xyz/stays"
          target="_blank"
          rel="noopener noreferrer"
        >
          Nomadz · Stays
        </a>
        <a
          className="ps1-btn ps1-btn--coral"
          href="https://v4.islanddao.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          IslandDAO V4
        </a>
        <a
          className="ps1-btn ps1-btn--fun"
          href="https://x.com/islanddao"
          target="_blank"
          rel="noopener noreferrer"
        >
          IslandDAO on X ✦
        </a>
      </div>
    </nav>
  );
}
