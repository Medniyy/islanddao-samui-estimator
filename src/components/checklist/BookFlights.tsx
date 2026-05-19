export function BookFlights() {
  return (
    <div className="ps1-link-grid">
      <div>
        <p className="ps1-link-grid__group-label">Compare flights</p>
        <div className="ps1-link-grid__buttons">
          <a
            className="ps1-btn ps1-btn--primary"
            href="https://www.google.com/travel/flights"
            target="_blank"
            rel="noopener noreferrer"
          >
            Google Flights
          </a>
          <a className="ps1-btn ps1-btn--coral" href="https://www.skyscanner.net/" target="_blank" rel="noopener noreferrer">
            Skyscanner
          </a>
          <a className="ps1-btn ps1-btn--fun" href="https://www.kiwi.com/" target="_blank" rel="noopener noreferrer">
            Kiwi.com
          </a>
          <a
            className="ps1-btn ps1-btn--primary"
            href="https://www.booking.com/flights.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            Booking · Flights
          </a>
        </div>
      </div>
    </div>
  );
}
