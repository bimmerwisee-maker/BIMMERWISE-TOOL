import {
  adminLoginAvailable,
  adminSetCookie,
  createAdminSession,
  verifyAdminLogin,
} from "../../../../lib/auth";
import { clientKey, takeToken } from "../../../../lib/rate-limit";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const limited = takeToken(`admin-login:${clientKey(request)}`, 10, 60_000);
  if (!limited.ok) {
    return Response.json(
      { error: "rate_limited" },
      {
        status: 429,
        headers: {
          "retry-after": String(limited.retryAfterSec),
          "cache-control": "private, no-store",
        },
      },
    );
  }

  if (!(await adminLoginAvailable())) {
    return Response.json(
      { error: "password_not_configured" },
      { status: 503, headers: { "cache-control": "private, no-store" } },
    );
  }

  let body: { email?: string; password?: string };
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "invalid_json" }, { status: 400 });
  }

  const email = String(body.email ?? "").trim();
  const password = String(body.password ?? "");
  if (
    !(await verifyAdminLogin({
      email: email || "info@bimmerwise.com",
      password,
    }))
  ) {
    return Response.json({ error: "invalid_password" }, { status: 401 });
  }

  const token = await createAdminSession();
  const response = Response.json(
    { ok: true },
    { headers: { "cache-control": "private, no-store" } },
  );
  response.headers.append("set-cookie", adminSetCookie(token));
  return response;
}
