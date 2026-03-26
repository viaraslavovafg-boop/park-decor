/*
  # Add Storage Policies and Design Page Images

  1. Changes
    - Add storage policies for uploading images
    - Add entries for all design page images
    - Add entries for carousel images
    - Add entries for project showcase images
    - Add entries for team member photos

  2. Security
    - Allow authenticated users to upload to storage bucket
    - Allow public read access to all images
*/

-- Storage policies for authenticated uploads
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'storage' 
    AND tablename = 'objects' 
    AND policyname = 'Authenticated users can upload images'
  ) THEN
    CREATE POLICY "Authenticated users can upload images"
      ON storage.objects
      FOR INSERT
      TO authenticated
      WITH CHECK (bucket_id = 'website-images');
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'storage' 
    AND tablename = 'objects' 
    AND policyname = 'Anyone can view images'
  ) THEN
    CREATE POLICY "Anyone can view images"
      ON storage.objects
      FOR SELECT
      TO public
      USING (bucket_id = 'website-images');
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'storage' 
    AND tablename = 'objects' 
    AND policyname = 'Authenticated users can update images'
  ) THEN
    CREATE POLICY "Authenticated users can update images"
      ON storage.objects
      FOR UPDATE
      TO authenticated
      USING (bucket_id = 'website-images')
      WITH CHECK (bucket_id = 'website-images');
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'storage' 
    AND tablename = 'objects' 
    AND policyname = 'Authenticated users can delete images'
  ) THEN
    CREATE POLICY "Authenticated users can delete images"
      ON storage.objects
      FOR DELETE
      TO authenticated
      USING (bucket_id = 'website-images');
  END IF;
END $$;

-- Add design page images
INSERT INTO website_images (key, url, alt_text, category, order_index) VALUES
  -- Design page project 1 main image
  ('design_project_1_main', '', 'Design project 1 main image', 'design_projects', 0),
  
  -- Design page project 2 images (3 images in grid)
  ('design_project_2_large', '', 'Design project 2 large image', 'design_projects', 1),
  ('design_project_2_top', '', 'Design project 2 top image', 'design_projects', 2),
  ('design_project_2_bottom', '', 'Design project 2 bottom image', 'design_projects', 3),
  
  -- Design page project 3 images (4 images in grid)
  ('design_project_3_img1', '', 'Design project 3 image 1', 'design_projects', 4),
  ('design_project_3_img2', '', 'Design project 3 image 2', 'design_projects', 5),
  ('design_project_3_img3', '', 'Design project 3 image 3', 'design_projects', 6),
  ('design_project_3_img4', '', 'Design project 3 image 4', 'design_projects', 7),
  
  -- Design page project 4 images (6 images in complex grid)
  ('design_project_4_large', '', 'Design project 4 large image', 'design_projects', 8),
  ('design_project_4_top_right', '', 'Design project 4 top right', 'design_projects', 9),
  ('design_project_4_mid_right', '', 'Design project 4 mid right', 'design_projects', 10),
  ('design_project_4_bottom_left', '', 'Design project 4 bottom left', 'design_projects', 11),
  ('design_project_4_bottom_center', '', 'Design project 4 bottom center', 'design_projects', 12),
  ('design_project_4_bottom_right', '', 'Design project 4 bottom right', 'design_projects', 13),
  
  -- Design page intro banner
  ('design_intro_banner', '', 'Design page intro banner', 'design_projects', 14),
  
  -- Landing page carousel images
  ('carousel_slide_1', '', 'Carousel slide 1', 'carousel', 0),
  ('carousel_slide_2', '', 'Carousel slide 2', 'carousel', 1),
  ('carousel_slide_3', '', 'Carousel slide 3', 'carousel', 2),
  ('carousel_slide_4', '', 'Carousel slide 4', 'carousel', 3),
  ('carousel_slide_5', '', 'Carousel slide 5', 'carousel', 4),
  
  -- Landing page project showcase
  ('showcase_project_1', '', 'Project showcase 1', 'project_showcase', 0),
  ('showcase_project_2', '', 'Project showcase 2', 'project_showcase', 1),
  ('showcase_project_3', '', 'Project showcase 3', 'project_showcase', 2),
  
  -- Team member photos
  ('team_viara_slavova', '', 'Вяра Славова', 'team', 0),
  ('team_petko_slavov', '', 'Петко Славов', 'team', 1)
ON CONFLICT (key) DO NOTHING;
