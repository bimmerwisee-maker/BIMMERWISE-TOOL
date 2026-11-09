alter table vehicles add column if not exists model_slug text not null default '';

create table if not exists admin_users (
  id uuid primary key,
  email text not null unique,
  name text not null,
  password_hash text not null,
  created_at timestamptz not null default now()
);

create index if not exists admin_users_email_idx on admin_users (lower(email));

-- Seed workshop admin (password stored as scrypt salt:hash only — never plaintext).
insert into admin_users (id, email, name, password_hash)
values (
  'a1111111-b222-c333-d444-e55555555555',
  'info@bimmerwise.com',
  'BimmerWise Admin',
  '6bbd621075f22239cc73cf071eeec861:67759f80e1fcb855f3faa0c8332bf53e7ca6f9e8bee951713aa32fce96a0bec0e082c3fc61c397ab91351287f0843443dc8f09dbabea4ee555d7b5e390836d86'
)
on conflict (email) do update
set name = excluded.name,
    password_hash = excluded.password_hash;
