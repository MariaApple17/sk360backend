const db = require('../db');

function checkRole(allowed = []){
  return async (req, res, next) =>{
    try{
      const [[roleRow]] = await db.query('SELECT name FROM roles WHERE id=?', [req.user.role_id]);
      const roleName = roleRow && roleRow.name;
      if (!roleName) return res.status(403).json({ message: 'No role' });
      if (allowed.includes(roleName) || roleName === 'Chairman') return next();
      return res.status(403).json({ message: 'Forbidden' });
    }catch(err){ console.error(err); res.status(500).json({ error: 'server error' }); }
  }
}

module.exports = checkRole;
