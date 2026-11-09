import { randomBytes } from "node:crypto";
import { googleOAuthConfigured } from "../../../../lib/customers";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  if (!googleOAuthConfigured()) {
    return Response.json({ error: "google_not_configured" }, { status: 503 });
  }

  const url = new URL(request.url);
  const origin = `${url.protocol}//${url.host}`;
  const state = randomBytes(16).toString("hex");
  const redirectUri = `${origin}/api/auth/google/callback`;

  const params = new URLSearchParams({
    client_id: process.env.GOOGLE_CLIENT_ID!.trim(),
    redirect_uri: redirectUri,
    response_type: "code",
    scope: "openid email profile",
    access_type: "online",
    prompt: "select_account",
    state,
  });

  const response = Response.redirect(
    `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`,
    302,
  );
  response.headers.append(
    "set-cookie",
    [
      `bw_oauth_state=${state}`,
      "Path=/",
      "HttpOnly",
      "SameSite=Lax",
      "Max-Age=600",
      process.env.NODE_ENV === "production" ? "Secure" : "",
    ]
      .filter(Boolean)
      .join("; "),
  );
  return response;
}
