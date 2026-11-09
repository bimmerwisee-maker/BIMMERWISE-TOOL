"use client";

import { FormEvent, Suspense, useCallback, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  browserSupportsWebAuthn,
  startRegistration,
} from "@simplewebauthn/browser";
import { AppShell } from "../../components/AppShell";
import { ModelPicker } from "../../components/ModelPicker";

type Customer = {
  id: string;
  email: string;
  name: string;
  phone: string;
  avatar_url: string | null;
};

type Vehicle = {
  id: string;
  vin_last7: string;
  registration: string;
  year: string;
  make: string;
  model: string;
  image_url?: string;
};

function ProfileInner() {
  const router = useRouter();
  const search = useSearchParams();
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [loading, setLoading] = useState(true);
  const [passkeyCount, setPasskeyCount] = useState(0);
  const [webauthnOk, setWebauthnOk] = useState(false);
  const [pickerKey, setPickerKey] = useState(0);

  const refresh = useCallback(async () => {
    const res = await fetch("/api/auth/me");
    const data = await res.json();
    setCustomer(data.customer);
    setVehicles(data.vehicles ?? []);
    setPasskeyCount(Number(data.passkeyCount ?? 0));
    setLoading(false);
    if (!data.customer) {
      router.replace("/register");
    }
  }, [router]);

  useEffect(() => {
    setWebauthnOk(browserSupportsWebAuthn());
    void refresh();
    if (search.get("welcome")) setNotice("Signed in successfully.");
    if (search.get("error")) setError("Google sign-in failed. Try again.");
  }, [refresh, search]);

  async function onEnableFingerprint() {
    setBusy(true);
    setError("");
    try {
      const optRes = await fetch("/api/auth/webauthn/register/options", {
        method: "POST",
      });
      if (!optRes.ok) {
        setError("Could not start fingerprint setup.");
        return;
      }
      const options = await optRes.json();
      const attestation = await startRegistration({ optionsJSON: options });
      const verifyRes = await fetch("/api/auth/webauthn/register/verify", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(attestation),
      });
      if (!verifyRes.ok) {
        setError("Fingerprint setup failed. Try again on this device.");
        return;
      }
      await refresh();
      setNotice("Fingerprint login enabled on this device.");
    } catch {
      setError("Fingerprint setup cancelled or unavailable.");
    } finally {
      setBusy(false);
    }
  }

  async function onSaveProfile(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setError("");
    const form = new FormData(event.currentTarget);
    try {
      const res = await fetch("/api/profile", {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          name: form.get("name"),
          phone: form.get("phone"),
        }),
      });
      if (!res.ok) {
        setError("Could not update profile.");
        return;
      }
      await refresh();
      setNotice("Profile updated.");
    } finally {
      setBusy(false);
    }
  }

  async function onAvatar(file: File | null) {
    if (!file) return;
    setBusy(true);
    setError("");
    try {
      const dataUrl = await readFileAsDataUrl(file);
      const [prefix, data_base64] = dataUrl.split(",");
      const mime_type = prefix.match(/data:(.*);base64/)?.[1] ?? file.type;
      const res = await fetch("/api/profile", {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ mime_type, avatar_base64: data_base64 }),
      });
      if (!res.ok) {
        setError("Could not upload photo (max ~1 MB, JPG/PNG/WebP).");
        return;
      }
      await refresh();
      setNotice("Profile photo updated.");
    } finally {
      setBusy(false);
    }
  }

  async function onAddVehicle(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setError("");
    const form = new FormData(event.currentTarget);
    try {
      const res = await fetch("/api/vehicles", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(Object.fromEntries(form.entries())),
      });
      if (!res.ok) {
        setError("Vehicle needs registration, model, and VIN last 7.");
        return;
      }
      const formEl = event.currentTarget;
      formEl.reset();
      setPickerKey((k) => k + 1);
      await refresh();
      setNotice("Vehicle added.");
    } finally {
      setBusy(false);
    }
  }

  async function onLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
  }

  if (loading || !customer) {
    return <p className="muted">Loading profile…</p>;
  }

  return (
    <>
      <section className="hero">
        <p className="eyebrow">Account</p>
        <h1>My profile</h1>
      </section>

      {notice ? <p className="success">{notice}</p> : null}
      {error ? <p className="error">{error}</p> : null}

      <div className="panel">
        <div className="profile-header">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="avatar-preview"
            src={
              customer.avatar_url ||
              "data:image/svg+xml," +
                encodeURIComponent(
                  `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 96 96'><rect fill='#171a1f' width='96' height='96'/><circle fill='#00a0e3' cx='48' cy='38' r='18'/><path fill='#1c69d4' d='M18 86c6-18 20-28 30-28s24 10 30 28'/></svg>`,
                )
            }
            alt=""
          />
          <div>
            <h2>{customer.name}</h2>
            <p className="muted" style={{ margin: "0.2rem 0 0" }}>
              {customer.email}
            </p>
          </div>
        </div>
      </div>

      <form className="panel form-grid section-gap" onSubmit={onSaveProfile}>
        <h3>Details</h3>
        <label>
          Name
          <input name="name" defaultValue={customer.name} required />
        </label>
        <label>
          Phone
          <input name="phone" defaultValue={customer.phone} />
        </label>
        <label>
          Profile picture
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={(e) => void onAvatar(e.target.files?.[0] ?? null)}
          />
        </label>
        <div className="btn-row">
          <button className="btn" type="submit" disabled={busy}>
            Save profile
          </button>
          <button className="btn ghost" type="button" onClick={() => void onLogout()}>
            Sign out
          </button>
        </div>
      </form>

      {webauthnOk ? (
        <div className="panel section-gap form-grid">
          <h3>Fingerprint login</h3>
          <p className="muted" style={{ margin: 0 }}>
            {passkeyCount > 0
              ? `Enabled on ${passkeyCount} device passkey${passkeyCount === 1 ? "" : "s"}. You can add another device.`
              : "Enable Face ID / fingerprint so you can unlock the app without typing a password."}
          </p>
          <button
            className="btn fingerprint"
            type="button"
            disabled={busy}
            onClick={() => void onEnableFingerprint()}
          >
            {passkeyCount > 0 ? "Add fingerprint on this device" : "Enable fingerprint login"}
          </button>
        </div>
      ) : null}

      <div className="panel section-gap">
        <h3>My vehicles</h3>
        {vehicles.length === 0 ? (
          <p className="muted">No vehicles yet. Add one below.</p>
        ) : (
          <div className="vehicle-list">
            {vehicles.map((v) => (
              <div key={v.id} className="vehicle-row vehicle-row-media">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={v.image_url || "/cars/generic.svg"}
                  alt=""
                  className="vehicle-thumb"
                />
                <div>
                  <strong>
                    {v.year} {v.make} {v.model}
                  </strong>
                  <div className="meta">
                    <span>{v.registration}</span>
                    <span>VIN …{v.vin_last7}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <form className="panel form-grid section-gap" onSubmit={onAddVehicle}>
        <h3>Add vehicle</h3>
        <ModelPicker key={pickerKey} resetKey={pickerKey} />
        <label>
          Registration number
          <input name="registration" required maxLength={20} />
        </label>
        <label>
          VIN (last 7 minimum)
          <input name="vin_last7" required minLength={7} maxLength={17} />
        </label>
        <button className="btn" type="submit" disabled={busy}>
          Save vehicle
        </button>
      </form>
    </>
  );
}

export default function ProfilePage() {
  return (
    <AppShell active="profile">
      <Suspense fallback={<p className="muted">Loading profile…</p>}>
        <ProfileInner />
      </Suspense>
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
