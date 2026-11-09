"use client";

import { useEffect, useMemo, useState } from "react";
import type { FuelType } from "../lib/bmw-models";

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

const FUELS: FuelType[] = ["Petrol", "Diesel", "Plugin Hybrid", "Electric"];

export function ModelPicker({
  yearName = "year",
  modelSlugName = "model_slug",
  modelName = "model",
  makeName = "make",
  required = true,
}: {
  yearName?: string;
  modelSlugName?: string;
  modelName?: string;
  makeName?: string;
  required?: boolean;
}) {
  const [seriesList, setSeriesList] = useState<string[]>([]);
  const [models, setModels] = useState<ModelOption[]>([]);
  const [series, setSeries] = useState("");
  const [year, setYear] = useState("");
  const [fuel, setFuel] = useState<FuelType | "">("");
  const [modelId, setModelId] = useState("");

  useEffect(() => {
    void fetch("/api/models")
      .then((r) => r.json())
      .then((data) => {
        setSeriesList(data.series ?? []);
        setModels(data.models ?? []);
      })
      .catch(() => undefined);
  }, []);

  const seriesModels = useMemo(
    () => models.filter((m) => m.series === series),
    [models, series],
  );

  const years = useMemo(() => {
    if (!seriesModels.length) return [] as number[];
    const from = Math.min(...seriesModels.map((m) => m.yearsFrom));
    const to = Math.max(
      ...seriesModels.map((m) => m.yearsTo ?? new Date().getFullYear()),
    );
    const list: number[] = [];
    for (let y = to; y >= from; y -= 1) list.push(y);
    return list;
  }, [seriesModels]);

  const yearModels = useMemo(() => {
    if (!year) return [] as ModelOption[];
    const y = Number(year);
    return seriesModels.filter(
      (m) => m.yearsFrom <= y && (m.yearsTo == null || m.yearsTo >= y),
    );
  }, [seriesModels, year]);

  const fuels = useMemo(() => {
    const available = new Set(yearModels.map((m) => m.fuel));
    return FUELS.filter((f) => available.has(f));
  }, [yearModels]);

  const filtered = useMemo(() => {
    if (!fuel) return [] as ModelOption[];
    return yearModels.filter((m) => m.fuel === fuel);
  }, [yearModels, fuel]);

  const selected = models.find((m) => m.id === modelId) ?? null;

  const previewImage =
    selected?.image ||
    filtered[0]?.image ||
    yearModels[0]?.image ||
    seriesModels[0]?.image ||
    "";

  useEffect(() => {
    if (!series) return;
    if (year && !years.includes(Number(year))) setYear("");
  }, [series, year, years]);

  useEffect(() => {
    if (!fuel) return;
    if (!fuels.includes(fuel as FuelType)) {
      setFuel("");
      setModelId("");
    }
  }, [fuel, fuels]);

  useEffect(() => {
    if (!modelId) return;
    if (!filtered.some((m) => m.id === modelId)) setModelId("");
  }, [filtered, modelId]);

  return (
    <div className="form-grid model-picker">
      <input type="hidden" name={makeName} value="BMW" />
      <input type="hidden" name={modelSlugName} value={modelId} />
      <input
        type="hidden"
        name={modelName}
        value={selected ? `${selected.series} ${selected.name}` : ""}
      />

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
          disabled={!series}
        >
          <option value="">Select year</option>
          {years.map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>
      </label>

      <label>
        Fuel type
        <select
          value={fuel}
          onChange={(e) => {
            setFuel(e.target.value as FuelType | "");
            setModelId("");
          }}
          required={required}
          disabled={!year}
        >
          <option value="">Petrol / Diesel / PHEV / Electric</option>
          {fuels.map((f) => (
            <option key={f} value={f}>
              {f}
            </option>
          ))}
        </select>
      </label>

      <label>
        Model
        <select
          value={modelId}
          onChange={(e) => setModelId(e.target.value)}
          required={required}
          disabled={!fuel}
        >
          <option value="">Select model</option>
          {filtered.map((m) => (
            <option key={m.id} value={m.id}>
              {m.name} · {m.body}
            </option>
          ))}
        </select>
      </label>

      {previewImage ? (
        <div className="model-preview">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={previewImage} alt={selected?.name || series || "BMW"} />
          <div>
            <strong>
              {selected
                ? `${selected.series} ${selected.name}`
                : series || "BMW"}
            </strong>
            <span className="muted">
              {selected
                ? `${selected.fuel} · ${selected.body}`
                : fuel || year || "Pick series, year, fuel, then model"}
            </span>
          </div>
        </div>
      ) : null}
    </div>
  );
}
