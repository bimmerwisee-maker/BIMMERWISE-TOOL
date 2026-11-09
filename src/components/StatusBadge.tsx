import { STATUS_LABELS, type BookingStatus } from "../lib/types";

export function StatusBadge({ status }: { status: BookingStatus }) {
  return (
    <span className={`status-pill status-${status}`} data-status={status}>
      <span className="status-dot" aria-hidden />
      {STATUS_LABELS[status]}
    </span>
  );
}
