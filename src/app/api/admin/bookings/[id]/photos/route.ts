import { addPhoto, getBookingById } from "../../../../../../lib/bookings";
import { requireAdmin } from "../../../../../../lib/auth";

export const dynamic = "force-dynamic";

const ALLOWED_MIME = new Set(["image/jpeg", "image/png", "image/webp"]);
const MAX_BYTES = 1_500_000;

export async function POST(
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
  const auth = await requireAdmin(request);
  if (auth instanceof Response) return auth;

  const { id } = await context.params;
  const booking = await getBookingById(id);
  if (!booking) {
    return Response.json({ error: "not_found" }, { status: 404 });
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "invalid_json" }, { status: 400 });
  }

  const caption = String(body.caption ?? "")
    .trim()
    .slice(0, 240);
  const mimeType = String(body.mime_type ?? "").trim();
  const dataBase64 = String(body.data_base64 ?? "").replace(/\s+/g, "");

  if (!ALLOWED_MIME.has(mimeType) || !dataBase64) {
    return Response.json({ error: "invalid_image" }, { status: 400 });
  }

  const approxBytes = Math.floor((dataBase64.length * 3) / 4);
  if (approxBytes > MAX_BYTES) {
    return Response.json({ error: "image_too_large" }, { status: 413 });
  }

  const photo = await addPhoto({
    bookingId: booking.id,
    caption,
    mimeType,
    dataBase64,
  });

  return Response.json(
    {
      photo: {
        id: photo.id,
        caption: photo.caption,
        mime_type: photo.mime_type,
        data_url: `data:${photo.mime_type};base64,${photo.data_base64}`,
        created_at: photo.created_at,
      },
    },
    { status: 201, headers: { "cache-control": "private, no-store" } },
  );
}
