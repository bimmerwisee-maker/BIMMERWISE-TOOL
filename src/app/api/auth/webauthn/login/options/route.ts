import { generateAuthenticationOptions } from "@simplewebauthn/server";
import { getCustomerByEmail } from "../../../../../../lib/customers";
import {
  listCredentials,
  parseTransports,
  rpFromRequest,
  saveChallenge,
} from "../../../../../../lib/webauthn";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  let body: { email?: string } = {};
  try {
    body = await request.json();
  } catch {
    body = {};
  }

  const email = String(body.email ?? "")
    .trim()
    .toLowerCase();
  const { rpID } = rpFromRequest(request);

  let allowCredentials:
    | { id: string; transports?: ReturnType<typeof parseTransports> }[]
    | undefined;
  let customerId: string | null = null;

  if (email) {
    const customer = await getCustomerByEmail(email);
    if (!customer) {
      return Response.json({ error: "not_found" }, { status: 404 });
    }
    customerId = customer.id;
    const creds = await listCredentials(customer.id);
    if (creds.length === 0) {
      return Response.json({ error: "no_passkey" }, { status: 404 });
    }
    allowCredentials = creds.map((cred) => ({
      id: cred.id,
      transports: parseTransports(cred.transports),
    }));
  }

  const options = await generateAuthenticationOptions({
    rpID,
    userVerification: "preferred",
    allowCredentials,
  });

  await saveChallenge({
    customerId,
    challenge: options.challenge,
    kind: "authentication",
  });

  return Response.json(options, {
    headers: { "cache-control": "private, no-store" },
  });
}
