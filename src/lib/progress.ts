import type { BookingStatus } from "./types";
import { STATUS_LABELS, STATUS_PROGRESS } from "./types";

export function bookingProgress(status: BookingStatus): {
  percent: number | null;
  label: string;
} {
  return {
    percent: STATUS_PROGRESS[status] ?? null,
    label: STATUS_LABELS[status] ?? status,
  };
}
