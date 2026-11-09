import {
  createCustomerSession,
  customerSetCookie,
  getCustomerByEmail,
  registerCustomer,
  publicCustomer,
} from "../../../../lib/customers";
import { clientKey, takeToken } from "../../../../lib/rate-limit";

export const dynamic = "force-dynamic";

function clean(value: unknown, max: number): string {
  return String(value ?? "")
    .trim()
    .slice(0, max);
}

export async function POST(request: Request) {
  const limited = takeToken(`register:${clientKey(request)}`, 8, 60_000);
  if (!limited.ok) {
    return Response.json({ error: "rate_limited" }, { status: 429 });
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "invalid_json" }, { status: 400 });
  }

  const name = clean(body.name, 120);
  const email = clean(body.email, 120).toLowerCase();
  const phone = clean(body.phone, 40);
  const password = String(body.password ?? "");

  if (!name || !email.includes("@") || password.length < 8) {
    return Response.json({ error: "invalid_fields" }, { status: 400 });
  }

  if (await getCustomerByEmail(email)) {
    return Response.json({ error: "email_taken" }, { status: 409 });
  }

  const customer = await registerCustomer({ name, email, phone, password });
  const token = await createCustomerSession(customer.id);
  const response = Response.json(
    { customer: publicCustomer(customer) },
    { status: 201, headers: { "cache-control": "private, no-store" } },
  );
  response.headers.append("set-cookie", customerSetCookie(token));
  return response;
}
