export const BOOKING_STATUSES = [
  "not_confirmed",
  "confirmed",
  "job_started",
  "ready_collection",
  "collected",
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
  vin_last7: string;
  service_type: string;
  customer_notes: string;
  status: BookingStatus;
  scheduled_at: string | null;
  created_at: string;
  customer_id: string | null;
  vehicle_id: string | null;
  is_guest: boolean;
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

export type Customer = {
  id: string;
  email: string;
  name: string;
  phone: string;
  google_sub: string | null;
  avatar_mime: string | null;
  avatar_base64: string | null;
  created_at: string;
};

export type Vehicle = {
  id: string;
  customer_id: string;
  vin_last7: string;
  registration: string;
  year: string;
  make: string;
  model: string;
  created_at: string;
};

export const STATUS_LABELS: Record<BookingStatus, string> = {
  not_confirmed: "Booking not confirmed",
  confirmed: "Booking confirmed",
  job_started: "Job started",
  ready_collection: "Ready for collection",
  collected: "Car collected",
  cancelled: "Cancelled",
};

/** Progress percent for home bar. Cancelled / unknown → null (hide). */
export const STATUS_PROGRESS: Record<BookingStatus, number | null> = {
  not_confirmed: 0,
  confirmed: 25,
  job_started: 50,
  ready_collection: 75,
  collected: 100,
  cancelled: null,
};

export const PROGRESS_STEPS = [
  { pct: 0, label: "Not confirmed" },
  { pct: 25, label: "Confirmed" },
  { pct: 50, label: "Job started" },
  { pct: 75, label: "Ready" },
  { pct: 100, label: "Collected" },
] as const;

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
