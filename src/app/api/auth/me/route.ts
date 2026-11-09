import { cookies } from "next/headers";
import {
  CUSTOMER_COOKIE,
  getCustomerBySession,
  googleOAuthConfigured,
  listVehicles,
  publicCustomer,
  currentBookingForCustomer,
} from "../../../../lib/customers";
import { vehicleLabel } from "../../../../lib/bookings";
import { bookingProgress } from "../../../../lib/progress";
import { STATUS_LABELS } from "../../../../lib/types";
import { countCredentials } from "../../../../lib/webauthn";

export const dynamic = "force-dynamic";

export async function GET() {
  const jar = await cookies();
  const customer = await getCustomerBySession(jar.get(CUSTOMER_COOKIE)?.value);
  if (!customer) {
    return Response.json(
      { customer: null, googleConfigured: googleOAuthConfigured(), passkeyCount: 0 },
      { headers: { "cache-control": "private, no-store" } },
    );
  }

  const [vehicles, current, passkeyCount] = await Promise.all([
    listVehicles(customer.id),
    currentBookingForCustomer(customer.id),
    countCredentials(customer.id),
  ]);

  let currentBooking = null;
  if (current) {
    const progress = bookingProgress(current.status);
    if (progress.percent !== null) {
      currentBooking = {
        id: current.id,
        code: current.code,
        vehicle: vehicleLabel(current),
        status: current.status,
        status_label: STATUS_LABELS[current.status],
        progress_percent: progress.percent,
        progress_label: progress.label,
      };
    }
  }

  return Response.json(
    {
      customer: publicCustomer(customer),
      vehicles,
      googleConfigured: googleOAuthConfigured(),
      passkeyCount,
      currentBooking,
    },
    { headers: { "cache-control": "private, no-store" } },
  );
}
