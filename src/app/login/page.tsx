"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AppShell } from "../../components/AppShell";
import { BrandLogo } from "../../components/BrandLogo";

export default function LoginPage() {
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
  }, [router]);

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
      router.push("/profile");
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
        <h1>Sign in</h1>
        <p>Use your email account or Google to open your BimmerWise profile.</p>
      </section>

      <div className="panel form-grid">
        {googleConfigured ? (
          <a className="btn google" href="/api/auth/google">
            Continue with Google
          </a>
        ) : (
          <button
            className="btn google"
            type="button"
            disabled={busy}
            onClick={() => void onSampleGoogle()}
          >
            Continue with Google (sample)
          </button>
        )}

        <div className="auth-divider">
          <span>or sign in with email</span>
        </div>

        <form className="form-grid" onSubmit={onLogin}>
          <label>
            Email
            <input name="email" type="email" required autoComplete="email" />
          </label>
          <label>
            Password
            <input name="password" type="password" required autoComplete="current-password" />
          </label>
          {error ? <p className="error">{error}</p> : null}
          <button className="btn" type="submit" disabled={busy}>
            {busy ? "Signing in…" : "Sign in with email"}
          </button>
        </form>

        <p className="muted" style={{ margin: 0, fontSize: "0.9rem", textAlign: "center" }}>
          New here? <Link href="/register">Create an account</Link>
        </p>
      </div>
    </AppShell>
  );
}
