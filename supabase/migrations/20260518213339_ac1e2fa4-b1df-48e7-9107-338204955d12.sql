-- Revoke EXECUTE on the cleanup function from public roles
REVOKE EXECUTE ON FUNCTION public.cleanup_old_rate_limits() FROM anon, authenticated;