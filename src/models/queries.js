const db = require('../db');

module.exports = {
  // ---------------- Users ----------------
  findUserByUsername: async (username) => {
    const [rows] = await db.query('SELECT * FROM users WHERE username=?', [username]);
    return rows[0];
  },
  createUser: async (u) => {
    const [res] = await db.query(
      'INSERT INTO users (username,password,full_name,role_id) VALUES (?,?,?,?)',
      [u.username, u.password, u.full_name, u.role_id]
    );
    return res.insertId;
  },
  getAllUsers: async () => {
    const [rows] = await db.query('SELECT * FROM users');
    return rows;
  },

  // ---------------- Members ----------------
  createMember: async (m) => {
    const [res] = await db.query(
      'INSERT INTO members (user_id, contact, position, address) VALUES (?,?,?,?)',
      [m.user_id, m.contact, m.position, m.address]
    );
    return res.insertId;
  },
  getMembers: async () => {
    const [rows] = await db.query('SELECT * FROM members');
    return rows;
  },

  // ---------------- Projects ----------------
  createProject: async (p) => {
    const [res] = await db.query(
      'INSERT INTO projects (title, category, description, status, start_date, end_date, created_by) VALUES (?,?,?,?,?,?,?)',
      [p.title, p.category, p.description, p.status, p.start_date, p.end_date, p.created_by]
    );
    return res.insertId;
  },
  getProjects: async () => {
    const [rows] = await db.query('SELECT * FROM projects ORDER BY created_at DESC');
    return rows;
  },
  getProjectById: async (id) => {
    const [rows] = await db.query('SELECT * FROM projects WHERE id=?', [id]);
    return rows[0];
  },

  // ---------------- Project Schedules ----------------
  createProjectSchedule: async (s) => {
    const [res] = await db.query(
      'INSERT INTO project_schedules (project_id, title, start_date, end_date, assigned_to, status) VALUES (?,?,?,?,?,?)',
      [s.project_id, s.title, s.start_date, s.end_date, s.assigned_to, s.status || 'pending']
    );
    return res.insertId;
  },
  getProjectSchedules: async (project_id) => {
    const [rows] = await db.query('SELECT * FROM project_schedules WHERE project_id=?', [project_id]);
    return rows;
  },

  // ---------------- Tasks ----------------
  createTask: async (t) => {
    const [res] = await db.query(
      'INSERT INTO tasks (project_id, title, description, assigned_to, due_date, status) VALUES (?,?,?,?,?,?)',
      [t.project_id, t.title, t.description, t.assigned_to, t.due_date, t.status || 'todo']
    );
    return res.insertId;
  },
  getTasksByProject: async (project_id) => {
    const [rows] = await db.query('SELECT * FROM tasks WHERE project_id=? ORDER BY due_date ASC', [project_id]);
    return rows;
  },

  // ---------------- Budgets ----------------
  createBudget: async (b) => {
    const [res] = await db.query(
      'INSERT INTO budgets (project_id, line_item, amount, allocated, spent) VALUES (?,?,?,?,?)',
      [b.project_id, b.line_item, b.amount || 0, b.allocated || 0, b.spent || 0]
    );
    return res.insertId;
  },
  getBudgetsByProject: async (project_id) => {
    const [rows] = await db.query('SELECT * FROM budgets WHERE project_id=?', [project_id]);
    return rows;
  },

  // ---------------- Minutes ----------------
  createMinute: async (m) => {
    const [res] = await db.query(
      'INSERT INTO minutes (title, date, attendees, content, created_by) VALUES (?,?,?,?,?)',
      [m.title, m.date, m.attendees, m.content, m.created_by]
    );
    return res.insertId;
  },
  getMinutes: async () => {
    const [rows] = await db.query('SELECT * FROM minutes ORDER BY date DESC');
    return rows;
  },

  // ---------------- Reports ----------------
  createReport: async (r) => {
    const [res] = await db.query(
      'INSERT INTO reports (project_id, type, data, generated_by) VALUES (?,?,?,?)',
      [r.project_id, r.type, JSON.stringify(r.data), r.generated_by]
    );
    return res.insertId;
  },
  getReportsByProject: async (project_id) => {
    const [rows] = await db.query('SELECT * FROM reports WHERE project_id=? ORDER BY generated_at DESC', [project_id]);
    return rows;
  }
};
