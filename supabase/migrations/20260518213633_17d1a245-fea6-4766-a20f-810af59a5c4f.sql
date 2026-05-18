-- Switch increment_rate_limit to SECURITY INVOKER
-- (supabaseAdmin uses service role which bypasses RLS, so it will still work)
CREATE OR REPLACE FUNCTION public.increment_rate_limit(
  p_ip_address TEXT,
  p_endpoint TEXT,
  p_window_start TIMESTAMPTZ,
  p_max_requests INTEGER
)
RETURNS TABLE(allowed BOOLEAN, current_count INTEGER)
LANGUAGE plpgsql
SECURITY INVOKER
SET search_path = public
AS $$
DECLARE
  v_count INTEGER;
BEGIN
  UPDATE public.rate_limits
  SET request_count = request_count + 1
  WHERE ip_address = p_ip_address
    AND endpoint = p_endpoint
    AND window_start = p_window_start;

  GET DIAGNOSTICS v_count = ROW_COUNT;

  IF v_count = 0 THEN
    INSERT INTO public.rate_limits (ip_address, endpoint, window_start, request_count)
    VALUES (p_ip_address, p_endpoint, p_window_start, 1)
    ON CONFLICT (ip_address, endpoint, window_start) DO UPDATE
    SET request_count = public.rate_limits.request_count + 1;
  END IF;

  RETURN QUERY
  SELECT (rl.request_count <= p_max_requests)::BOOLEAN AS allowed, rl.request_count AS current_count
  FROM public.rate_limits rl
  WHERE rl.ip_address = p_ip_address
    AND rl.endpoint = p_endpoint
    AND rl.window_start = p_window_start;
END;
$$;