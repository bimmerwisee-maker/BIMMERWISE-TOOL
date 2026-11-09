import { getBookingByCode, listPhotos, listUpdates, vehicleLabel } from "../../../lib/bookings";
import { STATUS_LABELS } from "../../../lib/types";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const code = new URL(request.url).searchParams.get("code")?.trim() ?? "";
  if (!code || code.length > 32) {
    return Response.json({ error: "missing_code" }, { status: 400 });
  }

  const booking = await getBookingByCode(code);
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
        code: booking.code,
        customer_name: booking.customer_name,
        vehicle: vehicleLabel(booking),
        vehicle_plate: booking.vehicle_plate,
        service_type: booking.service_type,
        status: booking.status,
        status_label: STATUS_LABELS[booking.status],
        scheduled_at: booking.scheduled_at,
        created_at: booking.created_at,
      },
      updates: updates.map((u) => ({
        id: u.id,
        message: u.message,
        status: u.status,
        status_label: STATUS_LABELS[u.status],
        created_at: u.created_at,
      })),
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
