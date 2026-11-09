import { cookies } from "next/headers";
import { ADMIN_COOKIE, destroyAdminSession } from "../../../../lib/auth";

export const dynamic = "force-dynamic";

export async function POST() {
  const jar = await cookies();
  const token = jar.get(ADMIN_COOKIE)?.value;
  await destroyAdminSession(token);
  const response = Response.json(
    { ok: true },
    { headers: { "cache-control": "private, no-store" } },
  );
  response.headers.append(
    "set-cookie",
    `${ADMIN_COOKIE}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0`,
  );
  return response;
}
