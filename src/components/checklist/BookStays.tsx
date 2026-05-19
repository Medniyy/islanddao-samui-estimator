export function BookStays() {
  return (
    <div className="ps1-link-grid">
      <div>
        <p className="ps1-link-grid__group-label">With crypto</p>
        <div className="ps1-link-grid__buttons">
          <a
            className="ps1-btn ps1-btn--primary"
            href="https://nomadz.xyz/stays"
            target="_blank"
            rel="noopener noreferrer"
          >
            Nomadz · Stays
          </a>
        </div>
      </div>
      <div>
        <p className="ps1-link-grid__group-label">Traditional booking</p>
        <div className="ps1-link-grid__buttons">
          <a className="ps1-btn ps1-btn--coral" href="https://www.booking.com/" target="_blank" rel="noopener noreferrer">
            Booking.com
          </a>
          <a className="ps1-btn ps1-btn--fun" href="https://www.agoda.com/" target="_blank" rel="noopener noreferrer">
            Agoda
          </a>
          <a className="ps1-btn ps1-btn--primary" href="https://www.airbnb.com/" target="_blank" rel="noopener noreferrer">
            Airbnb
          </a>
        </div>
      </div>
    </div>
  );
}
