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

const ACTIONS = [
  {
    href: "/book",
    title: "Book service",
    subtitle: "Reserve a bay — guest or account",
  },
  {
    href: "/services",
    title: "Our services",
    subtitle: "Servicing, EV, gearbox, CarPlay & more",
  },
  {
    href: "/products",
    title: "Products",
    subtitle: "CarPlay, Android Auto, maps & cameras",
  },
  {
    href: "/about",
    title: "About us",
    subtitle: "Dublin BMW & MINI specialists in Lusk",
  },
] as const;

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
      <div className="home-stage">
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
              : "Dealership expertise. Independent care."}
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

        <div className="home-actions home-actions-grid">
          {ACTIONS.map((action) => (
            <a key={action.href} href={action.href} className="home-action">
              <span>
                <strong>{action.title}</strong>
                <span>{action.subtitle}</span>
              </span>
              <em>→</em>
            </a>
          ))}
          <a
            href={me?.customer ? "/profile" : "/register"}
            className="home-action"
          >
            <span>
              <strong>{me?.customer ? "My garage" : "Create account"}</strong>
              <span>
                {me?.customer
                  ? "Vehicles, profile & fingerprint login"
                  : "Save vehicles and track bay progress"}
              </span>
            </span>
            <em>→</em>
          </a>
        </div>
      </div>
    </AppShell>
  );
}
