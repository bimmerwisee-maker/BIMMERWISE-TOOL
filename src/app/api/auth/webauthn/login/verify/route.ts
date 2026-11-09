import { verifyAuthenticationResponse } from "@simplewebauthn/server";
import {
  createCustomerSession,
  customerSetCookie,
  getCustomerById,
  publicCustomer,
} from "../../../../../../lib/customers";
import {
  b64ToUint8,
  getCredentialById,
  parseTransports,
  rpFromRequest,
  takeChallenge,
  updateCredentialCounter,
} from "../../../../../../lib/webauthn";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  let body: { response?: unknown; email?: string };
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "invalid_json" }, { status: 400 });
  }

  const credentialId = String(
    (body.response as { id?: string } | undefined)?.id ?? "",
  );
  if (!credentialId || !body.response) {
    return Response.json({ error: "invalid_response" }, { status: 400 });
  }

  const stored = await getCredentialById(credentialId);
  if (!stored) {
    return Response.json({ error: "unknown_credential" }, { status: 404 });
  }

  const expectedChallenge = await takeChallenge(
    "authentication",
    stored.customer_id,
  );
  if (!expectedChallenge) {
    return Response.json({ error: "challenge_expired" }, { status: 400 });
  }

  const { rpID, origin } = rpFromRequest(request);

  try {
    const verification = await verifyAuthenticationResponse({
      response: body.response as never,
      expectedChallenge,
      expectedOrigin: origin,
      expectedRPID: rpID,
      credential: {
        id: stored.id,
        publicKey: Buffer.from(stored.public_key, "base64url"),
        counter: Number(stored.counter),
        transports: parseTransports(stored.transports),
      },
      requireUserVerification: false,
    });

    if (!verification.verified) {
      return Response.json({ error: "not_verified" }, { status: 400 });
    }

    await updateCredentialCounter(
      stored.id,
      verification.authenticationInfo.newCounter,
    );

    const customer = await getCustomerById(stored.customer_id);
    if (!customer) {
      return Response.json({ error: "customer_missing" }, { status: 404 });
    }

    const token = await createCustomerSession(customer.id);
    const response = Response.json(
      { customer: publicCustomer(customer) },
      { headers: { "cache-control": "private, no-store" } },
    );
    response.headers.append("set-cookie", customerSetCookie(token));
    return response;
  } catch {
    return Response.json({ error: "verification_failed" }, { status: 400 });
  }
}
