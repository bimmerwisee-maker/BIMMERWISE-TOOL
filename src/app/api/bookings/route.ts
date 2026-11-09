import { createBooking, listBookings } from "../../../lib/bookings";
import { isAdminRequest } from "../../../lib/auth";
import { SERVICE_TYPES } from "../../../lib/types";

export const dynamic = "force-dynamic";

function clean(value: unknown, max = 200): string {
  return String(value ?? "")
    .trim()
    .slice(0, max);
}

export async function GET(request: Request) {
  if (!(await isAdminRequest(request))) {
    return Response.json({ error: "unauthorized" }, { status: 401 });
  }
  const bookings = await listBookings();
  return Response.json(
    { bookings },
    { headers: { "cache-control": "private, no-store" } },
  );
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "invalid_json" }, { status: 400 });
  }

  const customer_name = clean(body.customer_name, 120);
  const vehicle_make = clean(body.vehicle_make, 80);
  const vehicle_model = clean(body.vehicle_model, 80);
  const service_type = clean(body.service_type, 80);
  const customer_phone = clean(body.customer_phone, 40);
  const customer_email = clean(body.customer_email, 120).toLowerCase();
  const vehicle_year = clean(body.vehicle_year, 8);
  const vehicle_plate = clean(body.vehicle_plate, 20);
  const customer_notes = clean(body.customer_notes, 1000);
  const scheduledRaw = clean(body.scheduled_at, 40);

  if (!customer_name || !vehicle_make || !vehicle_model || !service_type || !customer_email) {
    return Response.json({ error: "missing_fields" }, { status: 400 });
  }
  if (!customer_email.includes("@")) {
    return Response.json({ error: "invalid_email" }, { status: 400 });
  }
  if (!(SERVICE_TYPES as readonly string[]).includes(service_type)) {
    return Response.json({ error: "invalid_service" }, { status: 400 });
  }

  let scheduled_at: string | null = null;
  if (scheduledRaw) {
    const d = new Date(scheduledRaw);
    if (Number.isNaN(d.getTime())) {
      return Response.json({ error: "invalid_schedule" }, { status: 400 });
    }
    scheduled_at = d.toISOString();
  }

  const booking = await createBooking({
    customer_name,
    customer_phone,
    customer_email,
    vehicle_year,
    vehicle_make,
    vehicle_model,
    vehicle_plate,
    service_type,
    customer_notes,
    scheduled_at,
  });

  return Response.json(
    { booking },
    { status: 201, headers: { "cache-control": "private, no-store" } },
  );
}
