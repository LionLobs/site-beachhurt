-- Create rate_limits table for server-side rate limiting
CREATE TABLE public.rate_limits (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  ip_address TEXT NOT NULL,
  endpoint TEXT NOT NULL,
  request_count INTEGER NOT NULL DEFAULT 1,
  window_start TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE (ip_address, endpoint, window_start)
);

-- Enable RLS
ALTER TABLE public.rate_limits ENABLE ROW LEVEL SECURITY;

-- Deny all client access - only server-side admin should use this table
CREATE POLICY "No client access to rate_limits" ON public.rate_limits FOR SELECT USING (false);
CREATE POLICY "No client insert on rate_limits" ON public.rate_limits FOR INSERT WITH CHECK (false);
CREATE POLICY "No client update on rate_limits" ON public.rate_limits FOR UPDATE USING (false);
CREATE POLICY "No client delete on rate_limits" ON public.rate_limits FOR DELETE USING (false);

-- Add index for efficient lookups
CREATE INDEX idx_rate_limits_lookup ON public.rate_limits (ip_address, endpoint, window_start);

-- Add cleanup function for old rate limit records
CREATE OR REPLACE FUNCTION public.cleanup_old_rate_limits()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  DELETE FROM public.rate_limits WHERE window_start < now() - interval '1 hour';
END;
$$;