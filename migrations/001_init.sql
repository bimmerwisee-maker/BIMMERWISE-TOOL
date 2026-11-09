create table if not exists bookings (
  id uuid primary key,
  code text not null unique,
  customer_name text not null,
  customer_phone text not null default '',
  customer_email text not null default '',
  vehicle_year text not null default '',
  vehicle_make text not null,
  vehicle_model text not null,
  vehicle_plate text not null default '',
  service_type text not null,
  customer_notes text not null default '',
  status text not null default 'scheduled',
  scheduled_at timestamptz,
  created_at timestamptz not null default now()
);

create index if not exists bookings_code_idx on bookings (code);
create index if not exists bookings_created_at_idx on bookings (created_at desc);

create table if not exists booking_updates (
  id uuid primary key,
  booking_id uuid not null references bookings(id) on delete cascade,
  message text not null,
  status text not null,
  created_by text not null default 'shop',
  created_at timestamptz not null default now()
);

create index if not exists booking_updates_booking_id_idx on booking_updates (booking_id, created_at desc);

create table if not exists vehicle_photos (
  id uuid primary key,
  booking_id uuid not null references bookings(id) on delete cascade,
  caption text not null default '',
  mime_type text not null,
  data_base64 text not null,
  created_at timestamptz not null default now()
);

create index if not exists vehicle_photos_booking_id_idx on vehicle_photos (booking_id, created_at desc);

create table if not exists admin_sessions (
  token text primary key,
  created_at timestamptz not null default now(),
  expires_at timestamptz not null
);
