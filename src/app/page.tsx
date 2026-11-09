"use client";

import { useCallback, useEffect, useState } from "react";
import { AppShell } from "../components/AppShell";
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
      <section className="hero">
        <p className="eyebrow">Service bay</p>
        <h1>BimmerWise</h1>
        <p>
          {me?.customer
            ? `Welcome back, ${me.customer.name}. Track your bay progress or book the next visit.`
            : "Book as a guest or register to save your vehicles and follow live job progress."}
        </p>
      </section>

      {booking ? (
        <ProgressBar
          percent={booking.progress_percent}
          label={booking.progress_label}
          vehicle={booking.vehicle}
        />
      ) : null}

      <div className="action-stack">
        <a className="action-link" href="/book">
          <strong>Book service</strong>
          <span>Guest checkout or book with a saved vehicle.</span>
        </a>
        <a className="action-link" href="/profile">
          <strong>My profile</strong>
          <span>Register, add vehicles (VIN last 7), upload a photo.</span>
        </a>
        <a className="action-link" href="/track">
          <strong>Track with code</strong>
          <span>Look up a booking with code + email.</span>
        </a>
      </div>
    </AppShell>
  );
}
