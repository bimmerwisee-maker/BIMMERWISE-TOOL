"use client";

import { FormEvent, useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { AppShell } from "../../../../components/AppShell";
import { StatusBadge } from "../../../../components/StatusBadge";
import { BOOKING_STATUSES, STATUS_LABELS, type BookingStatus } from "../../../../lib/types";

type Detail = {
  booking: {
    id: string;
    code: string;
    customer_name: string;
    customer_phone: string;
    customer_email: string;
    vehicle: string;
    vehicle_plate: string;
    service_type: string;
    customer_notes: string;
    status: BookingStatus;
    status_label: string;
  };
  updates: Array<{
    id: string;
    message: string;
    status: BookingStatus;
    created_at: string;
  }>;
  photos: Array<{
    id: string;
    caption: string;
    data_url: string;
    created_at: string;
  }>;
};

export default function AdminBookingPage() {
  const params = useParams<{ id: string }>();
  const id = params.id;
  const [detail, setDetail] = useState<Detail | null>(null);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<BookingStatus>("not_confirmed");
  const [caption, setCaption] = useState("");
  const [busy, setBusy] = useState(false);

  const load = useCallback(async () => {
    setError("");
    const res = await fetch(`/api/admin/bookings/${id}`);
    if (res.status === 401) {
      setError("Sign in from the shop console first.");
      setDetail(null);
      return;
    }
    if (!res.ok) {
      setError("Booking not found.");
      return;
    }
    const json = (await res.json()) as Detail;
    setDetail(json);
    setStatus(json.booking.status);
  }, [id]);

  useEffect(() => {
    void load();
  }, [load]);

  async function postUpdate(event: FormEvent) {
    event.preventDefault();
    setBusy(true);
    setError("");
    try {
      const res = await fetch(`/api/admin/bookings/${id}`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ message, status }),
      });
      if (!res.ok) {
        setError("Could not post update.");
        return;
      }
      setMessage("");
      await load();
    } finally {
      setBusy(false);
    }
  }

  async function onPhotoSelected(file: File | null) {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setError("Choose a JPEG, PNG, or WebP image.");
      return;
    }
    setBusy(true);
    setError("");
    try {
      const dataUrl = await readFileAsDataUrl(file);
      const [prefix, data_base64] = dataUrl.split(",");
      const mime_type = prefix.match(/data:(.*);base64/)?.[1] ?? file.type;
      const res = await fetch(`/api/admin/bookings/${id}/photos`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          caption,
          mime_type,
          data_base64,
        }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        setError(err.error === "image_too_large" ? "Image too large (max ~1.5 MB)." : "Upload failed.");
        return;
      }
      setCaption("");
      await load();
    } finally {
      setBusy(false);
    }
  }

  return (
    <AppShell active="admin">
      <div className="btn-row" style={{ marginBottom: "0.5rem" }}>
        <Link className="btn secondary" href="/admin">
          ← All bookings
        </Link>
      </div>

      {error && !detail ? <p className="error">{error}</p> : null}

      {detail ? (
        <>
          <section className="hero">
            <div className="code-chip">{detail.booking.code}</div>
            <h1>{detail.booking.vehicle}</h1>
            <p>
              {detail.booking.customer_name}
              {detail.booking.vehicle_plate ? ` · ${detail.booking.vehicle_plate}` : ""}
              {" · "}
              {detail.booking.service_type}
            </p>
            <div style={{ marginTop: "0.75rem" }}>
              <StatusBadge status={detail.booking.status} />
            </div>
          </section>

          {detail.booking.customer_notes ? (
            <div className="panel">
              <h3>Customer notes</h3>
              <p style={{ margin: 0 }}>{detail.booking.customer_notes}</p>
            </div>
          ) : null}

          <form className="panel form-grid section-gap" onSubmit={postUpdate}>
            <h3>Post update</h3>
            <label>
              Status
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as BookingStatus)}
              >
                {BOOKING_STATUSES.map((value) => (
                  <option key={value} value={value}>
                    {STATUS_LABELS[value]}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Message to customer
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                maxLength={1000}
                placeholder="Found worn front pads. Recommending replacement today."
              />
            </label>
            <div className="btn-row">
              <button className="btn" type="submit" disabled={busy}>
                {busy ? "Saving…" : "Send update"}
              </button>
            </div>
          </form>

          <div className="panel section-gap form-grid">
            <h3>Upload vehicle photo</h3>
            <label>
              Caption / what&apos;s wrong
              <input
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                maxLength={240}
                placeholder="Rust on brake line fitting"
              />
            </label>
            <label>
              Photo
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={(e) => void onPhotoSelected(e.target.files?.[0] ?? null)}
                disabled={busy}
              />
            </label>
            {error ? <p className="error">{error}</p> : null}
          </div>

          <div className="panel section-gap">
            <h3>Timeline</h3>
            <div className="timeline">
              {detail.updates.map((update) => (
                <article key={update.id} className="timeline-item">
                  <time dateTime={update.created_at}>
                    {new Date(update.created_at).toLocaleString()} ·{" "}
                    {STATUS_LABELS[update.status]}
                  </time>
                  <p style={{ margin: 0 }}>{update.message}</p>
                </article>
              ))}
            </div>
          </div>

          {detail.photos.length > 0 ? (
            <div className="panel section-gap">
              <h3>Photos</h3>
              <div className="photo-grid">
                {detail.photos.map((photo) => (
                  <figure key={photo.id} className="photo-card">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={photo.data_url} alt={photo.caption || "Vehicle photo"} />
                    <figcaption>{photo.caption || "Shop photo"}</figcaption>
                  </figure>
                ))}
              </div>
            </div>
          ) : null}
        </>
      ) : null}
    </AppShell>
  );
}

function readFileAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}
