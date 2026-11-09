"use client";

import { useEffect, useMemo, useState } from "react";

type ModelOption = {
  id: string;
  series: string;
  name: string;
  body: string;
  yearsFrom: number;
  yearsTo: number | null;
  image: string;
};

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
  const [modelId, setModelId] = useState("");
  const [year, setYear] = useState("");

  useEffect(() => {
    void fetch("/api/models")
      .then((r) => r.json())
      .then((data) => {
        setSeriesList(data.series ?? []);
        setModels(data.models ?? []);
      })
      .catch(() => undefined);
  }, []);

  const filtered = useMemo(
    () => (series ? models.filter((m) => m.series === series) : models),
    [models, series],
  );

  const selected = models.find((m) => m.id === modelId) ?? null;

  const years = useMemo(() => {
    if (!selected) return [];
    const end = selected.yearsTo ?? new Date().getFullYear();
    const list: number[] = [];
    for (let y = end; y >= selected.yearsFrom; y -= 1) list.push(y);
    return list;
  }, [selected]);

  useEffect(() => {
    if (!selected) return;
    if (!year || !years.includes(Number(year))) {
      setYear(String(years[0] ?? selected.yearsFrom));
    }
  }, [selected, year, years]);

  return (
    <div className="form-grid">
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
        Model (EU from 2010)
        <select
          value={modelId}
          onChange={(e) => setModelId(e.target.value)}
          required={required}
          disabled={!series}
        >
          <option value="">Select model</option>
          {filtered.map((m) => (
            <option key={m.id} value={m.id}>
              {m.name} · {m.body}
            </option>
          ))}
        </select>
      </label>

      <label>
        Year
        <select
          name={yearName}
          value={year}
          onChange={(e) => setYear(e.target.value)}
          required={required}
          disabled={!selected}
        >
          <option value="">Select year</option>
          {years.map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>
      </label>

      {selected ? (
        <div className="model-preview">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={selected.image} alt={selected.name} />
          <div>
            <strong>
              {selected.series} {selected.name}
            </strong>
            <span className="muted">
              {selected.body} · {selected.yearsFrom}
              {selected.yearsTo ? `–${selected.yearsTo}` : "+"}
            </span>
          </div>
        </div>
      ) : null}
    </div>
  );
}
