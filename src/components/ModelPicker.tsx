"use client";

import { useEffect, useMemo, useState } from "react";

type FuelType = "Petrol" | "Diesel" | "Plugin Hybrid" | "Electric";

type ModelOption = {
  id: string;
  series: string;
  name: string;
  body: string;
  yearsFrom: number;
  yearsTo: number | null;
  fuel: FuelType;
  image: string;
};

const ALL_FUELS: FuelType[] = [
  "Petrol",
  "Diesel",
  "Plugin Hybrid",
  "Electric",
];

const FUEL_LABEL: Record<FuelType, string> = {
  Petrol: "Petrol",
  Diesel: "Diesel",
  "Plugin Hybrid": "PHEV",
  Electric: "Electric",
};

export function ModelPicker({
  yearName = "year",
  modelSlugName = "model_slug",
  modelName = "model",
  makeName = "make",
  required = true,
  resetKey = 0,
}: {
  yearName?: string;
  modelSlugName?: string;
  modelName?: string;
  makeName?: string;
  required?: boolean;
  resetKey?: number;
}) {
  const [seriesList, setSeriesList] = useState<string[]>([]);
  const [models, setModels] = useState<ModelOption[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [series, setSeries] = useState("");
  const [year, setYear] = useState("");
  const [fuel, setFuel] = useState<FuelType | "">("");
  const [modelId, setModelId] = useState("");
  const [imgOk, setImgOk] = useState(true);

  useEffect(() => {
    let alive = true;
    void fetch("/api/models")
      .then((r) => r.json())
      .then((data) => {
        if (!alive) return;
        setSeriesList(Array.isArray(data.series) ? data.series : []);
        setModels(Array.isArray(data.models) ? data.models : []);
        setLoaded(true);
      })
      .catch(() => {
        if (!alive) return;
        setLoaded(true);
      });
    return () => {
      alive = false;
    };
  }, []);

  useEffect(() => {
    setSeries("");
    setYear("");
    setFuel("");
    setModelId("");
    setImgOk(true);
  }, [resetKey]);

  const seriesModels = useMemo(
    () => (series ? models.filter((m) => m.series === series) : []),
    [models, series],
  );

  const years = useMemo(() => {
    if (!seriesModels.length) return [] as number[];
    const from = Math.min(...seriesModels.map((m) => Number(m.yearsFrom)));
    const to = Math.max(
      ...seriesModels.map((m) =>
        m.yearsTo == null ? new Date().getFullYear() : Number(m.yearsTo),
      ),
    );
    const list: number[] = [];
    for (let y = to; y >= from; y -= 1) list.push(y);
    return list;
  }, [seriesModels]);

  const yearNum = year ? Number(year) : NaN;

  const yearModels = useMemo(() => {
    if (!Number.isFinite(yearNum)) return [] as ModelOption[];
    return seriesModels.filter((m) => {
      const from = Number(m.yearsFrom);
      const to = m.yearsTo == null ? Infinity : Number(m.yearsTo);
      return from <= yearNum && yearNum <= to;
    });
  }, [seriesModels, yearNum]);

  const fuels = useMemo(() => {
    const available = new Set(yearModels.map((m) => m.fuel));
    return ALL_FUELS.filter((f) => available.has(f));
  }, [yearModels]);

  // Keep fuel only when it is still valid for the chosen year.
  useEffect(() => {
    if (fuel && fuels.length > 0 && !fuels.includes(fuel)) {
      setFuel("");
      setModelId("");
    }
  }, [fuel, fuels]);

  const filtered = useMemo(() => {
    if (!fuel) return [] as ModelOption[];
    return yearModels.filter((m) => m.fuel === fuel);
  }, [yearModels, fuel]);

  const selected = useMemo(
    () => models.find((m) => m.id === modelId) ?? null,
    [models, modelId],
  );

  const previewImage =
    selected?.image ||
    filtered[0]?.image ||
    yearModels[0]?.image ||
    seriesModels[0]?.image ||
    "";

  useEffect(() => {
    setImgOk(true);
  }, [previewImage]);

  return (
    <div className="form-grid model-picker">
      <input type="hidden" name={makeName} value="BMW" />
      <input type="hidden" name={modelSlugName} value={modelId} />
      <input
        type="hidden"
        name={modelName}
        value={selected ? `${selected.series} ${selected.name}` : ""}
      />
      {/* Hidden field so required fuel is part of native form validation. */}
      <input type="hidden" name="fuel_type" value={fuel} required={required} />

      {!loaded ? <p className="muted">Loading BMW models…</p> : null}

      <label>
        Series
        <select
          value={series}
          onChange={(e) => {
            setSeries(e.target.value);
            setYear("");
            setFuel("");
            setModelId("");
          }}
          required={required}
        >
          <option value="">Select series</option>
          {seriesList.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </label>

      <label>
        Year
        <select
          name={yearName}
          value={year}
          onChange={(e) => {
            setYear(e.target.value);
            setFuel("");
            setModelId("");
          }}
          required={required}
          disabled={!series || years.length === 0}
        >
          <option value="">Select year</option>
          {years.map((y) => (
            <option key={y} value={String(y)}>
              {y}
            </option>
          ))}
        </select>
      </label>

      <fieldset className="fuel-fieldset" disabled={!year || fuels.length === 0}>
        <legend>Fuel type</legend>
        <div className="fuel-chips" role="group" aria-label="Fuel type">
          {ALL_FUELS.map((f) => {
            const available = fuels.includes(f);
            const active = fuel === f;
            return (
              <button
                key={f}
                type="button"
                className={`fuel-chip${active ? " active" : ""}`}
                disabled={!year || !available}
                aria-pressed={active}
                onClick={() => {
                  setFuel(f);
                  setModelId("");
                }}
              >
                {FUEL_LABEL[f]}
              </button>
            );
          })}
        </div>
        {!year ? (
          <p className="muted fuel-hint">Select a year first</p>
        ) : fuels.length === 0 ? (
          <p className="muted fuel-hint">No fuel types for this year</p>
        ) : !fuel ? (
          <p className="muted fuel-hint">Choose petrol, diesel, PHEV or electric</p>
        ) : null}
      </fieldset>

      <label>
        Model
        <select
          value={modelId}
          onChange={(e) => setModelId(e.target.value)}
          required={required}
          disabled={!fuel || filtered.length === 0}
        >
          <option value="">
            {!fuel
              ? "Select fuel type first"
              : filtered.length === 0
                ? "No models for this fuel"
                : "Select model"}
          </option>
          {filtered.map((m) => (
            <option key={m.id} value={m.id}>
              {m.name} · {m.body}
            </option>
          ))}
        </select>
      </label>

      <div className={`model-preview${previewImage ? "" : " empty"}`}>
        {previewImage ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              key={previewImage}
              src={previewImage}
              alt={selected?.name || series || "BMW"}
              onLoad={() => setImgOk(true)}
              onError={() => setImgOk(false)}
            />
            {!imgOk ? (
              <p className="error">Could not load model photo.</p>
            ) : null}
          </>
        ) : (
          <div className="model-preview-placeholder" aria-hidden>
            BMW
          </div>
        )}
        <div>
          <strong>
            {selected
              ? `${selected.series} ${selected.name}`
              : series || "Your BMW"}
          </strong>
          <span className="muted">
            {selected
              ? `${selected.fuel} · ${year} · ${selected.body}`
              : [year, fuel].filter(Boolean).join(" · ") ||
                "Series → year → fuel → model"}
          </span>
        </div>
      </div>
    </div>
  );
}
