import { cookies } from "next/headers";
import {
  CUSTOMER_COOKIE,
  customerClearCookie,
  destroyCustomerSession,
} from "../../../../lib/customers";

export const dynamic = "force-dynamic";

export async function POST() {
  const jar = await cookies();
  await destroyCustomerSession(jar.get(CUSTOMER_COOKIE)?.value);
  const response = Response.json(
    { ok: true },
    { headers: { "cache-control": "private, no-store" } },
  );
  response.headers.append("set-cookie", customerClearCookie());
  return response;
}
