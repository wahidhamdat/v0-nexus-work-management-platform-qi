-- 1) Table for form submissions
create table if not exists public.form_submissions (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),

  email text not null,
  first_name text not null,
  last_name text not null,
  company_name text not null,

  phone text,
  monthly_quote_volume text,
  biggest_ops_pain text,
  agent_interest text
);

-- 2) Enable RLS
alter table public.form_submissions enable row level security;

-- 3) Allow anonymous INSERT only (no read/update/delete)
create policy "anon_insert_only_form_submissions"
on public.form_submissions
for insert
to anon
with check (true);
