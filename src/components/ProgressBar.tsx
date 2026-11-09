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
  return (
    <section className="progress-card" aria-label="Current booking progress">
      <div className="progress-head">
        <div>
          <p className="eyebrow">Current booking</p>
          <h2>{vehicle}</h2>
        </div>
        <strong className="progress-pct">{percent}%</strong>
      </div>
      <p className="progress-label">{label}</p>
      <div className="progress-track" role="progressbar" aria-valuenow={percent} aria-valuemin={0} aria-valuemax={100}>
        <div className="progress-fill" style={{ width: `${percent}%` }} />
      </div>
      <div className="progress-steps">
        {PROGRESS_STEPS.map((step) => (
          <span
            key={step.pct}
            className={percent >= step.pct ? "done" : undefined}
          >
            {step.label}
          </span>
        ))}
      </div>
    </section>
  );
}
