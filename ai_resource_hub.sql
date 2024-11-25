CREATE DATABASE ai_resource_hub;

USE ai_resource_hub;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    phone VARCHAR(15),
    profile_photo VARCHAR(255),
    interests TEXT,
    password_hash VARCHAR(255) NOT NULL
);

CREATE TABLE resources (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    category VARCHAR(50) NOT NULL,
    link VARCHAR(255) NOT NULL,
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE reviews (
    id INT AUTO_INCREMENT PRIMARY KEY,
    resource_id INT,
    user_id INT,
    rating INT NOT NULL,
    review TEXT,
    upvotes INT DEFAULT 0,
    FOREIGN KEY (resource_id) REFERENCES resources(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);
INSERT INTO resources (title, description, category, link, user_id)
VALUES 
    ('Learn JavaScript', 'A comprehensive guide to JavaScript.', 'Tutorials', 'https://example.com/js-tutorial', 1),
    ('CSS Tricks', 'Advanced CSS tips and tricks.', 'Articles', 'https://example.com/css-tricks', 2),
    ('React Basics', 'An introduction to React.js.', 'AI Tools', 'https://example.com/react-basics', 3);
