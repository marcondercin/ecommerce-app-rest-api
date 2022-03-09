-- Creating tables
CREATE TABLE customers (
  id integer PRIMARY KEY,
  first_name varchar(50),
  last_name varchar(50),
  email varchar(50),
  phone varchar(10),
  postal varchar(6)
);

CREATE TABLE orders (
  id integer PRIMARY KEY,
  customer_id integer REFERENCES customers(id),
  date_created date
);

CREATE TABLE products (
  id integer PRIMARY KEY,
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

-- Dummy data
INSERT INTO customers (id, first_name, last_name, email) VALUES 
  (1, 'Jerry', 'Bobert', 'jerry@example.com'), 
  (2, 'George', 'Boston', 'george@example.com');
