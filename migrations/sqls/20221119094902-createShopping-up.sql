

CREATE TABLE users (id SERIAL PRIMARY KEY,firstname VARCHAR(50)NOT NULL,lastname VARCHAR(50)NOT NULL,username VARCHAR(50)NOT NULL,password VARCHAR(255)NOT NULL);
CREATE TABLE products(id SERIAL PRIMARY KEY,name VARCHAR(64) NOT NULL,price integer NOT NULL,category VARCHAR(64),popular_rate integer);
CREATE TABLE orders(id SERIAL PRIMARY KEY,status VARCHAR(10),user_id bigint REFERENCES users(id));
CREATE TABLE order_products(id SERIAL PRIMARY KEY,quantity integer,order_id bigint REFERENCES orders(id),product_id bigint REFERENCES products(id));

