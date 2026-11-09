import {
  createCustomerSession,
  customerSetCookie,
  googleOAuthConfigured,
  publicCustomer,
  upsertGoogleCustomer,
} from "../../../../lib/customers";

export const dynamic = "force-dynamic";

/** Local-only sample Google sign-in when OAuth secrets are not configured. */
export async function POST() {
  if (process.env.NODE_ENV === "production" || googleOAuthConfigured()) {
    return Response.json({ error: "unavailable" }, { status: 404 });
  }

  const customer = await upsertGoogleCustomer({
    email: "demo.customer@example.com",
    name: "Demo Customer",
    googleSub: "sample-google-local",
  });

  const token = await createCustomerSession(customer.id);
  const response = Response.json(
    { customer: publicCustomer(customer), sample: true },
    { headers: { "cache-control": "private, no-store" } },
  );
  response.headers.append("set-cookie", customerSetCookie(token));
  return response;
}
