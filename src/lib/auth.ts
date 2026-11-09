import { cookies } from "next/headers";
import { randomBytes, timingSafeEqual } from "node:crypto";
import {
  getIdentity,
  requireTeamRole,
  type VerifiedIdentity,
} from "../../cursor/identity";
import { sql } from "./db";

export const ADMIN_COOKIE = "bw_admin_session";
const SESSION_DAYS = 7;

export function adminPasswordConfigured(): boolean {
  return Boolean(process.env.BOOKING_ADMIN_PASSWORD?.trim());
}

export function passwordsMatch(provided: string, expected: string): boolean {
  const a = Buffer.from(provided);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

export function adminSetCookie(token: string): string {
  const maxAge = SESSION_DAYS * 24 * 60 * 60;
  const parts = [
    `${ADMIN_COOKIE}=${token}`,
    "Path=/",
    "HttpOnly",
    "SameSite=Lax",
    `Max-Age=${maxAge}`,
  ];
  if (process.env.NODE_ENV === "production") {
    parts.push("Secure");
  }
  return parts.join("; ");
}

export function adminClearCookie(): string {
  const parts = [
    `${ADMIN_COOKIE}=`,
    "Path=/",
    "HttpOnly",
    "SameSite=Lax",
    "Max-Age=0",
  ];
  if (process.env.NODE_ENV === "production") {
    parts.push("Secure");
  }
  return parts.join("; ");
}

export async function createAdminSession(): Promise<string> {
  const token = randomBytes(32).toString("hex");
  const expires = new Date(Date.now() + SESSION_DAYS * 24 * 60 * 60 * 1000);
  await sql(
    "insert into admin_sessions (token, expires_at) values ($1, $2)",
    [token, expires.toISOString()],
  );
  return token;
}

export async function destroyAdminSession(token: string | undefined): Promise<void> {
  if (!token) return;
  await sql("delete from admin_sessions where token = $1", [token]);
}

export async function hasPasswordSession(token: string | undefined): Promise<boolean> {
  if (!token) return false;
  const rows = await sql<{ token: string }>(
    "select token from admin_sessions where token = $1 and expires_at > now()",
    [token],
  );
  return rows.length > 0;
}

export async function isTeamAdmin(request: Request): Promise<boolean> {
  const identity = await getIdentity(request);
  if (!identity.verified) return false;
  if (identity.kind !== "person") return false;
  const admin = requireTeamRole(identity as VerifiedIdentity, ["admin"]);
  return !(admin instanceof Response);
}

export async function requireAdmin(request: Request): Promise<true | Response> {
  if (await isTeamAdmin(request)) return true;

  const jar = await cookies();
  const token = jar.get(ADMIN_COOKIE)?.value;
  if (await hasPasswordSession(token)) return true;

  return Response.json({ error: "unauthorized" }, { status: 401 });
}

export async function isAdminRequest(request: Request): Promise<boolean> {
  const result = await requireAdmin(request);
  return result === true;
}

export async function verifyAdminLogin(password: string): Promise<boolean> {
  const expected = process.env.BOOKING_ADMIN_PASSWORD?.trim() ?? "";
  if (!expected || !password) return false;
  return passwordsMatch(password, expected);
}
