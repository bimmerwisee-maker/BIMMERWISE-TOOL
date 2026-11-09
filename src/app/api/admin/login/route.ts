import { ADMIN_COOKIE, createAdminSession, verifyAdminLogin } from "../../../../lib/auth";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  let body: { password?: string };
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "invalid_json" }, { status: 400 });
  }

  const password = String(body.password ?? "");
  if (!(await verifyAdminLogin(password))) {
    return Response.json({ error: "invalid_password" }, { status: 401 });
  }

  const token = await createAdminSession();
  const response = Response.json(
    { ok: true },
    { headers: { "cache-control": "private, no-store" } },
  );
  response.headers.append(
    "set-cookie",
    `${ADMIN_COOKIE}=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${7 * 24 * 60 * 60}`,
  );
  return response;
}
