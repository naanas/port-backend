-- Initialize the portfolio database schema

-- Create profile table
CREATE TABLE IF NOT EXISTS profile (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    title VARCHAR(255) NOT NULL,
    bio TEXT NOT NULL,
    social_links JSONB
);

-- Create skills table
CREATE TABLE IF NOT EXISTS skills (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    category VARCHAR(100) NOT NULL, -- e.g., 'Frontend', 'Backend', 'Tools'
    proficiency INTEGER CHECK (proficiency BETWEEN 1 AND 100)
);

-- Create projects table
CREATE TABLE IF NOT EXISTS projects (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    tech_stack TEXT[],
    image_url VARCHAR(255),
    live_url VARCHAR(255),
    github_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert Minimal Seed Data

INSERT INTO profile (name, title, bio, social_links) 
VALUES (
    'John Doe', 
    'Fullstack Developer & Designer', 
    'I build minimal, modern, and performant web experiences. Passionate about interactive design and robust backend architectures.',
    '{"github": "https://github.com", "linkedin": "https://linkedin.com", "twitter": "https://twitter.com"}'
) ON CONFLICT DO NOTHING;

INSERT INTO skills (name, category, proficiency) VALUES
('Next.js', 'Frontend', 90),
('React', 'Frontend', 95),
('Vanilla CSS', 'Frontend', 85),
('Node.js', 'Backend', 90),
('Express.js', 'Backend', 85),
('PostgreSQL', 'Backend', 80);

INSERT INTO projects (title, description, tech_stack, image_url, live_url, github_url) VALUES
(
    'E-Commerce Platform', 
    'A high-performance modern e-commerce platform with a bespoke minimalist UI and seamless checkout.', 
    ARRAY['Next.js', 'Node.js', 'PostgreSQL'],
    '/images/project-ecommerce.jpg',
    'https://example.com',
    'https://github.com/example/ecommerce'
),
(
    'Interactive Dashboard', 
    'Financial analytics dashboard featuring complex data visualization and real-time updates through WebSockets.', 
    ARRAY['React', 'Express', 'D3.js'],
    '/images/project-dashboard.jpg',
    'https://example.com/dashboard',
    'https://github.com/example/dashboard'
);
