USE elefez_marketplace;

SELECT *
FROM products;

SELECT name, price
FROM products;

SELECT id, name, price
FROM products
WHERE price BETWEEN 50000 AND 200000
ORDER BY price;

SELECT id, name, stock, price
FROM products
WHERE stock = 0 OR price > 500000
ORDER BY id;

SELECT id, name, price
FROM products
ORDER BY price DESC
LIMIT 5;

SELECT id, name, price
FROM products
WHERE name LIKE '%kampung%'
ORDER BY price;
