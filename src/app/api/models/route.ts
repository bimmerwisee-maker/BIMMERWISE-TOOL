import { BMW_MODELS, BMW_SERIES } from "../../../lib/bmw-models";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const series = url.searchParams.get("series")?.trim() ?? "";
  const models = series
    ? BMW_MODELS.filter((m) => m.series === series)
    : BMW_MODELS;
  return Response.json(
    { series: BMW_SERIES, models },
    { headers: { "cache-control": "public, max-age=3600" } },
  );
}
