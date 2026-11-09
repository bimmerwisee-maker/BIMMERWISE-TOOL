"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { AppShell } from "../../components/AppShell";
import { SERVICE_TYPES } from "../../lib/types";

export default function BookPage() {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setError("");
    const form = new FormData(event.currentTarget);
    const payload = Object.fromEntries(form.entries());

    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) {
        setError("Could not create booking. Check the required fields.");
        return;
      }
      const email = encodeURIComponent(String(payload.customer_email ?? ""));
      router.push(
        `/track?code=${encodeURIComponent(data.booking.code)}&email=${email}`,
      );
    } catch {
      setError("Network error. Try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <AppShell active="book">
      <section className="hero">
        <h1>Book service</h1>
        <p>Tell us about the vehicle and when you want to come in.</p>
      </section>

      <form className="panel form-grid" onSubmit={onSubmit}>
        <div className="form-grid two">
          <label>
            Your name
            <input name="customer_name" required maxLength={120} placeholder="Alex Rivera" />
          </label>
          <label>
            Phone
            <input name="customer_phone" maxLength={40} placeholder="+1 555 0100" />
          </label>
        </div>
        <label>
          Email
          <input
            name="customer_email"
            type="email"
            required
            maxLength={120}
            placeholder="you@email.com"
          />
        </label>
        <div className="form-grid two">
          <label>
            Year
            <input name="vehicle_year" maxLength={8} placeholder="2019" />
          </label>
          <label>
            Make
            <input name="vehicle_make" required maxLength={80} placeholder="BMW" />
          </label>
        </div>
        <div className="form-grid two">
          <label>
            Model
            <input name="vehicle_model" required maxLength={80} placeholder="330i" />
          </label>
          <label>
            Plate
            <input name="vehicle_plate" maxLength={20} placeholder="ABC-1234" />
          </label>
        </div>
        <div className="form-grid two">
          <label>
            Service
            <select name="service_type" required defaultValue="Diagnostic">
              {SERVICE_TYPES.map((service) => (
                <option key={service} value={service}>
                  {service}
                </option>
              ))}
            </select>
          </label>
          <label>
            Preferred date
            <input name="scheduled_at" type="datetime-local" />
          </label>
        </div>
        <label>
          What&apos;s going on?
          <textarea
            name="customer_notes"
            maxLength={1000}
            placeholder="Noise when turning, warning light, recent work…"
          />
        </label>
        {error ? <p className="error">{error}</p> : null}
        <div className="btn-row">
          <button className="btn" type="submit" disabled={busy}>
            {busy ? "Booking…" : "Confirm booking"}
          </button>
        </div>
      </form>
    </AppShell>
  );
}
