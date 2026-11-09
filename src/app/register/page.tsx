"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AppShell } from "../../components/AppShell";
import { BrandLogo } from "../../components/BrandLogo";

export default function RegisterPage() {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [googleConfigured, setGoogleConfigured] = useState(false);

  useEffect(() => {
    void (async () => {
      const res = await fetch("/api/auth/me");
      if (!res.ok) return;
      const data = await res.json();
      setGoogleConfigured(Boolean(data.googleConfigured));
      if (data.customer) router.replace("/profile");
    })();
    const params = new URLSearchParams(window.location.search);
    if (params.get("error")) setError("Google sign-in failed. Try email registration.");
  }, [router]);

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
      router.push("/profile?welcome=1");
    } catch {
      setError("Network error. Try again.");
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
      router.push("/profile?welcome=1");
    } finally {
      setBusy(false);
    }
  }

  return (
    <AppShell active="register">
      <section className="register-hero">
        <BrandLogo size="hero" href={null} />
        <h1>Create your account</h1>
        <p>Register with email or Google to save vehicles and track bay progress.</p>
      </section>

      <div className="panel form-grid">
        {googleConfigured ? (
          <a className="btn google" href="/api/auth/google">
            Continue with Google
          </a>
        ) : (
          <>
            <div className="sample-banner">
              Google sign-in needs OAuth secrets in production. Locally you can use a sample
              Google profile, or register with email below.
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

        <div className="auth-divider">
          <span>or register with email</span>
        </div>

        <form className="form-grid" onSubmit={onRegister}>
          <label>
            Full name
            <input name="name" required maxLength={120} autoComplete="name" />
          </label>
          <label>
            Phone
            <input name="phone" maxLength={40} autoComplete="tel" />
          </label>
          <label>
            Email
            <input
              name="email"
              type="email"
              required
              maxLength={120}
              autoComplete="email"
              placeholder="you@email.com"
            />
          </label>
          <label>
            Password (8+)
            <input
              name="password"
              type="password"
              required
              minLength={8}
              autoComplete="new-password"
            />
          </label>
          {error ? <p className="error">{error}</p> : null}
          <button className="btn" type="submit" disabled={busy}>
            {busy ? "Creating…" : "Register with email"}
          </button>
        </form>

        <p className="muted" style={{ margin: 0, fontSize: "0.9rem", textAlign: "center" }}>
          Already have an account? <Link href="/login">Sign in</Link>
        </p>
      </div>
    </AppShell>
  );
}
