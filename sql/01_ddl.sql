DROP DATABASE IF EXISTS elefez_marketplace;

CREATE DATABASE elefez_marketplace
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE elefez_marketplace;

CREATE TABLE users (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  full_name VARCHAR(100) NOT NULL,
  username VARCHAR(50) NOT NULL,
  email VARCHAR(100) NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  phone VARCHAR(20) NULL,
  role ENUM('admin', 'seller', 'buyer') NOT NULL DEFAULT 'buyer',
  city VARCHAR(60) NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  CONSTRAINT uq_users_username UNIQUE (username),
  CONSTRAINT uq_users_email UNIQUE (email)
) ENGINE = InnoDB;

CREATE TABLE product_categories (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  name VARCHAR(60) NOT NULL,
  slug VARCHAR(60) NOT NULL,
  description VARCHAR(255) NULL,
  icon VARCHAR(60) NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  CONSTRAINT uq_product_categories_name UNIQUE (name),
  CONSTRAINT uq_product_categories_slug UNIQUE (slug)
) ENGINE = InnoDB;

CREATE TABLE products (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  category_id INT UNSIGNED NOT NULL,
  user_id INT UNSIGNED NOT NULL,
  name VARCHAR(150) NOT NULL,
  description TEXT NULL,
  price DECIMAL(12, 2) NOT NULL,
  stock INT UNSIGNED NOT NULL DEFAULT 0,
  image VARCHAR(255) NULL,
  rating DECIMAL(2, 1) NOT NULL DEFAULT 0.0,
  review_count INT UNSIGNED NOT NULL DEFAULT 0,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  CONSTRAINT fk_products_category FOREIGN KEY (category_id)
    REFERENCES product_categories (id) ON DELETE RESTRICT,
  CONSTRAINT fk_products_user FOREIGN KEY (user_id)
    REFERENCES users (id) ON DELETE RESTRICT,
  CONSTRAINT chk_products_price CHECK (price >= 0),
  CONSTRAINT chk_products_rating CHECK (rating BETWEEN 0 AND 5)
) ENGINE = InnoDB;

CREATE TABLE transactions (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  buyer_id INT UNSIGNED NOT NULL,
  product_id INT UNSIGNED NOT NULL,
  quantity INT UNSIGNED NOT NULL,
  total_price DECIMAL(12, 2) NOT NULL,
  status ENUM('paid', 'shipped', 'completed', 'cancelled') NOT NULL DEFAULT 'paid',
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  CONSTRAINT fk_transactions_buyer FOREIGN KEY (buyer_id)
    REFERENCES users (id) ON DELETE RESTRICT,
  CONSTRAINT fk_transactions_product FOREIGN KEY (product_id)
    REFERENCES products (id) ON DELETE RESTRICT,
  CONSTRAINT chk_transactions_quantity CHECK (quantity > 0),
  CONSTRAINT chk_transactions_total_price CHECK (total_price >= 0)
) ENGINE = InnoDB;
