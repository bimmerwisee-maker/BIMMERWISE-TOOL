"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { AppShell } from "../../components/AppShell";
import { ModelPicker } from "../../components/ModelPicker";
import { SERVICE_TYPES } from "../../lib/types";

type Vehicle = {
  id: string;
  vin_last7: string;
  registration: string;
  year: string;
  make: string;
  model: string;
};

type Me = {
  customer: { name: string; email: string; phone: string } | null;
  vehicles: Vehicle[];
};

function todayDateValue(): string {
  const d = new Date();
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

export default function BookPage() {
  const router = useRouter();
  const [me, setMe] = useState<Me | null>(null);
  const [mode, setMode] = useState<"guest" | "account">("guest");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [doneCode, setDoneCode] = useState("");
  const [preferredDate, setPreferredDate] = useState("");
  const [preferredTime, setPreferredTime] = useState("09:00");
  const minDate = useMemo(() => todayDateValue(), []);

  useEffect(() => {
    void (async () => {
      const res = await fetch("/api/auth/me");
      if (!res.ok) return;
      const data = await res.json();
      setMe(data);
      if (data.customer) setMode("account");
    })();
  }, []);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setError("");
    const form = new FormData(event.currentTarget);
    const payload: Record<string, string> = Object.fromEntries(
      [...form.entries()].map(([k, v]) => [k, String(v)]),
    );

    let scheduled_at = "";
    if (preferredDate) {
      const time = preferredTime || "09:00";
      const local = new Date(`${preferredDate}T${time}:00`);
      if (Number.isNaN(local.getTime())) {
        setError("Choose a valid date and time.");
        setBusy(false);
        return;
      }
      scheduled_at = local.toISOString();
    }

    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          ...payload,
          scheduled_at,
          as_guest: mode === "guest",
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        if (data.error === "vin_too_short") {
          setError("VIN must include at least the last 7 characters.");
        } else if (data.error === "invalid_schedule") {
          setError("Choose a valid preferred date and time.");
        } else {
          setError("Could not create booking. Check the required fields.");
        }
        return;
      }
      setDoneCode(data.booking.code);
      if (mode === "account") {
        router.push("/");
      }
    } catch {
      setError("Network error. Try again.");
    } finally {
      setBusy(false);
    }
  }

  const loggedIn = Boolean(me?.customer);

  if (doneCode) {
    return (
      <AppShell active="book">
        <section className="hero">
          <p className="eyebrow">Booked</p>
          <h1>Request sent</h1>
          <p>We&apos;ll confirm your booking shortly. Your reference:</p>
        </section>
        <div className="panel">
          <div className="code-chip">{doneCode}</div>
          <div className="btn-row section-gap">
            <a className="btn" href="/">
              Back home
            </a>
            <a className="btn secondary" href="/book">
              Book another
            </a>
          </div>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell active="book">
      <section className="hero">
        <p className="eyebrow">Reserve a bay</p>
        <h1>Book service</h1>
        <p>Book as a guest, or with a vehicle saved on your profile.</p>
      </section>

      <div className="segmented section-gap">
        <button
          type="button"
          className={mode === "guest" ? "active" : undefined}
          onClick={() => setMode("guest")}
        >
          Guest
        </button>
        <button
          type="button"
          className={mode === "account" ? "active" : undefined}
          onClick={() => setMode("account")}
          disabled={!loggedIn}
        >
          My account
        </button>
      </div>
      {!loggedIn ? (
        <p className="muted" style={{ marginTop: "0.65rem", fontSize: "0.86rem" }}>
          Want saved vehicles? <a href="/register">Register with email or Google</a>.
        </p>
      ) : null}

      <form className="panel form-grid" onSubmit={onSubmit}>
        {mode === "guest" ? (
          <>
            <div className="form-grid two">
              <label>
                Your name
                <input name="customer_name" required maxLength={120} />
              </label>
              <label>
                Phone
                <input name="customer_phone" maxLength={40} />
              </label>
            </div>
            <label>
              Email
              <input name="customer_email" type="email" required maxLength={120} />
            </label>
            <ModelPicker
              yearName="vehicle_year"
              modelSlugName="model_slug"
              modelName="vehicle_model"
              makeName="vehicle_make"
            />
            <label>
              Registration
              <input name="vehicle_plate" required maxLength={20} />
            </label>
            <label>
              VIN (last 7 minimum)
              <input
                name="vin_last7"
                required
                minLength={7}
                maxLength={17}
                placeholder="Last 7 of VIN"
              />
            </label>
          </>
        ) : (
          <>
            <label>
              Saved vehicle
              <select name="vehicle_id" required defaultValue="">
                <option value="" disabled>
                  Select vehicle
                </option>
                {(me?.vehicles ?? []).map((v) => (
                  <option key={v.id} value={v.id}>
                    {v.year} {v.make} {v.model} · {v.registration} · VIN …{v.vin_last7}
                  </option>
                ))}
              </select>
            </label>
            {(me?.vehicles?.length ?? 0) === 0 ? (
              <p className="error">
                No vehicles yet. Add one in <a href="/profile">Profile</a>.
              </p>
            ) : null}
          </>
        )}

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

        <div className="date-time-row">
          <label>
            Preferred date
            <input
              type="date"
              name="preferred_date"
              min={minDate}
              value={preferredDate}
              onChange={(e) => setPreferredDate(e.target.value)}
            />
          </label>
          <label>
            Preferred time
            <input
              type="time"
              name="preferred_time"
              value={preferredTime}
              onChange={(e) => setPreferredTime(e.target.value)}
              disabled={!preferredDate}
            />
          </label>
        </div>

        <label>
          What&apos;s going on?
          <textarea name="customer_notes" maxLength={1000} />
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
