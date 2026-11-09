import { randomBytes, randomUUID, scryptSync, timingSafeEqual } from "node:crypto";
import { sql } from "./db";
import type { Booking, Customer, Vehicle } from "./types";

const CUSTOMER_COOKIE = "bw_customer_session";
const SESSION_DAYS = 30;

export { CUSTOMER_COOKIE };

export function hashPassword(password: string): string {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${hash}`;
}

export function verifyPassword(password: string, stored: string): boolean {
  const [salt, hash] = stored.split(":");
  if (!salt || !hash) return false;
  const next = scryptSync(password, salt, 64);
  const prev = Buffer.from(hash, "hex");
  if (prev.length !== next.length) return false;
  return timingSafeEqual(prev, next);
}

export function customerSetCookie(token: string): string {
  const maxAge = SESSION_DAYS * 24 * 60 * 60;
  const parts = [
    `${CUSTOMER_COOKIE}=${token}`,
    "Path=/",
    "HttpOnly",
    "SameSite=Lax",
    `Max-Age=${maxAge}`,
  ];
  if (process.env.NODE_ENV === "production") parts.push("Secure");
  return parts.join("; ");
}

export function customerClearCookie(): string {
  const parts = [
    `${CUSTOMER_COOKIE}=`,
    "Path=/",
    "HttpOnly",
    "SameSite=Lax",
    "Max-Age=0",
  ];
  if (process.env.NODE_ENV === "production") parts.push("Secure");
  return parts.join("; ");
}

export async function createCustomerSession(customerId: string): Promise<string> {
  const token = randomBytes(32).toString("hex");
  const expires = new Date(Date.now() + SESSION_DAYS * 24 * 60 * 60 * 1000);
  await sql(
    "insert into customer_sessions (token, customer_id, expires_at) values ($1,$2,$3)",
    [token, customerId, expires.toISOString()],
  );
  return token;
}

export async function destroyCustomerSession(token: string | undefined): Promise<void> {
  if (!token) return;
  await sql("delete from customer_sessions where token = $1", [token]);
}

export async function getCustomerBySession(
  token: string | undefined,
): Promise<Customer | null> {
  if (!token) return null;
  const rows = await sql<Customer>(
    `select c.* from customers c
     join customer_sessions s on s.customer_id = c.id
     where s.token = $1 and s.expires_at > now()
     limit 1`,
    [token],
  );
  return rows[0] ?? null;
}

export async function getCustomerById(id: string): Promise<Customer | null> {
  const rows = await sql<Customer>("select * from customers where id = $1 limit 1", [id]);
  return rows[0] ?? null;
}

export async function getCustomerByEmail(email: string): Promise<Customer | null> {
  const rows = await sql<Customer>(
    "select * from customers where lower(email) = lower($1) limit 1",
    [email.trim()],
  );
  return rows[0] ?? null;
}

export async function upsertGoogleCustomer(input: {
  email: string;
  name: string;
  googleSub: string;
  avatarUrl?: string;
}): Promise<Customer> {
  const existing = await sql<Customer>(
    "select * from customers where google_sub = $1 or lower(email) = lower($2) limit 1",
    [input.googleSub, input.email],
  );
  if (existing[0]) {
    const rows = await sql<Customer>(
      `update customers
       set google_sub = $1, name = coalesce(nullif($2,''), name), email = lower($3)
       where id = $4
       returning *`,
      [input.googleSub, input.name, input.email, existing[0].id],
    );
    return rows[0];
  }
  const rows = await sql<Customer>(
    `insert into customers (id, email, name, phone, google_sub)
     values ($1, lower($2), $3, '', $4)
     returning *`,
    [randomUUID(), input.email, input.name || "Customer", input.googleSub],
  );
  return rows[0];
}

export async function registerCustomer(input: {
  email: string;
  name: string;
  phone: string;
  password: string;
}): Promise<Customer> {
  const rows = await sql<Customer>(
    `insert into customers (id, email, name, phone, password_hash)
     values ($1, lower($2), $3, $4, $5)
     returning *`,
    [
      randomUUID(),
      input.email.trim(),
      input.name.trim(),
      input.phone.trim(),
      hashPassword(input.password),
    ],
  );
  return rows[0];
}

export async function updateCustomerProfile(
  customerId: string,
  input: { name: string; phone: string },
): Promise<Customer> {
  const rows = await sql<Customer>(
    `update customers set name = $1, phone = $2 where id = $3 returning *`,
    [input.name.trim(), input.phone.trim(), customerId],
  );
  return rows[0];
}

export async function updateCustomerAvatar(
  customerId: string,
  mime: string,
  dataBase64: string,
): Promise<Customer> {
  const rows = await sql<Customer>(
    `update customers set avatar_mime = $1, avatar_base64 = $2 where id = $3 returning *`,
    [mime, dataBase64, customerId],
  );
  return rows[0];
}

export function publicCustomer(c: Customer) {
  return {
    id: c.id,
    email: c.email,
    name: c.name,
    phone: c.phone,
    has_google: Boolean(c.google_sub),
    avatar_url:
      c.avatar_mime && c.avatar_base64
        ? `data:${c.avatar_mime};base64,${c.avatar_base64}`
        : null,
  };
}

export async function listVehicles(customerId: string): Promise<Vehicle[]> {
  return sql<Vehicle>(
    "select * from vehicles where customer_id = $1 order by created_at desc",
    [customerId],
  );
}

export async function addVehicle(input: {
  customerId: string;
  vinLast7: string;
  registration: string;
  year: string;
  make: string;
  model: string;
}): Promise<Vehicle> {
  const vin = input.vinLast7.trim().toUpperCase();
  if (vin.length < 7) {
    throw new Error("vin_too_short");
  }
  const rows = await sql<Vehicle>(
    `insert into vehicles (id, customer_id, vin_last7, registration, year, make, model)
     values ($1,$2,$3,$4,$5,$6,$7) returning *`,
    [
      randomUUID(),
      input.customerId,
      vin.slice(-7),
      input.registration.trim().toUpperCase(),
      input.year.trim(),
      input.make.trim() || "BMW",
      input.model.trim(),
    ],
  );
  return rows[0];
}

export async function getVehicle(
  customerId: string,
  vehicleId: string,
): Promise<Vehicle | null> {
  const rows = await sql<Vehicle>(
    "select * from vehicles where id = $1 and customer_id = $2 limit 1",
    [vehicleId, customerId],
  );
  return rows[0] ?? null;
}

export async function currentBookingForCustomer(
  customerId: string,
): Promise<Booking | null> {
  const rows = await sql<Booking>(
    `select * from bookings
     where customer_id = $1
       and status not in ('collected', 'cancelled')
     order by created_at desc
     limit 1`,
    [customerId],
  );
  return rows[0] ?? null;
}

export function googleOAuthConfigured(): boolean {
  return Boolean(
    process.env.GOOGLE_CLIENT_ID?.trim() && process.env.GOOGLE_CLIENT_SECRET?.trim(),
  );
}
