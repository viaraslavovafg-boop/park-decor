/*
  # Fix Storage Upload Policies

  1. Security Changes
    - Add INSERT policy for authenticated users to upload to website-images bucket
    - Add UPDATE policy for authenticated users to update images in website-images bucket
    - Add DELETE policy for authenticated users to delete images from website-images bucket
  
  These policies allow admin users to upload, update, and delete images in the admin panel.
*/

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Authenticated users can upload to website-images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can update website-images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete website-images" ON storage.objects;

-- Allow authenticated users to upload images to website-images bucket
CREATE POLICY "Authenticated users can upload to website-images"
  ON storage.objects
  FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'website-images');

-- Allow authenticated users to update images in website-images bucket
CREATE POLICY "Authenticated users can update website-images"
  ON storage.objects
  FOR UPDATE
  TO authenticated
  USING (bucket_id = 'website-images')
  WITH CHECK (bucket_id = 'website-images');

-- Allow authenticated users to delete images from website-images bucket
CREATE POLICY "Authenticated users can delete website-images"
  ON storage.objects
  FOR DELETE
  TO authenticated
  USING (bucket_id = 'website-images');
