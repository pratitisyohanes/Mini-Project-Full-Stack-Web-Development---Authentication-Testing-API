USE elefez_marketplace;

ALTER TABLE products
  ADD COLUMN status ENUM('active', 'inactive') NOT NULL DEFAULT 'active'
  AFTER review_count;

ALTER TABLE products
  MODIFY COLUMN rating DECIMAL(3, 1) NOT NULL DEFAULT 0.0;

ALTER TABLE products
  DROP CHECK chk_products_rating;

ALTER TABLE products
  ADD CONSTRAINT chk_products_rating CHECK (rating BETWEEN 0 AND 10);

UPDATE products SET rating = ROUND(rating * 2, 1);
