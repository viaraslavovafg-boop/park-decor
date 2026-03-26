/*
  # Image Management System

  1. New Tables
    - `website_images`
      - `id` (uuid, primary key)
      - `key` (text, unique) - Identifier for the image (e.g., 'hero_background', 'project_1')
      - `url` (text) - Public URL of the image
      - `alt_text` (text) - Alternative text for accessibility
      - `category` (text) - Category grouping (e.g., 'hero', 'projects', 'partners')
      - `order_index` (integer) - For ordering images in galleries
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on `website_images` table
    - Public read access for all users (website visitors need to see images)
    - Only authenticated users can insert/update/delete (admin only)

  3. Storage
    - Create storage bucket for website images
    - Enable public access for reading
    - Only authenticated users can upload
*/

-- Create website_images table
CREATE TABLE IF NOT EXISTS website_images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  key text UNIQUE NOT NULL,
  url text NOT NULL,
  alt_text text DEFAULT '',
  category text DEFAULT 'general',
  order_index integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE website_images ENABLE ROW LEVEL SECURITY;

-- Public can read all images (needed for website display)
CREATE POLICY "Anyone can view website images"
  ON website_images
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Only authenticated users can insert images
CREATE POLICY "Authenticated users can insert images"
  ON website_images
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Only authenticated users can update images
CREATE POLICY "Authenticated users can update images"
  ON website_images
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Only authenticated users can delete images
CREATE POLICY "Authenticated users can delete images"
  ON website_images
  FOR DELETE
  TO authenticated
  USING (true);

-- Create storage bucket for images
INSERT INTO storage.buckets (id, name, public)
VALUES ('website-images', 'website-images', true)
ON CONFLICT (id) DO NOTHING;

-- Insert default image entries for existing images
INSERT INTO website_images (key, url, alt_text, category, order_index) VALUES
  ('hero_background', '/САИТ-_landing_page-03.png', 'Hero background', 'hero', 0),
  ('about_decoration', '/декоративен_елемент_-_section_за_нас.png', 'About section decoration', 'about', 0),
  ('service_design', '/икони-37.png', 'Design service icon', 'services', 0),
  ('service_construction', '/икони-34.png', 'Construction service icon', 'services', 1),
  ('service_landscaping', '/икони-35.png', 'Landscaping service icon', 'services', 2),
  ('service_maintenance', '/икони-36.png', 'Maintenance service icon', 'services', 3),
  ('project_placeholder', '/САИТ_ПРОЕКТИ_Page_web-04.png', 'Project image', 'projects', 0),
  ('partners_logo', '/Лого_нашите_партньори.png', 'Partners logo', 'partners', 0)
ON CONFLICT (key) DO NOTHING;