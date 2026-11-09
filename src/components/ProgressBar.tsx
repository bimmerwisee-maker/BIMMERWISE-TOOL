"use client";

import { useEffect, useState } from "react";
import { PROGRESS_STEPS } from "../lib/types";

export function ProgressBar({
  percent,
  label,
  vehicle,
}: {
  percent: number;
  label: string;
  vehicle: string;
}) {
  const [shown, setShown] = useState(0);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const boot = window.setTimeout(() => setReady(true), 80);
    const fill = window.setTimeout(() => setShown(percent), 220);
    return () => {
      window.clearTimeout(boot);
      window.clearTimeout(fill);
    };
  }, [percent]);

  return (
    <section
      className={`progress-card ${ready ? "is-ready" : ""}`}
      aria-label="Current booking progress"
    >
      <div className="m-stripe m-stripe-thin" aria-hidden />
      <div className="progress-head">
        <div>
          <p className="eyebrow">Current booking</p>
          <h2>{vehicle}</h2>
        </div>
        <strong className="progress-pct">{shown}%</strong>
      </div>
      <p className="progress-label">{label}</p>
      <div
        className="progress-track"
        role="progressbar"
        aria-valuenow={shown}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div className="progress-fill" style={{ width: `${shown}%` }}>
          <span className="progress-sheen" aria-hidden />
        </div>
      </div>
      <div className="progress-steps">
        {PROGRESS_STEPS.map((step, index) => (
          <span
            key={step.pct}
            className={shown >= step.pct ? "done" : undefined}
            style={{ transitionDelay: `${120 + index * 80}ms` }}
          >
            {step.label}
          </span>
        ))}
      </div>
    </section>
  );
}
