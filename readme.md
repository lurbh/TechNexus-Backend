# TechNexus

## Project Overview

TechNexus E-commerce is an online platform dedicated to providing users with a seamless shopping experience for a wide range of technology products. From smartphones and laptops to accessories and gadgets, TechNexus E-commerce aims to offer a diverse selection of high-quality tech products to meet the needs of tech enthusiasts and casual users alike.

* Live Link for API and Admin Backend : [Link](https://github.com/lurbh/TechNexus-Backend/tree/db_migrate)
* GitHub Repository for FrontEnd (ReactJS) : [Link](https://github.com/lurbh/TechNexus-Frontend)
* Live Webpage of Frontend: [Link](https://github.com/lurbh/TechNexus-Frontend)

## System Design
### Entity Relationship Diagram
![ERD Image](/ERD.png)

### SQL Schema Diagram
![SQL Schema Diagram](/schema.png)

## Functionality
1. User Authentication: Implement secure user authentication using JWT tokens.
2. Seller Management: Allow sellers, log in, add products, view orders, and manage their profiles.
3. User Management: Allow users to register, log in, add products to cart, view cart, cart out, make payment via Stripe and track orders.
4. Admin Managment: Allows admin to full control of the the different tables in the database. 
5. Product Listings: Display products with detailed descriptions, pricing, images, and categories.
6. Payment Integration: Integrate Stripe for secure payment processing and order fulfillment.

## API Documentation
The backend API endpoint provides developers with access to various endpoints for interacting with the platform's features and data. This documentation outlines the available endpoints, request and response formats, authentication methods, and usage guidelines.

### User API Documentation
The base URL for all endpoints is `https://your-api-domain.com/api/user`.
| Endpoint| Method | Description| Request Body | Response Body | JWT Authentication |
|---------------------------------|--------|--------------------------------------|----------------------------------------------------|-------------------------------------------------------------|-------------|
| `/register` | POST| Create a new user account| `{ "email": "user@example.com", "password": "password", "username": "User Name", "role_id": "2" }` | Status 201 with user data and tokens or Status 400 with error message | No|
| `/login` | POST | Login | `{ "email": "user@example.com", "password": "password" }` | Status 200 with data or Status 401 with error message | No |
| `/refresh` | POST | Refresh access token | `{ "refreshToken": "<refresh_token>" }` | Status 200 with new access token or Status 401 with error message | No |
| `/logout` | POST | Logout | `{ "refreshToken": "<refresh_token>" }` | Status 200 with success message or Status 401 with error message | No|

### Product API Documentation
The base URL for all endpoints is `https://your-api-domain.com/api/products`.
| Endpoint| Method | Description| Request Body | Response Body | JWT Authentication |
|---------------------------------|--------|--------------------------------------|----------------------------------------------------|-------------------------------------------------------------|-------------|
| `/` | GET | Get All Products | - | Status 200 with data or Status 400 with error message | No |
| `/categories`  | GET | Get Main Categories | - | Status 200 with data or Status 400 with error message | No |
| `/allcategories`  | GET | Get All Categories | - | Status 200 with data or Status 400 with error message | No |
| `/brands` | GET | Get Brands | - | Status 200 with data or Status 400 with error message | No |
| `/` | POST | Add New Product | `{ "product_name":" product_name", "category_id": "1", "brand_id": 1, "description": "description", "price": 130.30, "quantity_available": 5, "image_url": "image_url"}` | Status 201 with inserted data or Status 400 with error message | Yes |
| `/:product_id` | PUT | Update Product | `{ "product_name":" product_name", "category_id": "1", "brand_id": 1, "description": "description", "price": 130.30, "quantity_available": 5, "image_url": "image_url"}` | Status 202 with updated data or Status 400 with error message | Yes |
| `/:product_id` | DELETE | Delete Product | - | Status 200 with response or Status 400 with error message | Yes |

### Cart API Documentation
The base URL for all endpoints is `https://your-api-domain.com/api/cart`.
| Endpoint| Method | Description| Request Body | Response Body | JWT Authentication |
|---------------------------------|--------|--------------------------------------|----------------------------------------------------|-------------------------------------------------------------|-------------|
| `/usercart/:user_id` | GET | Get Cart Items for a User | - | Status 200 with data or Status 400 with error message | Yes |
| `/usercart`  | POST | Add an Item to User Cart | `{ user_id: 1, product_id: 1, quantity: 1, }` | Status 201 with inserted data or Status 400 with error message | Yes |
| `/usercart/:cartitem_id`  | PUT | Modify Cart Item in User Cart | `{ user_id: 1, product_id: 1, quantity: 1, }` | Status 202 with data or Status 400 with error message | Yes |
| `/usercart/:cartitem_id` | DELETE | Delete Cart Item | - | Status 200 with response or Status 400 with error message | Yes |

### Checkout API Documentation
The base URL for all endpoints is `https://your-api-domain.com/api/checkout`.
| Endpoint| Method | Description| Request Body | Response Body | JWT Authentication |
|---------------------------------|--------|--------------------------------------|----------------------------------------------------|-------------------------------------------------------------|-------------|
| `/` | POST | Generate the Checkout for Stripe to handle | `{ user_id: 1 }` | Status 200 with stripeURL or Status 400 with error message | Yes |

### Orders API Documentation
The base URL for all endpoints is `https://your-api-domain.com/api/orders`.
| Endpoint| Method | Description| Request Body | Response Body | JWT Authentication |
|---------------------------------|--------|--------------------------------------|----------------------------------------------------|-------------------------------------------------------------|-------------|
| `/:user_id` | GET | Get Orders for a User | - | Status 200 with data or Status 400 with error message | Yes |
| `/payment/:order_id`  | PUT | Update Orders when payment is completed | - | Status 200 with data or Status 400 with error message | Yes |


## Technologies Used
* [Express.js](https://expressjs.com/)
* [Bookshelf ORM](https://bookshelfjs.org/)
* [db_migrate](https://db-migrate.readthedocs.io/en/latest/)
* [MySQL](https://www.mysql.com/)
* [Stripe](https://stripe.com/en-sg)
* [Cloudinary](https://cloudinary.com/)
* [Handlebars (hbs)](https://handlebarsjs.com/)
* [Caolan Forms](https://github.com/caolan/forms)

## Deployment

## Future Upgrades

