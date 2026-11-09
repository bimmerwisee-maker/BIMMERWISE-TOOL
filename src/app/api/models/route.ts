import { BMW_MODELS, BMW_SERIES, FUEL_TYPES } from "../../../lib/bmw-models";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const series = url.searchParams.get("series")?.trim() ?? "";
  const year = Number(url.searchParams.get("year") || "");
  const fuel = url.searchParams.get("fuel")?.trim() ?? "";

  let models = BMW_MODELS;
  if (series) models = models.filter((m) => m.series === series);
  if (year) {
    models = models.filter(
      (m) => m.yearsFrom <= year && (m.yearsTo == null || m.yearsTo >= year),
    );
  }
  if (fuel) models = models.filter((m) => m.fuel === fuel);

  return Response.json(
    { series: BMW_SERIES, fuels: FUEL_TYPES, models },
    { headers: { "cache-control": "public, max-age=3600" } },
  );
}
