-- Creating tables
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username varchar(20),
  password TEXT
);

CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  user_id integer REFERENCES users(id),
  date_created date
);

CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name varchar(100),
  category varchar(100),
  price money,
  stock integer
);

CREATE TABLE orders_products (
  order_id integer REFERENCES orders(id),
  product_id integer REFERENCES products(id),
  quantity integer,
  price money,
  PRIMARY KEY (order_id, product_id)
);

CREATE TABLE cart (
  id SERIAL PRIMARY KEY,
  date_modified date
);

-- Dummy data
INSERT INTO customers (id, first_name, last_name, email) VALUES 
  (1, 'Jerry', 'Bobert', 'jerry@example.com'), 
  (2, 'George', 'Boston', 'george@example.com');
