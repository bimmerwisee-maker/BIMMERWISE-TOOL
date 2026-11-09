// JS twin so Turbopack can resolve identity.ts's "./identity.dev.js" import locally.
// Keep in sync with identity.dev.ts. Do not put a real person's identity here.

export const DEV_VIEWER = {
  sub: "user:dev",
  email: "dev@example.com",
  name: "Dev Viewer",
  teamId: 1,
  teamRole: "admin",
};
