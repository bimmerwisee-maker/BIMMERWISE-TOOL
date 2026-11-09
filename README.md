# BimmerWise Booking

Mobile-first service booking app for the shop:

- Customers book service and track live updates with a booking code plus email
- Shop admins post status updates and upload vehicle inspection photos

## Local development

```bash
env -u DATABASE_URL npm run dev
```

Open [http://127.0.0.1:3000](http://127.0.0.1:3000).

Locally, the simulated Cursor team admin can open the shop console without a password.
Password login only works when `BOOKING_ADMIN_PASSWORD` is set.

## Publish notes

- Declare Postgres via `cursor-app.json` / `migrations/`
- Set app secret `BOOKING_ADMIN_PASSWORD` for password-based shop login
- Publish as **public** so customers can book and track without Cursor accounts
- Cursor team admins are also admitted to the shop console when identity is present
