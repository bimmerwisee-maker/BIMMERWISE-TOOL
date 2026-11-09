import { adminPasswordConfigured, isAdminRequest } from "../../../../lib/auth";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const admin = await isAdminRequest(request);
  return Response.json(
    {
      admin,
      passwordFallback: !adminPasswordConfigured(),
    },
    { headers: { "cache-control": "private, no-store" } },
  );
}
