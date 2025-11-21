/*
  # Create Facebook Configuration Table

  1. New Tables
    - `facebook_config`
      - `id` (uuid, primary key) - Unique identifier
      - `pixel_id` (text) - Facebook Pixel ID
      - `conversion_api_token` (text) - Facebook Conversions API Token
      - `created_at` (timestamptz) - When the configuration was created
      - `updated_at` (timestamptz) - When the configuration was last updated

  2. Security
    - Enable RLS on `facebook_config` table
    - Add policy for public read access (needed for loading pixel on page)
    - Only authenticated users can update (admin panel)

  3. Notes
    - Single row table - only stores one configuration
    - Pixel ID is public (safe to expose in frontend)
    - API Token should be kept server-side only
*/

CREATE TABLE IF NOT EXISTS facebook_config (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  pixel_id text,
  conversion_api_token text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE facebook_config ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read pixel configuration"
  ON facebook_config
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can update configuration"
  ON facebook_config
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can insert configuration"
  ON facebook_config
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Insert default empty configuration
INSERT INTO facebook_config (pixel_id, conversion_api_token)
VALUES ('', '')
ON CONFLICT DO NOTHING;