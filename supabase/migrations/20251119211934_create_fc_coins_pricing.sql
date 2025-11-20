/*
  # FC Coins Pricing Table

  1. New Tables
    - `fc_coins_pricing`
      - `id` (uuid, primary key)
      - `amount` (integer) - Quantidade de coins (ex: 100000 para 100k)
      - `price` (numeric) - Preço em reais (ex: 39.90)
      - `is_active` (boolean) - Se esta é a cotação ativa atual
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
  
  2. Security
    - Enable RLS on `fc_coins_pricing` table
    - Add policy for public read access (anyone can see prices)
    - Add policy for authenticated admin updates (you'll need to be authenticated)
  
  3. Initial Data
    - Insert initial pricing: 100k coins for R$ 39.90
*/

CREATE TABLE IF NOT EXISTS fc_coins_pricing (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  amount integer NOT NULL DEFAULT 100000,
  price numeric(10,2) NOT NULL,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE fc_coins_pricing ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view pricing"
  ON fc_coins_pricing
  FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can insert pricing"
  ON fc_coins_pricing
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update pricing"
  ON fc_coins_pricing
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete pricing"
  ON fc_coins_pricing
  FOR DELETE
  TO authenticated
  USING (true);

INSERT INTO fc_coins_pricing (amount, price, is_active)
VALUES (100000, 39.90, true);
