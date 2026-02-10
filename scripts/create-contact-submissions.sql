-- Run this in your Supabase SQL Editor (https://supabase.com/dashboard/project/kogjdgxvrxfxqbkchxpi/sql)

CREATE TABLE IF NOT EXISTS contact_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  company TEXT NOT NULL,
  monthly_quote_volume TEXT,
  agent_interest TEXT,
  message TEXT,
  lead_source TEXT DEFAULT 'Website Form',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts (for the website form)
CREATE POLICY "Allow anonymous inserts" ON contact_submissions
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Only authenticated users (admin) can read
CREATE POLICY "Only authenticated users can read" ON contact_submissions
  FOR SELECT
  TO authenticated
  USING (true);
