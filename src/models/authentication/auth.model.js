const pool = require('../../db'); 

exports.findUserByUsername = async (username) => {
  const [rows] = await pool.execute(
    'SELECT id, username, password, full_name, role_id FROM users WHERE username = ?',
    [username]
  );
  return rows[0];
};

exports.createUser = async ({ username, password, full_name, role_id }) => {
  const [result] = await pool.execute(
    'INSERT INTO users (username, password, full_name, role_id) VALUES (?, ?, ?, ?)',
    [username, password, full_name, role_id]
  );
  return result.insertId;
};

exports.getRoles = async () => {
  const [rows] = await pool.execute('SELECT id, name FROM roles');
  return rows;
};

exports.createMember = async ({ user_id, contact, position, address }) => {
  const [result] = await pool.execute(
    'INSERT INTO members (user_id, contact, position, address) VALUES (?, ?, ?, ?)',
    [user_id, contact, position, address]
  );
  return result.insertId;
};

exports.createProject = async ({ title, category, description, status, start_date, end_date, created_by }) => {
  const [result] = await pool.execute(
    'INSERT INTO projects (title, category, description, status, start_date, end_date, created_by) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [title, category, description, status, start_date, end_date, created_by]
  );
  return result.insertId;
};

exports.createProjectSchedule = async ({ project_id, title, start_date, end_date, assigned_to, status }) => {
  const [result] = await pool.execute(
    'INSERT INTO project_schedules (project_id, title, start_date, end_date, assigned_to, status) VALUES (?, ?, ?, ?, ?, ?)',
    [project_id, title, start_date, end_date, assigned_to, status]
  );
  return result.insertId;
};

exports.createTask = async ({ project_id, title, description, assigned_to, due_date, status }) => {
  const [result] = await pool.execute(
    'INSERT INTO tasks (project_id, title, description, assigned_to, due_date, status) VALUES (?, ?, ?, ?, ?, ?)',
    [project_id, title, description, assigned_to, due_date, status]
  );
  return result.insertId;
};

exports.createBudget = async ({ project_id, line_item, amount, allocated, spent }) => {
  const [result] = await pool.execute(
    'INSERT INTO budgets (project_id, line_item, amount, allocated, spent) VALUES (?, ?, ?, ?, ?)',
    [project_id, line_item, amount, allocated, spent]
  );
  return result.insertId;
};

exports.createMinute = async ({ title, date, attendees, content, created_by }) => {
  const [result] = await pool.execute(
    'INSERT INTO minutes (title, date, attendees, content, created_by) VALUES (?, ?, ?, ?, ?)',
    [title, date, attendees, content, created_by]
  );
  return result.insertId;
};

exports.createReport = async ({ project_id, type, data, generated_by }) => {
  const [result] = await pool.execute(
    'INSERT INTO reports (project_id, type, data, generated_by) VALUES (?, ?, ?, ?)',
    [project_id, type, JSON.stringify(data), generated_by]
  );
  return result.insertId;
};