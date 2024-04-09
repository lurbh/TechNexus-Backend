USE TechNexus;

-- Insert sample data into Roles Table
INSERT INTO Roles (role_name) VALUES ('admin'), ('user');

-- Insert sample data into Users Table
INSERT INTO Users (username, email, password_hash, role)
VALUES 
    ('john_doe', 'john@example.com', 'hashed_password', 'admin'),
    ('jane_smith', 'jane@example.com', 'hashed_password', 'user'),
    ('test_user', 'test@example.com', 'hashed_password', 'user');

-- Insert sample data into Categories Table
INSERT INTO Categories (category_name) 
VALUES 
    ('Smartphones'),
    ('Laptops'),
    ('Headphones'),
    ('Gaming Consoles');

-- Insert sample data into Brands Table
INSERT INTO Brands (brand_name, country_of_origin)
VALUES 
    ('Apple', 'USA'),
    ('Samsung', 'South Korea'),
    ('Sony', 'Japan'),
    ('Microsoft', 'USA');

-- Insert sample data into Products Table
INSERT INTO Products (product_name, category_id, brand_id, description, price, quantity_available)
VALUES 
    ('iPhone 12', 1, 1, 'Latest iPhone model', 999.99, 100),
    ('Galaxy S21', 1, 2, 'Samsung flagship smartphone', 899.99, 120),
    ('Sony WH-1000XM4', 3, 3, 'Noise-canceling headphones', 349.99, 150),
    ('Xbox Series X', 4, 4, 'Next-gen gaming console', 499.99, 70);

-- Insert sample data into Reviews Table
INSERT INTO Reviews (product_id, user_id, rating, review_text)
VALUES 
    (1, 2, 5, 'Amazing phone! Best camera ever.'),
    (1, 3, 4, 'Great performance but a bit pricey.'),
    (3, 1, 5, 'Excellent noise cancellation. Comfortable to wear for long periods.');

-- Insert sample data into Order_Statuses Table
INSERT INTO Order_Statuses (status_name) VALUES ('pending'), ('processing'), ('shipped'), ('delivered'), ('cancelled');

-- Insert sample data into Orders Table
INSERT INTO Orders (user_id, status_id)
VALUES 
    (1, 4),
    (2, 3),
    (3, 1);

-- Insert sample data into Order_Items Table
INSERT INTO Order_Items (order_id, product_id, quantity, unit_price)
VALUES 
    (1, 1, 1, 999.99),
    (2, 3, 2, 349.99),
    (3, 2, 1, 899.99);

-- Insert sample data into News_Articles Table
INSERT INTO News_Articles (title, content, author_id)
VALUES 
    ('New iPhone 13 Launch', 'Apple has announced the release of the new iPhone 13.', 1),
    ('Sony WH-1000XM4 Review', 'Here is a detailed review of the Sony WH-1000XM4 headphones.', 2);

-- Insert sample data into Comments Table
INSERT INTO Comments (article_id, user_id, comment_text)
VALUES 
    (1, 2, 'Excited for the new iPhone!'),
    (2, 1, 'I love my Sony WH-1000XM4 headphones!');

-- Insert sample data into Images Table
INSERT INTO Images (product_id, image_url)
VALUES 
    (1, 'https://example.com/iphone_image.jpg'),
    (2, 'https://example.com/galaxy_image.jpg');
