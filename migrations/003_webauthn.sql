create table if not exists webauthn_credentials (
  id text primary key,
  customer_id uuid not null references customers(id) on delete cascade,
  public_key text not null,
  counter bigint not null default 0,
  device_type text not null default 'singleDevice',
  backed_up boolean not null default false,
  transports text not null default '',
  created_at timestamptz not null default now()
);

create index if not exists webauthn_credentials_customer_id_idx
  on webauthn_credentials (customer_id);

create table if not exists webauthn_challenges (
  id uuid primary key,
  customer_id uuid references customers(id) on delete cascade,
  challenge text not null,
  kind text not null,
  expires_at timestamptz not null,
  created_at timestamptz not null default now()
);

create index if not exists webauthn_challenges_expires_idx
  on webauthn_challenges (expires_at);
