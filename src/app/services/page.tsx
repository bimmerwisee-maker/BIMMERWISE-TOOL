import { AppShell } from "../../components/AppShell";
import { SERVICES } from "../../lib/content";

export default function ServicesPage() {
  return (
    <AppShell active="services">
      <section className="hero">
        <p className="eyebrow">Workshop</p>
        <h1>Our services</h1>
        <p>
          Specialist BMW & MINI work from Bimmerwise in Lusk — servicing, EV,
          transmission, coding, and recovery.
        </p>
      </section>

      <div className="content-grid section-gap">
        {SERVICES.map((service) => (
          <a
            key={service.title}
            className="content-card"
            href={service.href}
            target="_blank"
            rel="noreferrer"
          >
            <strong>{service.title}</strong>
            <span>{service.blurb}</span>
            <em>View on website ↗</em>
          </a>
        ))}
      </div>

      <div className="home-actions section-gap">
        <a href="/book" className="home-action">
          <span>
            <strong>Book this work</strong>
            <span>Send a booking request to the bay</span>
          </span>
          <em>→</em>
        </a>
      </div>
    </AppShell>
  );
}
