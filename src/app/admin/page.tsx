"use client";

import { FormEvent, useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { AppShell } from "../../components/AppShell";
import { StatusBadge } from "../../components/StatusBadge";
import type { Booking, BookingStatus } from "../../lib/types";

type Session = { admin: boolean; passwordFallback: boolean };

export default function AdminPage() {
  const [session, setSession] = useState<Session | null>(null);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [busy, setBusy] = useState(false);

  const refresh = useCallback(async () => {
    const sessionRes = await fetch("/api/admin/session");
    const sessionJson = (await sessionRes.json()) as Session;
    setSession(sessionJson);
    if (!sessionJson.admin) {
      setBookings([]);
      return;
    }
    const listRes = await fetch("/api/bookings");
    if (!listRes.ok) return;
    const listJson = await listRes.json();
    setBookings(listJson.bookings ?? []);
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  async function onLogin(event: FormEvent) {
    event.preventDefault();
    setBusy(true);
    setError("");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) {
        setError("Wrong password.");
        return;
      }
      setPassword("");
      await refresh();
    } catch {
      setError("Login failed.");
    } finally {
      setBusy(false);
    }
  }

  async function onLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    await refresh();
  }

  return (
    <AppShell active="admin">
      <section className="hero">
        <h1>Shop console</h1>
        <p>Post customer updates and upload photos of findings on each vehicle.</p>
      </section>

      {!session?.admin ? (
        <form className="panel form-grid" onSubmit={onLogin}>
          {session?.passwordFallback ? (
            <div className="sample-banner">
              Sample mode: set the <code>BOOKING_ADMIN_PASSWORD</code> secret for production.
              Local demo password is <code>bimmerwise-demo</code>.
            </div>
          ) : null}
          <label>
            Admin password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
          </label>
          {error ? <p className="error">{error}</p> : null}
          <div className="btn-row">
            <button className="btn" type="submit" disabled={busy}>
              {busy ? "Signing in…" : "Open console"}
            </button>
          </div>
          <p className="muted" style={{ margin: 0, fontSize: "0.86rem" }}>
            Cursor team admins are also admitted automatically when the app is published for the team.
          </p>
        </form>
      ) : (
        <>
          <div className="btn-row" style={{ marginBottom: "0.75rem" }}>
            <button className="btn secondary" type="button" onClick={() => void refresh()}>
              Refresh
            </button>
            <button className="btn ghost" type="button" onClick={() => void onLogout()}>
              Sign out
            </button>
          </div>

          <div className="panel">
            <h2>Bookings</h2>
            {bookings.length === 0 ? (
              <p className="muted">No bookings yet. Customers can create one from Book.</p>
            ) : (
              <div className="booking-list">
                {bookings.map((booking) => (
                  <Link
                    key={booking.id}
                    href={`/admin/bookings/${booking.id}`}
                    className="booking-row"
                  >
                    <div className="btn-row" style={{ justifyContent: "space-between" }}>
                      <strong>
                        {booking.vehicle_year} {booking.vehicle_make} {booking.vehicle_model}
                      </strong>
                      <StatusBadge status={booking.status as BookingStatus} />
                    </div>
                    <div className="meta">
                      <span className="code-chip">{booking.code}</span>
                      <span>{booking.customer_name}</span>
                      <span>{booking.service_type}</span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </AppShell>
  );
}
