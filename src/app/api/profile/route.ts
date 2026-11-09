import { cookies } from "next/headers";
import {
  CUSTOMER_COOKIE,
  getCustomerBySession,
  publicCustomer,
  updateCustomerAvatar,
  updateCustomerProfile,
} from "../../../lib/customers";

export const dynamic = "force-dynamic";

const ALLOWED_MIME = new Set(["image/jpeg", "image/png", "image/webp"]);
const MAX_BYTES = 1_000_000;

export async function PATCH(request: Request) {
  const jar = await cookies();
  const customer = await getCustomerBySession(jar.get(CUSTOMER_COOKIE)?.value);
  if (!customer) {
    return Response.json({ error: "unauthorized" }, { status: 401 });
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "invalid_json" }, { status: 400 });
  }

  if (body.avatar_base64 || body.mime_type) {
    const mime = String(body.mime_type ?? "").trim();
    const data = String(body.avatar_base64 ?? "").replace(/\s+/g, "");
    if (!ALLOWED_MIME.has(mime) || !data) {
      return Response.json({ error: "invalid_image" }, { status: 400 });
    }
    const approx = Math.floor((data.length * 3) / 4);
    if (approx > MAX_BYTES) {
      return Response.json({ error: "image_too_large" }, { status: 413 });
    }
    const updated = await updateCustomerAvatar(customer.id, mime, data);
    return Response.json(
      { customer: publicCustomer(updated) },
      { headers: { "cache-control": "private, no-store" } },
    );
  }

  const name = String(body.name ?? "").trim().slice(0, 120);
  const phone = String(body.phone ?? "").trim().slice(0, 40);
  if (!name) {
    return Response.json({ error: "invalid_fields" }, { status: 400 });
  }
  const updated = await updateCustomerProfile(customer.id, { name, phone });
  return Response.json(
    { customer: publicCustomer(updated) },
    { headers: { "cache-control": "private, no-store" } },
  );
}
