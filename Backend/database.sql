CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash CHAR(60) NOT NULL,
    order_number INT,
    -- Additional fields for user details
);

CREATE TABLE cart_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    item_number INT,
    quantity INT,
    -- Additional fields for item details
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE orders (
    order_number INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    paid BOOLEAN,
    -- Additional fields for order details
    FOREIGN KEY (user_id) REFERENCES users(id)
);
