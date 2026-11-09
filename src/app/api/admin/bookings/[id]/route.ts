import {
  addUpdate,
  getBookingById,
  listPhotos,
  listUpdates,
  vehicleLabel,
} from "../../../../../lib/bookings";
import { requireAdmin } from "../../../../../lib/auth";
import { STATUS_LABELS, isValidStatus } from "../../../../../lib/types";

export const dynamic = "force-dynamic";

function clean(value: unknown, max = 1000): string {
  return String(value ?? "")
    .trim()
    .slice(0, max);
}

export async function GET(
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

  const [updates, photos] = await Promise.all([
    listUpdates(booking.id),
    listPhotos(booking.id),
  ]);

  return Response.json(
    {
      booking: {
        ...booking,
        vehicle: vehicleLabel(booking),
        status_label: STATUS_LABELS[booking.status],
      },
      updates,
      photos: photos.map((p) => ({
        id: p.id,
        caption: p.caption,
        mime_type: p.mime_type,
        data_url: `data:${p.mime_type};base64,${p.data_base64}`,
        created_at: p.created_at,
      })),
    },
    { headers: { "cache-control": "private, no-store" } },
  );
}

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

  const message = clean(body.message, 1000);
  const status = clean(body.status, 40);
  if (!message || !isValidStatus(status)) {
    return Response.json({ error: "invalid_update" }, { status: 400 });
  }

  const update = await addUpdate({
    bookingId: booking.id,
    message,
    status,
    createdBy: "shop",
  });

  return Response.json(
    { update },
    { status: 201, headers: { "cache-control": "private, no-store" } },
  );
}
