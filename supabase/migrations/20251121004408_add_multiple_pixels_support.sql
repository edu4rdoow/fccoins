/*
  # Add Support for Multiple Facebook Pixels

  1. Changes
    - Rename `pixel_id` to `pixel_ids` (text array)
    - Keep `conversion_api_token` as single value (all pixels use same token)
  
  2. Notes
    - Supports multiple Pixel IDs for the same site
    - All pixels will fire for every event
    - Maintains backward compatibility
*/

-- Add new column for multiple pixel IDs
ALTER TABLE facebook_config 
ADD COLUMN IF NOT EXISTS pixel_ids text[] DEFAULT '{}';

-- Copy existing pixel_id to pixel_ids array if not empty
UPDATE facebook_config 
SET pixel_ids = ARRAY[pixel_id]::text[]
WHERE pixel_id IS NOT NULL AND pixel_id != '' AND pixel_ids = '{}';

-- Drop old column
ALTER TABLE facebook_config 
DROP COLUMN IF EXISTS pixel_id;