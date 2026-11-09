export const BOOKING_STATUSES = [
  "scheduled",
  "checked_in",
  "diagnosing",
  "in_progress",
  "waiting_parts",
  "ready",
  "completed",
  "cancelled",
] as const;

export type BookingStatus = (typeof BOOKING_STATUSES)[number];

export function isValidStatus(value: string): value is BookingStatus {
  return (BOOKING_STATUSES as readonly string[]).includes(value);
}

export type Booking = {
  id: string;
  code: string;
  customer_name: string;
  customer_phone: string;
  customer_email: string;
  vehicle_year: string;
  vehicle_make: string;
  vehicle_model: string;
  vehicle_plate: string;
  service_type: string;
  customer_notes: string;
  status: BookingStatus;
  scheduled_at: string | null;
  created_at: string;
};

export type BookingUpdate = {
  id: string;
  booking_id: string;
  message: string;
  status: BookingStatus;
  created_by: string;
  created_at: string;
};

export type VehiclePhoto = {
  id: string;
  booking_id: string;
  caption: string;
  mime_type: string;
  data_base64: string;
  created_at: string;
};

export const STATUS_LABELS: Record<BookingStatus, string> = {
  scheduled: "Scheduled",
  checked_in: "Checked in",
  diagnosing: "Diagnosing",
  in_progress: "In progress",
  waiting_parts: "Waiting on parts",
  ready: "Ready for pickup",
  completed: "Completed",
  cancelled: "Cancelled",
};

export const SERVICE_TYPES = [
  "Diagnostic",
  "Oil service",
  "Brake service",
  "Tire / alignment",
  "Electrical",
  "Body / paint inspection",
  "Software update",
  "Other",
] as const;
