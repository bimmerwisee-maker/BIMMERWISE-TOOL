# BimmerWise Booking

Mobile-first service booking app (works on Android & iOS browsers; add to Home Screen for an app-like feel):

- Customers register (Google or email), save vehicles (VIN last 7, registration, year/model), or book as a guest
- Home shows current booking progress (0→100%) only when a job is active
- Shop admins post status updates and upload inspection photos

## Progress steps

| % | Status |
|---|--------|
| 0 | Booking not confirmed |
| 25 | Booking confirmed |
| 50 | Job started |
| 75 | Ready for collection |
| 100 | Car collected |

## Local development

```bash
env -u DATABASE_URL npm run dev
```

- Sample Google sign-in is available locally when Google OAuth secrets are unset
- Password admin login only works when `BOOKING_ADMIN_PASSWORD` is set
- Simulated Cursor team admins can open the shop console

## Publish notes

Set secrets: `BOOKING_ADMIN_PASSWORD`, `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`.
Publish as **public** so customers can book without Cursor accounts.
