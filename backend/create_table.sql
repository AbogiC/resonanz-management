-- Create database
CREATE DATABASE IF NOT EXISTS sheet_music_db;

-- Use the database
USE sheet_music_db;

-- Create sheet_music table
CREATE TABLE IF NOT EXISTS sheet_music (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  composer VARCHAR(255) NOT NULL,
  quantity INT NOT NULL DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert sample data
INSERT INTO sheet_music (title, composer, quantity) VALUES
('Sample Song 1', 'Composer A', 10),
('Sample Song 2', 'Composer B', 5);