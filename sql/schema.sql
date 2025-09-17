CREATE DATABASE IF NOT EXISTS sk360;
USE sk360;

-- Roles
CREATE TABLE IF NOT EXISTS roles (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(50) NOT NULL UNIQUE
);

-- Users
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  full_name VARCHAR(255),
  role_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (role_id) REFERENCES roles(id)
);

-- Members
CREATE TABLE IF NOT EXISTS members (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  contact VARCHAR(100),
  position VARCHAR(100),
  address TEXT,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Projects
CREATE TABLE IF NOT EXISTS projects (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  category VARCHAR(100),
  description TEXT,
  status ENUM('planned','scheduled','in_progress','completed','on_hold','cancelled') DEFAULT 'planned',
  start_date DATE NULL,
  end_date DATE NULL,
  created_by INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (created_by) REFERENCES users(id)
);

-- Project schedules
CREATE TABLE IF NOT EXISTS project_schedules (
  id INT AUTO_INCREMENT PRIMARY KEY,
  project_id INT,
  title VARCHAR(255),
  start_date DATE,
  end_date DATE,
  assigned_to INT,
  status ENUM('pending','done','in_progress') DEFAULT 'pending',
  FOREIGN KEY (project_id) REFERENCES projects(id),
  FOREIGN KEY (assigned_to) REFERENCES users(id)
);

-- Tasks
CREATE TABLE IF NOT EXISTS tasks (
  id INT AUTO_INCREMENT PRIMARY KEY,
  project_id INT,
  title VARCHAR(255),
  description TEXT,
  assigned_to INT,
  due_date DATE,
  status ENUM('todo','doing','done') DEFAULT 'todo',
  FOREIGN KEY (project_id) REFERENCES projects(id),
  FOREIGN KEY (assigned_to) REFERENCES users(id)
);

-- Budgets
CREATE TABLE IF NOT EXISTS budgets (
  id INT AUTO_INCREMENT PRIMARY KEY,
  project_id INT,
  line_item VARCHAR(255),
  amount DECIMAL(12,2) DEFAULT 0,
  allocated DECIMAL(12,2) DEFAULT 0,
  spent DECIMAL(12,2) DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (project_id) REFERENCES projects(id)
);

-- Minutes
CREATE TABLE IF NOT EXISTS minutes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255),
  date DATE,
  attendees TEXT,
  content TEXT,
  created_by INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (created_by) REFERENCES users(id)
);

-- Reports
CREATE TABLE IF NOT EXISTS reports (
  id INT AUTO_INCREMENT PRIMARY KEY,
  project_id INT,
  type ENUM('progress','financial','accomplishment') NOT NULL,
  data JSON,
  generated_by INT,
  generated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (project_id) REFERENCES projects(id),
  FOREIGN KEY (generated_by) REFERENCES users(id)
);

-- Insert roles
INSERT IGNORE INTO roles (id,name) VALUES 
(1,'Chairman'),
(2,'Secretary'),
(3,'Treasurer'),
(4,'Member');
