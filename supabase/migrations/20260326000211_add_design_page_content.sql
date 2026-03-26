/*
  # Add Design Page Content Table

  1. New Tables
    - `design_content`
      - `id` (uuid, primary key)
      - `project_number` (integer) - Which project section (1-4)
      - `title` (text) - Main heading
      - `description` (text) - Description text
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
  
  2. Security
    - Enable RLS on `design_content` table
    - Add policy for public read access
    - Add policy for authenticated users to insert/update/delete
  
  3. Initial Data
    - Insert default content for all 4 project sections
*/

CREATE TABLE IF NOT EXISTS design_content (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_number integer UNIQUE NOT NULL,
  title text NOT NULL,
  description text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE design_content ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view design content"
  ON design_content
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can insert design content"
  ON design_content
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update design content"
  ON design_content
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete design content"
  ON design_content
  FOR DELETE
  TO authenticated
  USING (true);

-- Insert default content for all 4 projects
INSERT INTO design_content (project_number, title, description) VALUES
  (1, 'ПРОЕКТ 1', 'Модерно жилище с минималистична градина'),
  (2, 'ПРОЕКТ 2', 'Луксозен хотелски комплекс с тропически дизайн'),
  (3, 'ПРОЕКТ 3', 'Градски парк с интерактивни зони'),
  (4, 'ПРОЕКТ 4', 'Екологична вила със зелени тераси')
ON CONFLICT (project_number) DO NOTHING;