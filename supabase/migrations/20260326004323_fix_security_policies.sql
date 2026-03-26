/*
  # Fix Security Policies

  ## Changes Made
  
  1. RLS Policy Improvements
    - Replace overly permissive policies (USING true) with admin-only checks
    - Only users with admin role can insert/update/delete content
    - Public read access remains for website functionality
  
  2. Security Enhancements
    - All authenticated write operations now require admin verification
    - Prevents any authenticated user from modifying content
    - Only designated admins can manage website content

  ## Tables Affected
    - `website_images` - Admin-only write access
    - `gallery_images` - Admin-only write access  
    - `design_content` - Admin-only write access
*/

-- Drop existing overly permissive policies
DROP POLICY IF EXISTS "Authenticated users can insert images" ON website_images;
DROP POLICY IF EXISTS "Authenticated users can update images" ON website_images;
DROP POLICY IF EXISTS "Authenticated users can delete images" ON website_images;

DROP POLICY IF EXISTS "Authenticated users can insert design content" ON design_content;
DROP POLICY IF EXISTS "Authenticated users can update design content" ON design_content;
DROP POLICY IF EXISTS "Authenticated users can delete design content" ON design_content;

-- For gallery_images table (if it exists)
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM pg_tables WHERE tablename = 'gallery_images') THEN
    DROP POLICY IF EXISTS "Authenticated users can insert images" ON gallery_images;
    DROP POLICY IF EXISTS "Authenticated users can update images" ON gallery_images;
    DROP POLICY IF EXISTS "Authenticated users can delete images" ON gallery_images;
  END IF;
END $$;

-- Create helper function to check if user is admin
CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN (
    auth.jwt() -> 'app_metadata' ->> 'role' = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Website Images: Admin-only write policies
CREATE POLICY "Only admins can insert website images"
  ON website_images
  FOR INSERT
  TO authenticated
  WITH CHECK (is_admin());

CREATE POLICY "Only admins can update website images"
  ON website_images
  FOR UPDATE
  TO authenticated
  USING (is_admin())
  WITH CHECK (is_admin());

CREATE POLICY "Only admins can delete website images"
  ON website_images
  FOR DELETE
  TO authenticated
  USING (is_admin());

-- Design Content: Admin-only write policies
CREATE POLICY "Only admins can insert design content"
  ON design_content
  FOR INSERT
  TO authenticated
  WITH CHECK (is_admin());

CREATE POLICY "Only admins can update design content"
  ON design_content
  FOR UPDATE
  TO authenticated
  USING (is_admin())
  WITH CHECK (is_admin());

CREATE POLICY "Only admins can delete design content"
  ON design_content
  FOR DELETE
  TO authenticated
  USING (is_admin());

-- Gallery Images: Admin-only write policies (if table exists)
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM pg_tables WHERE tablename = 'gallery_images') THEN
    EXECUTE 'CREATE POLICY "Only admins can insert gallery images"
      ON gallery_images
      FOR INSERT
      TO authenticated
      WITH CHECK (is_admin())';
    
    EXECUTE 'CREATE POLICY "Only admins can update gallery images"
      ON gallery_images
      FOR UPDATE
      TO authenticated
      USING (is_admin())
      WITH CHECK (is_admin())';
    
    EXECUTE 'CREATE POLICY "Only admins can delete gallery images"
      ON gallery_images
      FOR DELETE
      TO authenticated
      USING (is_admin())';
  END IF;
END $$;