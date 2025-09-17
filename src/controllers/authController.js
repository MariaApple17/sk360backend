const queries = require('../models/queries');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  try {
    const { username, password, full_name, role_id } = req.body;
    const existing = await queries.findUserByUsername(username);
    if (existing) return res.status(400).json({ message: 'Username exists' });

    const hashed = await bcrypt.hash(password, 10);
    const id = await queries.createUser({ username, password: hashed, full_name, role_id });
    res.json({ id });
  } catch (err) { console.error(err); res.status(500).json({ error: 'Server error' }); }
};


exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await queries.findUserByUsername(username);
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user.id, role_id: user.role_id }, process.env.JWT_SECRET || 'secret', { expiresIn: '12h' });
    res.json({ token, user: { id: user.id, username: user.username, full_name: user.full_name, role_id: user.role_id } });
  } catch (err) { console.error(err); res.status(500).json({ error: 'Server error' }); }
};
