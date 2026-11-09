create table if not exists customers (
  id uuid primary key,
  email text not null unique,
  name text not null,
  phone text not null default '',
  google_sub text unique,
  password_hash text,
  avatar_mime text,
  avatar_base64 text,
  created_at timestamptz not null default now()
);

create index if not exists customers_email_idx on customers (lower(email));

create table if not exists customer_sessions (
  token text primary key,
  customer_id uuid not null references customers(id) on delete cascade,
  created_at timestamptz not null default now(),
  expires_at timestamptz not null
);

create index if not exists customer_sessions_customer_id_idx on customer_sessions (customer_id);

create table if not exists vehicles (
  id uuid primary key,
  customer_id uuid not null references customers(id) on delete cascade,
  vin_last7 text not null,
  registration text not null,
  year text not null default '',
  make text not null default 'BMW',
  model text not null,
  created_at timestamptz not null default now()
);

create index if not exists vehicles_customer_id_idx on vehicles (customer_id);

alter table bookings add column if not exists customer_id uuid references customers(id) on delete set null;
alter table bookings add column if not exists vehicle_id uuid references vehicles(id) on delete set null;
alter table bookings add column if not exists is_guest boolean not null default true;
alter table bookings add column if not exists vin_last7 text not null default '';
alter table bookings alter column status set default 'not_confirmed';

update bookings set status = 'not_confirmed' where status = 'scheduled';
update bookings set status = 'confirmed' where status in ('checked_in');
update bookings set status = 'job_started' where status in ('diagnosing', 'in_progress', 'waiting_parts');
update bookings set status = 'ready_collection' where status = 'ready';
update bookings set status = 'collected' where status = 'completed';

update booking_updates set status = 'not_confirmed' where status = 'scheduled';
update booking_updates set status = 'confirmed' where status in ('checked_in');
update booking_updates set status = 'job_started' where status in ('diagnosing', 'in_progress', 'waiting_parts');
update booking_updates set status = 'ready_collection' where status = 'ready';
update booking_updates set status = 'collected' where status = 'completed';
