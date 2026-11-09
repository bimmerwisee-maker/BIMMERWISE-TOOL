import { cookies } from "next/headers";
import {
  createCustomerSession,
  customerSetCookie,
  upsertGoogleCustomer,
} from "../../../../../lib/customers";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const jar = await cookies();
  const expected = jar.get("bw_oauth_state")?.value;

  if (!code || !state || !expected || state !== expected) {
    return Response.redirect(new URL("/profile?error=oauth", url.origin), 302);
  }

  const origin = `${url.protocol}//${url.host}`;
  const redirectUri = `${origin}/api/auth/google/callback`;

  const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      code,
      client_id: process.env.GOOGLE_CLIENT_ID!.trim(),
      client_secret: process.env.GOOGLE_CLIENT_SECRET!.trim(),
      redirect_uri: redirectUri,
      grant_type: "authorization_code",
    }),
  });

  if (!tokenRes.ok) {
    return Response.redirect(new URL("/profile?error=token", url.origin), 302);
  }

  const tokenJson = (await tokenRes.json()) as { access_token?: string };
  if (!tokenJson.access_token) {
    return Response.redirect(new URL("/profile?error=token", url.origin), 302);
  }

  const profileRes = await fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
    headers: { authorization: `Bearer ${tokenJson.access_token}` },
  });
  if (!profileRes.ok) {
    return Response.redirect(new URL("/profile?error=profile", url.origin), 302);
  }

  const profile = (await profileRes.json()) as {
    id?: string;
    email?: string;
    name?: string;
    picture?: string;
  };

  if (!profile.id || !profile.email) {
    return Response.redirect(new URL("/profile?error=profile", url.origin), 302);
  }

  const customer = await upsertGoogleCustomer({
    email: profile.email,
    name: profile.name || "Customer",
    googleSub: profile.id,
    avatarUrl: profile.picture,
  });

  const session = await createCustomerSession(customer.id);
  const response = Response.redirect(new URL("/profile?welcome=1", url.origin), 302);
  response.headers.append("set-cookie", customerSetCookie(session));
  response.headers.append(
    "set-cookie",
    [
      "bw_oauth_state=",
      "Path=/",
      "HttpOnly",
      "SameSite=Lax",
      "Max-Age=0",
      process.env.NODE_ENV === "production" ? "Secure" : "",
    ]
      .filter(Boolean)
      .join("; "),
  );
  return response;
}
