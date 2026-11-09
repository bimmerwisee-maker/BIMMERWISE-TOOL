"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AppShell } from "../../components/AppShell";
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

export default function BookPage() {
  const router = useRouter();
  const [me, setMe] = useState<Me | null>(null);
  const [mode, setMode] = useState<"guest" | "account">("guest");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

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
    payload.as_guest = mode === "guest" ? "true" : "";

    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          ...payload,
          as_guest: mode === "guest",
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        if (data.error === "vin_too_short") {
          setError("VIN must include at least the last 7 characters.");
        } else {
          setError("Could not create booking. Check the required fields.");
        }
        return;
      }
      const email = encodeURIComponent(
        mode === "account" && me?.customer
          ? me.customer.email
          : String(payload.customer_email ?? ""),
      );
      router.push(
        `/track?code=${encodeURIComponent(data.booking.code)}&email=${email}`,
      );
    } catch {
      setError("Network error. Try again.");
    } finally {
      setBusy(false);
    }
  }

  const loggedIn = Boolean(me?.customer);

  return (
    <AppShell active="book">
      <section className="hero">
        <p className="eyebrow">Reserve a bay</p>
        <h1>Book service</h1>
        <p>Book as a guest, or use your profile vehicle with VIN and registration saved.</p>
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
            <div className="form-grid two">
              <label>
                Year
                <input name="vehicle_year" maxLength={8} placeholder="2019" />
              </label>
              <label>
                Make
                <input name="vehicle_make" maxLength={80} defaultValue="BMW" />
              </label>
            </div>
            <div className="form-grid two">
              <label>
                Model
                <input name="vehicle_model" required maxLength={80} placeholder="M340i" />
              </label>
              <label>
                Registration
                <input name="vehicle_plate" required maxLength={20} />
              </label>
            </div>
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
