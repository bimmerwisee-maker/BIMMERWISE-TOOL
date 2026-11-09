import { cookies } from "next/headers";
import {
  CUSTOMER_COOKIE,
  addVehicle,
  getCustomerBySession,
  listVehicles,
} from "../../../lib/customers";

export const dynamic = "force-dynamic";

function clean(value: unknown, max: number): string {
  return String(value ?? "")
    .trim()
    .slice(0, max);
}

export async function GET() {
  const jar = await cookies();
  const customer = await getCustomerBySession(jar.get(CUSTOMER_COOKIE)?.value);
  if (!customer) {
    return Response.json({ error: "unauthorized" }, { status: 401 });
  }
  const vehicles = await listVehicles(customer.id);
  return Response.json(
    { vehicles },
    { headers: { "cache-control": "private, no-store" } },
  );
}

export async function POST(request: Request) {
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

  const vinLast7 = clean(body.vin_last7, 17).toUpperCase();
  const registration = clean(body.registration, 20).toUpperCase();
  const year = clean(body.year, 8);
  const make = clean(body.make, 40) || "BMW";
  const model = clean(body.model, 80);
  const modelSlug = clean(body.model_slug, 80);

  if (vinLast7.length < 7 || !registration || (!model && !modelSlug)) {
    return Response.json({ error: "invalid_vehicle" }, { status: 400 });
  }

  try {
    const vehicle = await addVehicle({
      customerId: customer.id,
      vinLast7,
      registration,
      year,
      make,
      model,
      modelSlug,
    });
    return Response.json(
      { vehicle },
      { status: 201, headers: { "cache-control": "private, no-store" } },
    );
  } catch {
    return Response.json({ error: "invalid_vehicle" }, { status: 400 });
  }
}
