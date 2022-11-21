# API Requirements

The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

## API Endpoints

note: [token required] for all routes

#### Products

- Index type:get ${HOST}/products/get`
- Show type: post http://localhost:3000/products/get/:id`
- Create type: post http://localhost:3000/products/add`
- get products by category type: get http://localhost:3000/products/get/:category
- get products populare rate type: get http://localhost:3000/products/getPopularProductRate

#### Users

- Index type:get http://localhost:3000/users/get`)
- Show type: post http://localhost:3000/users/get/:id`)
- Create type: post http://localhost:3000/users/add`) [token not required]

#### Orders

- Current Order by user (args: user id)[token required] type: get http://localhost:3000/users/orders/2

## Data Shapes

#### Product

- id SERIAL PRIMARY KEY
- name VARCHAR(64) NOT NULL
- price integer NOT NULL
- category VARCHAR(64)
- popular_rate integer

#### User

- id SERIAL PRIMARY KEY
- firstname VARCHAR(50)NOT NULL
- lastname VARCHAR(50)NOT NULL
- password VARCHAR(255)NOT NULL

#### Orders

- id SERIAL PRIMARY KEY
- status VARCHAR(10)
- user_id bigint REFERENCES users(id)

#### Order products

- id SERIAL PRIMARY KEY
- product_id bigint REFERENCES products(id)
- order_id bigint REFERENCES orders(id)
- quantity number
