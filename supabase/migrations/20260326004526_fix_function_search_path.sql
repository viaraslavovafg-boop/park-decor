/*
  # Fix Function Search Path Security

  ## Changes Made
  
  1. Security Improvements
    - Add SET search_path = '' to is_admin() function
    - Prevents search_path manipulation attacks
    - Use CREATE OR REPLACE to update function without dropping policies
  
  ## Functions Modified
    - `is_admin()` - Now has immutable search_path
*/

-- Recreate is_admin function with secure search_path
-- Using CREATE OR REPLACE so we don't need to drop dependent policies
CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN (
    auth.jwt() -> 'app_metadata' ->> 'role' = 'admin'
  );
END;
$$ LANGUAGE plpgsql 
   SECURITY DEFINER 
   SET search_path = '';