import { cookies } from "next/headers";
import { createBooking, listBookings } from "../../../lib/bookings";
import { isAdminRequest } from "../../../lib/auth";
import {
  CUSTOMER_COOKIE,
  getCustomerBySession,
  getVehicle,
} from "../../../lib/customers";
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

  const jar = await cookies();
  const customer = await getCustomerBySession(jar.get(CUSTOMER_COOKIE)?.value);
  const asGuest = Boolean(body.as_guest) || !customer;

  const service_type = clean(body.service_type, 80);
  const customer_notes = clean(body.customer_notes, 1000);
  const scheduledRaw = clean(body.scheduled_at, 40);

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

  let customer_name = clean(body.customer_name, 120);
  let customer_phone = clean(body.customer_phone, 40);
  let customer_email = clean(body.customer_email, 120).toLowerCase();
  let vehicle_year = clean(body.vehicle_year, 8);
  let vehicle_make = clean(body.vehicle_make, 80) || "BMW";
  let vehicle_model = clean(body.vehicle_model, 80);
  let vehicle_plate = clean(body.vehicle_plate, 20).toUpperCase();
  let vin_last7 = clean(body.vin_last7, 17).toUpperCase();
  let vehicle_id: string | null = null;
  let customer_id: string | null = null;

  if (!asGuest && customer) {
    customer_id = customer.id;
    customer_name = customer.name;
    customer_phone = customer.phone || customer_phone;
    customer_email = customer.email;

    const selectedVehicleId = clean(body.vehicle_id, 64);
    if (selectedVehicleId) {
      const vehicle = await getVehicle(customer.id, selectedVehicleId);
      if (!vehicle) {
        return Response.json({ error: "vehicle_not_found" }, { status: 400 });
      }
      vehicle_id = vehicle.id;
      vehicle_year = vehicle.year;
      vehicle_make = vehicle.make;
      vehicle_model = vehicle.model;
      vehicle_plate = vehicle.registration;
      vin_last7 = vehicle.vin_last7;
    }
  }

  if (vin_last7.length < 7) {
    return Response.json({ error: "vin_too_short" }, { status: 400 });
  }
  vin_last7 = vin_last7.slice(-7);

  if (!customer_name || !vehicle_model || !customer_email.includes("@") || !vehicle_plate) {
    return Response.json({ error: "missing_fields" }, { status: 400 });
  }

  const booking = await createBooking({
    customer_name,
    customer_phone,
    customer_email,
    vehicle_year,
    vehicle_make,
    vehicle_model,
    vehicle_plate,
    vin_last7,
    service_type,
    customer_notes,
    scheduled_at,
    customer_id,
    vehicle_id,
    is_guest: asGuest || !customer,
  });

  return Response.json(
    { booking },
    { status: 201, headers: { "cache-control": "private, no-store" } },
  );
}
