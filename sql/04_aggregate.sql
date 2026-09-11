USE elefez_marketplace;

SELECT COUNT(*) AS total_users
FROM users;

SELECT
  COUNT(*) AS total_products,
  SUM(CASE WHEN stock > 0 THEN 1 ELSE 0 END) AS available_products
FROM products;

SELECT c.name AS category, COUNT(p.id) AS product_count
FROM product_categories c
LEFT JOIN products p ON p.category_id = c.id
GROUP BY c.id, c.name
ORDER BY product_count DESC, c.name;

SELECT c.name AS category, ROUND(AVG(p.price), 0) AS average_price
FROM product_categories c
INNER JOIN products p ON p.category_id = c.id
GROUP BY c.id, c.name
ORDER BY average_price DESC;

SELECT c.name AS category, COUNT(p.id) AS product_count
FROM product_categories c
INNER JOIN products p ON p.category_id = c.id
GROUP BY c.id, c.name
HAVING COUNT(p.id) > 3
ORDER BY c.name;

SELECT
  name,
  stock,
  CASE
    WHEN stock = 0 THEN 'Habis'
    WHEN stock < 20 THEN 'Menipis'
    ELSE 'Aman'
  END AS stock_status
FROM products
ORDER BY stock, name;

SELECT u.full_name AS seller, SUM(t.total_price) AS revenue
FROM transactions t
INNER JOIN products p ON p.id = t.product_id
INNER JOIN users u ON u.id = p.user_id
WHERE t.status <> 'cancelled'
GROUP BY u.id, u.full_name
ORDER BY revenue DESC;
