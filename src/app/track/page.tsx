"use client";

import { FormEvent, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { AppShell } from "../../components/AppShell";
import { StatusBadge } from "../../components/StatusBadge";
import type { BookingStatus } from "../../lib/types";

type TrackPayload = {
  booking: {
    code: string;
    customer_name: string;
    vehicle: string;
    vehicle_plate: string;
    service_type: string;
    status: BookingStatus;
    status_label: string;
    scheduled_at: string | null;
    created_at: string;
  };
  updates: Array<{
    id: string;
    message: string;
    status: BookingStatus;
    status_label: string;
    created_at: string;
  }>;
  photos: Array<{
    id: string;
    caption: string;
    mime_type: string;
    data_url: string;
    created_at: string;
  }>;
};

function TrackInner() {
  const search = useSearchParams();
  const initialCode = search.get("code") ?? "";
  const [code, setCode] = useState(initialCode);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [data, setData] = useState<TrackPayload | null>(null);

  async function load(nextCode: string) {
    const trimmed = nextCode.trim();
    if (!trimmed) return;
    setBusy(true);
    setError("");
    try {
      const res = await fetch(`/api/track?code=${encodeURIComponent(trimmed)}`);
      const json = await res.json();
      if (!res.ok) {
        setData(null);
        setError("No booking found for that code.");
        return;
      }
      setData(json);
    } catch {
      setError("Could not load updates.");
    } finally {
      setBusy(false);
    }
  }

  useEffect(() => {
    if (initialCode) {
      void load(initialCode);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialCode]);

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    void load(code);
  }

  return (
    <>
      <section className="hero">
        <h1>Track my vehicle</h1>
        <p>Use the booking code from your confirmation to see live shop updates.</p>
      </section>

      <form className="panel form-grid" onSubmit={onSubmit}>
        <label>
          Booking code
          <input
            value={code}
            onChange={(e) => setCode(e.target.value.toUpperCase())}
            placeholder="BW-A1B2C3"
            maxLength={32}
            required
          />
        </label>
        {error ? <p className="error">{error}</p> : null}
        <div className="btn-row">
          <button className="btn" type="submit" disabled={busy}>
            {busy ? "Loading…" : "Show updates"}
          </button>
        </div>
      </form>

      {data ? (
        <div className="section-gap">
          <div className="panel">
            <div className="btn-row" style={{ justifyContent: "space-between" }}>
              <div>
                <div className="code-chip">{data.booking.code}</div>
                <h2 style={{ marginTop: "0.45rem" }}>{data.booking.vehicle}</h2>
                <p className="muted" style={{ margin: "0.25rem 0 0" }}>
                  {data.booking.customer_name}
                  {data.booking.vehicle_plate ? ` · ${data.booking.vehicle_plate}` : ""}
                  {" · "}
                  {data.booking.service_type}
                </p>
              </div>
              <StatusBadge status={data.booking.status} />
            </div>
          </div>

          <div className="panel section-gap">
            <h3>Updates</h3>
            <div className="timeline">
              {data.updates.map((update) => (
                <article key={update.id} className="timeline-item">
                  <time dateTime={update.created_at}>
                    {new Date(update.created_at).toLocaleString()} · {update.status_label}
                  </time>
                  <p style={{ margin: 0 }}>{update.message}</p>
                </article>
              ))}
            </div>
          </div>

          {data.photos.length > 0 ? (
            <div className="panel section-gap">
              <h3>Vehicle photos</h3>
              <div className="photo-grid">
                {data.photos.map((photo) => (
                  <figure key={photo.id} className="photo-card">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={photo.data_url} alt={photo.caption || "Vehicle photo"} />
                    <figcaption>{photo.caption || "Shop photo"}</figcaption>
                  </figure>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      ) : null}
    </>
  );
}

export default function TrackPage() {
  return (
    <AppShell active="track">
      <Suspense fallback={<p className="muted">Loading tracker…</p>}>
        <TrackInner />
      </Suspense>
    </AppShell>
  );
}
