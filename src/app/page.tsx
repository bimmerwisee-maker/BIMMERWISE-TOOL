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

  const load = useCallback(async () => {
    const res = await fetch("/api/auth/me");
    if (!res.ok) return;
    setMe(await res.json());
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const booking = me?.currentBooking;

  return (
    <AppShell active="home">
      <section className="hero center">
        <BrandLogo size="hero" href={null} />
        <p>
          {me?.customer
            ? `Welcome back, ${me.customer.name}.`
            : "Independent BMW & MINI service booking."}
        </p>
      </section>

      {booking ? (
        <ProgressBar
          percent={booking.progress_percent}
          label={booking.progress_label}
          vehicle={booking.vehicle}
        />
      ) : null}

      <div className="home-actions">
        <a href="/book">
          <span>
            <strong>Book service</strong>
            <span>Guest or saved vehicle</span>
          </span>
          <em>→</em>
        </a>
        {me?.customer ? (
          <a href="/profile">
            <span>
              <strong>My profile</strong>
              <span>Vehicles and photo</span>
            </span>
            <em>→</em>
          </a>
        ) : (
          <a href="/register">
            <span>
              <strong>Register</strong>
              <span>Email or Google</span>
            </span>
            <em>→</em>
          </a>
        )}
      </div>
    </AppShell>
  );
}
