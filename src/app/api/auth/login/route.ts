import { sql } from "../../../../lib/db";
import {
  createCustomerSession,
  customerSetCookie,
  getCustomerByEmail,
  publicCustomer,
  verifyPassword,
} from "../../../../lib/customers";
import { clientKey, takeToken } from "../../../../lib/rate-limit";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const limited = takeToken(`cust-login:${clientKey(request)}`, 12, 60_000);
  if (!limited.ok) {
    return Response.json({ error: "rate_limited" }, { status: 429 });
  }

  let body: { email?: string; password?: string };
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "invalid_json" }, { status: 400 });
  }

  const email = String(body.email ?? "").trim().toLowerCase();
  const password = String(body.password ?? "");
  const customer = await getCustomerByEmail(email);
  if (!customer) {
    return Response.json({ error: "invalid_credentials" }, { status: 401 });
  }

  const rows = await sql<{ password_hash: string | null }>(
    "select password_hash from customers where id = $1",
    [customer.id],
  );
  const hash = rows[0]?.password_hash;
  if (!hash || !verifyPassword(password, hash)) {
    return Response.json({ error: "invalid_credentials" }, { status: 401 });
  }

  const token = await createCustomerSession(customer.id);
  const response = Response.json(
    { customer: publicCustomer(customer) },
    { headers: { "cache-control": "private, no-store" } },
  );
  response.headers.append("set-cookie", customerSetCookie(token));
  return response;
}
