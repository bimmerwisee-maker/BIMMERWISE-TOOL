import { AppShell } from "../../components/AppShell";
import { ABOUT } from "../../lib/content";

export default function AboutPage() {
  return (
    <AppShell active="about">
      <section className="hero">
        <p className="eyebrow">{ABOUT.location}</p>
        <h1>{ABOUT.title}</h1>
        <p>{ABOUT.tagline}</p>
      </section>

      <div className="panel">
        {ABOUT.body.map((paragraph) => (
          <p key={paragraph.slice(0, 24)} className="content-copy">
            {paragraph}
          </p>
        ))}
      </div>

      <div className="panel section-gap">
        <h3>Contact</h3>
        <div className="content-list">
          <a href={`tel:${ABOUT.contact.phone.replace(/\s+/g, "")}`}>
            {ABOUT.contact.phone}
          </a>
          <a href={`mailto:${ABOUT.contact.email}`}>{ABOUT.contact.email}</a>
          <p className="muted">{ABOUT.contact.address}</p>
          <p className="muted">{ABOUT.contact.hours}</p>
          <a href={ABOUT.contact.website} target="_blank" rel="noreferrer">
            bimmerwise.com ↗
          </a>
        </div>
      </div>

      <div className="home-actions section-gap">
        <a href="/book" className="home-action">
          <span>
            <strong>Book a service</strong>
            <span>Reserve a bay at the workshop</span>
          </span>
          <em>→</em>
        </a>
      </div>

      <p className="staff-foot">
        <a href="/admin">Staff login</a>
      </p>
    </AppShell>
  );
}
