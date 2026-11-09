"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AppShell } from "../components/AppShell";
import { ProgressBar } from "../components/ProgressBar";

type GarageCar = {
  id: string;
  year: string;
  make: string;
  model: string;
  registration: string;
  image_url?: string;
};

type MePayload = {
  customer: { name: string } | null;
  vehicles?: GarageCar[];
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
  const [slide, setSlide] = useState(0);
  const trackRef = useRef<HTMLDivElement | null>(null);

  const load = useCallback(async () => {
    const res = await fetch("/api/auth/me");
    if (!res.ok) return;
    setMe(await res.json());
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const booking = me?.currentBooking;
  const garage = me?.customer ? me.vehicles ?? [] : [];
  const activeCar = garage[slide] ?? garage[0] ?? null;

  useEffect(() => {
    if (slide >= garage.length) setSlide(0);
  }, [garage.length, slide]);

  function onScrollTrack() {
    const el = trackRef.current;
    if (!el || garage.length < 2) return;
    const width = el.clientWidth || 1;
    const next = Math.round(el.scrollLeft / width);
    setSlide(Math.max(0, Math.min(garage.length - 1, next)));
  }

  return (
    <AppShell active="home">
      <div className="home-stage">
        <section className="home-intro">
          <p className="home-copy">
            {me?.customer
              ? `Welcome back, ${me.customer.name}.`
              : "Dealership expertise. Independent care."}
          </p>
        </section>

        {garage.length > 0 ? (
          <section className="home-garage-hero" aria-label="Your registered car">
            <div
              className="home-garage-swipe"
              ref={trackRef}
              onScroll={onScrollTrack}
            >
              {garage.map((car) => (
                <article key={car.id} className="home-garage-slide">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={car.image_url || "/cars/photos/g20.png"}
                    alt={`${car.year} ${car.make} ${car.model}`}
                  />
                  <div className="home-garage-meta">
                    <strong>
                      {car.year} {car.model}
                    </strong>
                    <span>{car.registration}</span>
                  </div>
                </article>
              ))}
            </div>
            {garage.length > 1 ? (
              <div className="home-garage-dots" aria-hidden>
                {garage.map((car, index) => (
                  <button
                    key={car.id}
                    type="button"
                    className={index === slide ? "active" : undefined}
                    onClick={() => {
                      const el = trackRef.current;
                      if (!el) return;
                      el.scrollTo({
                        left: index * el.clientWidth,
                        behavior: "smooth",
                      });
                      setSlide(index);
                    }}
                  />
                ))}
              </div>
            ) : null}
            <p className="home-service-hint">
              Remaining distance till the next service
            </p>
            {activeCar ? (
              <p className="home-service-sub muted">Coming soon</p>
            ) : null}
          </section>
        ) : null}

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
