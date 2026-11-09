"use client";

import { useCallback, useEffect, useState } from "react";
import { AppShell } from "../components/AppShell";
import { BrandLogo } from "../components/BrandLogo";
import { ProgressBar } from "../components/ProgressBar";

type MePayload = {
  customer: { name: string } | null;
  currentBooking: {
    vehicle: string;
    progress_percent: number;
    progress_label: string;
  } | null;
};

export default function HomePage() {
  const [me, setMe] = useState<MePayload | null>(null);
  const [entered, setEntered] = useState(false);

  const load = useCallback(async () => {
    const res = await fetch("/api/auth/me");
    if (!res.ok) return;
    setMe(await res.json());
  }, []);

  useEffect(() => {
    void load();
    const id = window.setTimeout(() => setEntered(true), 40);
    return () => window.clearTimeout(id);
  }, [load]);

  const booking = me?.currentBooking;

  return (
    <AppShell active="home">
      <div className={`home-stage ${entered ? "is-in" : ""}`}>
        <div className="home-m-glow" aria-hidden />
        <div className="home-m-bars" aria-hidden>
          <span />
          <span />
          <span />
        </div>

        <section className="hero center home-hero">
          <BrandLogo size="hero" href={null} />
          <p className="home-copy">
            {me?.customer
              ? `Welcome back, ${me.customer.name}.`
              : "Independent BMW & MINI service booking."}
          </p>
        </section>

        {booking ? (
          <div className="home-progress-wrap">
            <ProgressBar
              percent={booking.progress_percent}
              label={booking.progress_label}
              vehicle={booking.vehicle}
            />
          </div>
        ) : null}

        <div className="home-actions">
          <a href="/book" className="home-action">
            <span>
              <strong>Book service</strong>
              <span>Guest or saved vehicle</span>
            </span>
            <em>→</em>
          </a>
          {me?.customer ? (
            <a href="/profile" className="home-action">
              <span>
                <strong>My profile</strong>
                <span>Vehicles and fingerprint login</span>
              </span>
              <em>→</em>
            </a>
          ) : (
            <a href="/register" className="home-action">
              <span>
                <strong>Register</strong>
                <span>Email or Google</span>
              </span>
              <em>→</em>
            </a>
          )}
        </div>
      </div>
    </AppShell>
  );
}
