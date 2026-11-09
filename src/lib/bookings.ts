import { randomBytes, randomUUID } from "node:crypto";
import { sql } from "./db";
import type { Booking, BookingStatus, BookingUpdate, VehiclePhoto } from "./types";

export function newBookingCode(): string {
  return `BW-${randomBytes(16).toString("hex").toUpperCase()}`;
}

export async function createBooking(input: {
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
  scheduled_at: string | null;
  customer_id?: string | null;
  vehicle_id?: string | null;
  is_guest?: boolean;
}): Promise<Booking> {
  const id = randomUUID();
  const code = newBookingCode();
  const vin = input.vin_last7.trim().toUpperCase().slice(-7);
  const rows = await sql<Booking>(
    `insert into bookings (
      id, code, customer_name, customer_phone, customer_email,
      vehicle_year, vehicle_make, vehicle_model, vehicle_plate, vin_last7,
      service_type, customer_notes, status, scheduled_at,
      customer_id, vehicle_id, is_guest
    ) values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,'not_confirmed',$13,$14,$15,$16)
    returning *`,
    [
      id,
      code,
      input.customer_name,
      input.customer_phone,
      input.customer_email.toLowerCase(),
      input.vehicle_year,
      input.vehicle_make,
      input.vehicle_model,
      input.vehicle_plate,
      vin,
      input.service_type,
      input.customer_notes,
      input.scheduled_at,
      input.customer_id ?? null,
      input.vehicle_id ?? null,
      input.is_guest ?? true,
    ],
  );
  const booking = rows[0];
  await sql(
    `insert into booking_updates (id, booking_id, message, status, created_by)
     values ($1,$2,$3,$4,$5)`,
    [
      randomUUID(),
      booking.id,
      "Booking received — waiting for shop confirmation.",
      "not_confirmed",
      "system",
    ],
  );
  return booking;
}

export async function getBookingByCode(code: string): Promise<Booking | null> {
  const rows = await sql<Booking>(
    "select * from bookings where upper(code) = upper($1) limit 1",
    [code.trim()],
  );
  return rows[0] ?? null;
}

export async function getBookingById(id: string): Promise<Booking | null> {
  const rows = await sql<Booking>("select * from bookings where id = $1 limit 1", [id]);
  return rows[0] ?? null;
}

export async function listBookings(): Promise<Booking[]> {
  return sql<Booking>("select * from bookings order by created_at desc");
}

export async function listUpdates(bookingId: string): Promise<BookingUpdate[]> {
  return sql<BookingUpdate>(
    "select * from booking_updates where booking_id = $1 order by created_at desc",
    [bookingId],
  );
}

export async function listPhotos(bookingId: string): Promise<VehiclePhoto[]> {
  return sql<VehiclePhoto>(
    "select * from vehicle_photos where booking_id = $1 order by created_at desc",
    [bookingId],
  );
}

export async function addUpdate(input: {
  bookingId: string;
  message: string;
  status: BookingStatus;
  createdBy: string;
}): Promise<BookingUpdate> {
  await sql("update bookings set status = $1 where id = $2", [
    input.status,
    input.bookingId,
  ]);
  const rows = await sql<BookingUpdate>(
    `insert into booking_updates (id, booking_id, message, status, created_by)
     values ($1,$2,$3,$4,$5) returning *`,
    [randomUUID(), input.bookingId, input.message, input.status, input.createdBy],
  );
  return rows[0];
}

export async function addPhoto(input: {
  bookingId: string;
  caption: string;
  mimeType: string;
  dataBase64: string;
}): Promise<VehiclePhoto> {
  const rows = await sql<VehiclePhoto>(
    `insert into vehicle_photos (id, booking_id, caption, mime_type, data_base64)
     values ($1,$2,$3,$4,$5) returning *`,
    [
      randomUUID(),
      input.bookingId,
      input.caption,
      input.mimeType,
      input.dataBase64,
    ],
  );
  return rows[0];
}

export function vehicleLabel(booking: Booking): string {
  const year = booking.vehicle_year ? `${booking.vehicle_year} ` : "";
  return `${year}${booking.vehicle_make} ${booking.vehicle_model}`.trim();
}
