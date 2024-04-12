CREATE DATABASE TechNexus;

USE TechNexus;

-- Create Roles Table
CREATE TABLE Roles (
    role_id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    role_name VARCHAR(50) NOT NULL,
    UNIQUE(role_name)
);

-- Create Users Table
CREATE TABLE Users (
    user_id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    registration_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    role VARCHAR(50) NOT NULL,
    FOREIGN KEY (role) REFERENCES Roles(role_name),
    UNIQUE (email)
    -- Add other user profile information fields as needed
);

-- Create Categories Table
CREATE TABLE Categories (
    category_id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    category_name VARCHAR(100) NOT NULL,
    parent_category_id INT UNSIGNED,
    category_img_url VARCHAR(255),
    FOREIGN KEY (parent_category_id) REFERENCES Categories(category_id)
);

-- Create Brands Table
CREATE TABLE Brands (
    brand_id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    brand_name VARCHAR(100) NOT NULL,
    country_of_origin VARCHAR(100)
    -- Add other brand-related fields as needed
);

-- Create Products Table
CREATE TABLE Products (
    product_id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    product_name VARCHAR(255) NOT NULL,
    category_id INT UNSIGNED,
    brand_id INT UNSIGNED,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    quantity_available INT UNSIGNED NOT NULL,
    FOREIGN KEY (category_id) REFERENCES Categories(category_id),
    FOREIGN KEY (brand_id) REFERENCES Brands(brand_id)
    -- Add other product-related fields as needed
);

-- Create Reviews Table
CREATE TABLE Reviews (
    review_id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    product_id INT UNSIGNED,
    user_id INT UNSIGNED,
    rating INT,
    review_text TEXT,
    review_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES Products(product_id),
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

-- Create Order_Statuses Table
CREATE TABLE Order_Statuses (
    status_id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    status_name VARCHAR(50) NOT NULL,
    UNIQUE(status_name)
);

-- Create Orders Table
CREATE TABLE Orders (
    order_id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    user_id INT UNSIGNED,
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status_id INT UNSIGNED,
    FOREIGN KEY (user_id) REFERENCES Users(user_id),
    FOREIGN KEY (status_id) REFERENCES Order_Statuses(status_id)
);

-- Create Order_Items Table
CREATE TABLE Order_Items (
    order_item_id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    order_id INT UNSIGNED,
    product_id INT UNSIGNED,
    quantity INT UNSIGNED,
    unit_price DECIMAL(10, 2),
    FOREIGN KEY (order_id) REFERENCES Orders(order_id),
    FOREIGN KEY (product_id) REFERENCES Products(product_id)
);

-- Create News Articles Table
CREATE TABLE News_Articles (
    article_id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    content TEXT,
    publication_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    author_id INT UNSIGNED,
    FOREIGN KEY (author_id) REFERENCES Users(user_id)
);

-- Create Comments Table
CREATE TABLE Comments (
    comment_id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    article_id INT UNSIGNED,
    user_id INT UNSIGNED,
    comment_text TEXT,
    comment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (article_id) REFERENCES News_Articles(article_id),
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

-- Create Images Table
CREATE TABLE Images (
    image_id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    product_id INT UNSIGNED,
    image_url VARCHAR(255) NOT NULL,
    FOREIGN KEY (product_id) REFERENCES Products(product_id)
);
