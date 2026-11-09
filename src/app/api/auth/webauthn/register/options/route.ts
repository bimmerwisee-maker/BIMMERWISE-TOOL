import { cookies } from "next/headers";
import { generateRegistrationOptions } from "@simplewebauthn/server";
import {
  CUSTOMER_COOKIE,
  getCustomerBySession,
} from "../../../../../../lib/customers";
import {
  listCredentials,
  parseTransports,
  rpFromRequest,
  saveChallenge,
} from "../../../../../../lib/webauthn";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const jar = await cookies();
  const customer = await getCustomerBySession(jar.get(CUSTOMER_COOKIE)?.value);
  if (!customer) {
    return Response.json({ error: "unauthorized" }, { status: 401 });
  }

  const { rpID, rpName } = rpFromRequest(request);
  const existing = await listCredentials(customer.id);

  const options = await generateRegistrationOptions({
    rpName,
    rpID,
    userName: customer.email,
    userDisplayName: customer.name,
    userID: new TextEncoder().encode(customer.id),
    attestationType: "none",
    authenticatorSelection: {
      residentKey: "preferred",
      userVerification: "preferred",
      authenticatorAttachment: "platform",
    },
    excludeCredentials: existing.map((cred) => ({
      id: cred.id,
      transports: parseTransports(cred.transports),
    })),
  });

  await saveChallenge({
    customerId: customer.id,
    challenge: options.challenge,
    kind: "registration",
  });

  return Response.json(options, {
    headers: { "cache-control": "private, no-store" },
  });
}
