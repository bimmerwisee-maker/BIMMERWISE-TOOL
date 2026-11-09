import { randomUUID } from "node:crypto";
import type { AuthenticatorTransport, CredentialDeviceType } from "@simplewebauthn/server";
import { sql } from "./db";

export type StoredCredential = {
  id: string;
  customer_id: string;
  public_key: string;
  counter: number;
  device_type: string;
  backed_up: boolean;
  transports: string;
};

export function rpFromRequest(request: Request): {
  rpID: string;
  rpName: string;
  origin: string;
} {
  const url = new URL(request.url);
  return {
    rpID: url.hostname,
    rpName: "BimmerWise",
    origin: url.origin,
  };
}

export function b64ToUint8(value: string): Uint8Array {
  return new Uint8Array(Buffer.from(value, "base64url"));
}

export function uint8ToB64(value: Uint8Array): string {
  return Buffer.from(value).toString("base64url");
}

export async function saveChallenge(input: {
  customerId?: string | null;
  challenge: string;
  kind: "registration" | "authentication";
}): Promise<string> {
  const id = randomUUID();
  const expires = new Date(Date.now() + 5 * 60 * 1000);
  await sql(
    `insert into webauthn_challenges (id, customer_id, challenge, kind, expires_at)
     values ($1,$2,$3,$4,$5)`,
    [id, input.customerId ?? null, input.challenge, input.kind, expires.toISOString()],
  );
  return id;
}

export async function takeChallenge(
  kind: "registration" | "authentication",
  customerId?: string | null,
): Promise<string | null> {
  const rows = await sql<{ id: string; challenge: string }>(
    kind === "registration" && customerId
      ? `select id, challenge from webauthn_challenges
         where kind = $1 and customer_id = $2 and expires_at > now()
         order by created_at desc limit 1`
      : `select id, challenge from webauthn_challenges
         where kind = $1 and expires_at > now()
         order by created_at desc limit 1`,
    kind === "registration" && customerId ? [kind, customerId] : [kind],
  );
  if (!rows[0]) return null;
  await sql("delete from webauthn_challenges where id = $1", [rows[0].id]);
  return rows[0].challenge;
}

export async function listCredentials(
  customerId: string,
): Promise<StoredCredential[]> {
  return sql<StoredCredential>(
    "select * from webauthn_credentials where customer_id = $1",
    [customerId],
  );
}

export async function getCredentialById(
  id: string,
): Promise<StoredCredential | null> {
  const rows = await sql<StoredCredential>(
    "select * from webauthn_credentials where id = $1 limit 1",
    [id],
  );
  return rows[0] ?? null;
}

export async function saveCredential(input: {
  id: string;
  customerId: string;
  publicKey: Uint8Array;
  counter: number;
  deviceType: CredentialDeviceType;
  backedUp: boolean;
  transports?: AuthenticatorTransport[];
}): Promise<void> {
  await sql(
    `insert into webauthn_credentials
      (id, customer_id, public_key, counter, device_type, backed_up, transports)
     values ($1,$2,$3,$4,$5,$6,$7)
     on conflict (id) do update set
       public_key = excluded.public_key,
       counter = excluded.counter,
       device_type = excluded.device_type,
       backed_up = excluded.backed_up,
       transports = excluded.transports`,
    [
      input.id,
      input.customerId,
      uint8ToB64(input.publicKey),
      input.counter,
      input.deviceType,
      input.backedUp,
      (input.transports ?? []).join(","),
    ],
  );
}

export async function updateCredentialCounter(
  id: string,
  counter: number,
): Promise<void> {
  await sql("update webauthn_credentials set counter = $1 where id = $2", [
    counter,
    id,
  ]);
}

export function parseTransports(
  value: string,
): AuthenticatorTransport[] | undefined {
  const parts = value
    .split(",")
    .map((v) => v.trim())
    .filter(Boolean) as AuthenticatorTransport[];
  return parts.length ? parts : undefined;
}

export async function countCredentials(customerId: string): Promise<number> {
  const rows = await sql<{ count: string }>(
    "select count(*)::text as count from webauthn_credentials where customer_id = $1",
    [customerId],
  );
  return Number(rows[0]?.count ?? 0);
}
