"use client";

import { FormEvent, useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { AppShell } from "../../components/AppShell";
import { StatusBadge } from "../../components/StatusBadge";
import type { Booking, BookingStatus } from "../../lib/types";

type Session = { admin: boolean; passwordLoginAvailable: boolean };

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
      if (res.status === 503) {
        setError("Admin password is not configured for this deployment.");
        return;
      }
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
          {!session?.passwordLoginAvailable ? (
            <div className="sample-banner">
              Password login needs the app admin secret configured. Cursor team
              admins can open the console when the app is published for the team.
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
              disabled={!session?.passwordLoginAvailable}
            />
          </label>
          {error ? <p className="error">{error}</p> : null}
          <div className="btn-row">
            <button
              className="btn"
              type="submit"
              disabled={busy || !session?.passwordLoginAvailable}
            >
              {busy ? "Signing in…" : "Open console"}
            </button>
            <button className="btn secondary" type="button" onClick={() => void refresh()}>
              Check team access
            </button>
          </div>
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
