USE elefez_marketplace;

SELECT p.id, p.name AS product, c.name AS category, p.price
FROM products p
INNER JOIN product_categories c ON c.id = p.category_id
ORDER BY p.id;

SELECT c.id AS category_id, c.name AS category, p.id AS product_id, p.name AS product
FROM product_categories c
LEFT JOIN products p ON p.category_id = c.id
ORDER BY c.id, p.id;

SELECT c.id AS category_id, c.name AS category, p.id AS product_id, p.name AS product
FROM products p
RIGHT JOIN product_categories c ON c.id = p.category_id
ORDER BY c.id, p.id;

SELECT u.id AS user_id, u.full_name, u.role, t.id AS transaction_id, p.name AS product
FROM users u
LEFT JOIN transactions t ON t.buyer_id = u.id
LEFT JOIN products p ON p.id = t.product_id
ORDER BY u.id, t.id;

SELECT
  t.id AS transaction_id,
  u.full_name AS buyer,
  p.name AS product,
  t.quantity,
  t.total_price,
  t.status,
  t.created_at
FROM transactions t
INNER JOIN users u ON u.id = t.buyer_id
INNER JOIN products p ON p.id = t.product_id
ORDER BY t.created_at;

SELECT p.id, p.name AS product, u.full_name AS uploaded_by, u.city
FROM products p
INNER JOIN users u ON u.id = p.user_id
ORDER BY u.full_name, p.id;
