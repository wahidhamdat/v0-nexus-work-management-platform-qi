-- Add columns for briefing request form (run in Supabase SQL Editor)
alter table public.form_submissions
  add column if not exists role text,
  add column if not exists pro_email text;
