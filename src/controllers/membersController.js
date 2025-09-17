const db = require('../db');
exports.registerMember = async (req, res) => {
  try{
    const { username, password, full_name, role_id, contact, position, address } = req.body;
    const bcrypt = require('bcryptjs');
    const hashed = await bcrypt.hash(password, 10);
    const [r] = await db.query('INSERT INTO users (username,password,full_name,role_id) VALUES (?,?,?,?)', [username, hashed, full_name, role_id]);
    await db.query('INSERT INTO members (user_id,contact,position,address) VALUES (?,?,?,?)', [r.insertId, contact, position, address]);
    res.json({ id: r.insertId });
  }catch(err){ console.error(err); res.status(500).json({ error: 'server error' }); }
};

exports.listMembers = async (req, res) => {
  try{
    const [rows] = await db.query('SELECT u.id,u.username,u.full_name,r.name as role, m.contact,m.position,m.address FROM users u LEFT JOIN roles r ON u.role_id=r.id LEFT JOIN members m ON m.user_id=u.id ORDER BY u.id DESC');
    res.json(rows);
  }catch(err){ console.error(err); res.status(500).json({ error: 'server error' }); }
};
