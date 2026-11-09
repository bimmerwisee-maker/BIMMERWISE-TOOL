"use client";

import { FormEvent, Suspense, useCallback, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { AppShell } from "../../components/AppShell";

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
};

function ProfileInner() {
  const search = useSearchParams();
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [googleConfigured, setGoogleConfigured] = useState(false);
  const [authMode, setAuthMode] = useState<"register" | "login">("register");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  const refresh = useCallback(async () => {
    const res = await fetch("/api/auth/me");
    const data = await res.json();
    setCustomer(data.customer);
    setVehicles(data.vehicles ?? []);
    setGoogleConfigured(Boolean(data.googleConfigured));
  }, []);

  useEffect(() => {
    void refresh();
    if (search.get("welcome")) setNotice("Signed in successfully.");
    if (search.get("error")) setError("Google sign-in failed. Try again.");
  }, [refresh, search]);

  async function onRegister(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setError("");
    const form = new FormData(event.currentTarget);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(Object.fromEntries(form.entries())),
      });
      if (res.status === 409) {
        setError("That email is already registered. Sign in instead.");
        return;
      }
      if (!res.ok) {
        setError("Could not register. Use a valid email and 8+ character password.");
        return;
      }
      await refresh();
      setNotice("Account created.");
    } finally {
      setBusy(false);
    }
  }

  async function onLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setError("");
    const form = new FormData(event.currentTarget);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(Object.fromEntries(form.entries())),
      });
      if (!res.ok) {
        setError("Wrong email or password.");
        return;
      }
      await refresh();
    } finally {
      setBusy(false);
    }
  }

  async function onSampleGoogle() {
    setBusy(true);
    setError("");
    try {
      const res = await fetch("/api/auth/sample-google", { method: "POST" });
      if (!res.ok) {
        setError("Sample Google sign-in is only available in local development.");
        return;
      }
      await refresh();
      setNotice("Signed in with sample Google profile.");
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
      (event.target as HTMLFormElement).reset();
      await refresh();
      setNotice("Vehicle added.");
    } finally {
      setBusy(false);
    }
  }

  async function onLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    await refresh();
    setNotice("Signed out.");
  }

  if (!customer) {
    return (
      <>
        <section className="hero">
          <p className="eyebrow">Account</p>
          <h1>My profile</h1>
          <p>Register with Google or email to save vehicles and follow bay progress on Home.</p>
        </section>

        <div className="panel form-grid">
          {googleConfigured ? (
            <a className="btn google" href="/api/auth/google">
              Continue with Google
            </a>
          ) : (
            <>
              <div className="sample-banner">
                Google sign-in needs Google OAuth secrets in production. Locally you can use a
                sample Google profile, or register with email.
              </div>
              <button
                className="btn google"
                type="button"
                disabled={busy}
                onClick={() => void onSampleGoogle()}
              >
                Continue with Google (sample)
              </button>
            </>
          )}

          <div className="segmented">
            <button
              type="button"
              className={authMode === "register" ? "active" : undefined}
              onClick={() => setAuthMode("register")}
            >
              Register
            </button>
            <button
              type="button"
              className={authMode === "login" ? "active" : undefined}
              onClick={() => setAuthMode("login")}
            >
              Sign in
            </button>
          </div>

          {authMode === "register" ? (
            <form className="form-grid" onSubmit={onRegister}>
              <label>
                Name
                <input name="name" required maxLength={120} />
              </label>
              <label>
                Phone
                <input name="phone" maxLength={40} />
              </label>
              <label>
                Email
                <input name="email" type="email" required maxLength={120} />
              </label>
              <label>
                Password (8+)
                <input name="password" type="password" required minLength={8} />
              </label>
              {error ? <p className="error">{error}</p> : null}
              <button className="btn" type="submit" disabled={busy}>
                Create account
              </button>
            </form>
          ) : (
            <form className="form-grid" onSubmit={onLogin}>
              <label>
                Email
                <input name="email" type="email" required />
              </label>
              <label>
                Password
                <input name="password" type="password" required />
              </label>
              {error ? <p className="error">{error}</p> : null}
              <button className="btn" type="submit" disabled={busy}>
                Sign in
              </button>
            </form>
          )}
        </div>
      </>
    );
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

      <div className="panel section-gap">
        <h3>My vehicles</h3>
        {vehicles.length === 0 ? (
          <p className="muted">No vehicles yet. Add one below.</p>
        ) : (
          <div className="vehicle-list">
            {vehicles.map((v) => (
              <div key={v.id} className="vehicle-row">
                <strong>
                  {v.year} {v.make} {v.model}
                </strong>
                <div className="meta">
                  <span>{v.registration}</span>
                  <span>VIN …{v.vin_last7}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <form className="panel form-grid section-gap" onSubmit={onAddVehicle}>
        <h3>Add vehicle</h3>
        <div className="form-grid two">
          <label>
            Year
            <input name="year" maxLength={8} placeholder="2021" />
          </label>
          <label>
            Make
            <input name="make" defaultValue="BMW" maxLength={40} />
          </label>
        </div>
        <label>
          Model
          <input name="model" required maxLength={80} placeholder="M2" />
        </label>
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
