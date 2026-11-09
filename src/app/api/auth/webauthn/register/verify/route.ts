import { cookies } from "next/headers";
import {
  verifyRegistrationResponse,
  type AuthenticatorTransport,
} from "@simplewebauthn/server";
import {
  CUSTOMER_COOKIE,
  getCustomerBySession,
} from "../../../../../../lib/customers";
import {
  rpFromRequest,
  saveCredential,
  takeChallenge,
} from "../../../../../../lib/webauthn";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const jar = await cookies();
  const customer = await getCustomerBySession(jar.get(CUSTOMER_COOKIE)?.value);
  if (!customer) {
    return Response.json({ error: "unauthorized" }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "invalid_json" }, { status: 400 });
  }

  const expectedChallenge = await takeChallenge("registration", customer.id);
  if (!expectedChallenge) {
    return Response.json({ error: "challenge_expired" }, { status: 400 });
  }

  const { rpID, origin } = rpFromRequest(request);

  try {
    const verification = await verifyRegistrationResponse({
      response: body as never,
      expectedChallenge,
      expectedOrigin: origin,
      expectedRPID: rpID,
      requireUserVerification: false,
    });

    if (!verification.verified || !verification.registrationInfo) {
      return Response.json({ error: "not_verified" }, { status: 400 });
    }

    const { credential, credentialDeviceType, credentialBackedUp } =
      verification.registrationInfo;

    await saveCredential({
      id: credential.id,
      customerId: customer.id,
      publicKey: credential.publicKey,
      counter: credential.counter,
      deviceType: credentialDeviceType,
      backedUp: credentialBackedUp,
      transports: credential.transports as AuthenticatorTransport[] | undefined,
    });

    return Response.json(
      { ok: true },
      { headers: { "cache-control": "private, no-store" } },
    );
  } catch {
    return Response.json({ error: "verification_failed" }, { status: 400 });
  }
}
