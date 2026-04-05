-- SQL Schema for Jitin Nair Portfolio Lead Capture
-- Run this in your Supabase SQL Editor (https://supabase.com/dashboard/project/kshmtzeqwovezlkkficd/sql)

-- 1. Create the leads table
CREATE TABLE IF NOT EXISTS public.terminal_leads (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    email TEXT NOT NULL,
    phone_number TEXT,
    captured_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- 2. Enable Row Level Security (RLS)
ALTER TABLE public.terminal_leads ENABLE ROW LEVEL SECURITY;

-- 3. Create a policy to allow anyone to insert a lead (Anonymous Capture)
-- This allows the portfolio website to save leads without requiring authentication
CREATE POLICY "Allow anonymous inserts" ON public.terminal_leads
    FOR INSERT
    TO anon
    WITH CHECK (true);

-- 4. Create a policy to allow you (authenticated user) to see the leads
-- Replace 'authenticated' with specific roles if needed
CREATE POLICY "Allow authenticated selects" ON public.terminal_leads
    FOR SELECT
    TO authenticated
    USING (true);

-- Optional: Create a helpful comment
COMMENT ON TABLE public.terminal_leads IS 'Leads captured from the terminal component in the portfolio hero section.';
