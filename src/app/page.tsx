import { AppShell } from "../components/AppShell";

export default function HomePage() {
  return (
    <AppShell active="home">
      <section className="hero">
        <h1>BimmerWise</h1>
        <p>
          Book your visit, follow live shop updates, and see photos of what we
          find on your vehicle.
        </p>
      </section>

      <div className="action-stack">
        <a className="action-link" href="/book">
          <strong>Book service</strong>
          <span>Reserve a bay for diagnostics, maintenance, or repair.</span>
        </a>
        <a className="action-link" href="/track">
          <strong>Track my vehicle</strong>
          <span>Enter your booking code for status and photo updates.</span>
        </a>
        <a className="action-link" href="/admin">
          <strong>Shop console</strong>
          <span>Admins post updates and upload inspection photos.</span>
        </a>
      </div>
    </AppShell>
  );
}
