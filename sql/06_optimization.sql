USE elefez_marketplace;

ANALYZE TABLE products;

EXPLAIN
SELECT id, name, price
FROM products
WHERE price > 500000;

EXPLAIN
SELECT id, name, price
FROM products
ORDER BY price DESC
LIMIT 5;

EXPLAIN
SELECT id, name
FROM products
WHERE name LIKE 'Telur Ayam Kampung%';

CREATE INDEX idx_products_price ON products (price);

CREATE INDEX idx_products_name ON products (name);

ANALYZE TABLE products;

SHOW INDEX FROM products;

EXPLAIN
SELECT id, name, price
FROM products
WHERE price > 500000;

EXPLAIN
SELECT id, name, price
FROM products
ORDER BY price DESC
LIMIT 5;

EXPLAIN
SELECT id, price
FROM products
ORDER BY price DESC
LIMIT 5;

EXPLAIN
SELECT id, name
FROM products
WHERE name LIKE 'Telur Ayam Kampung%';

EXPLAIN
SELECT id, name
FROM products
WHERE name LIKE '%kampung%';

EXPLAIN
SELECT c.name AS category, COUNT(p.id) AS product_count
FROM product_categories c
LEFT JOIN products p ON p.category_id = c.id
GROUP BY c.id, c.name;
