const db = require('../db');
exports.budgetByProject = async (req, res) =>{
  try{
    const [rows] = await db.query(`
      SELECT p.id, p.title as project, p.category, SUM(b.amount) as total_budget, SUM(b.allocated) as total_allocated, SUM(b.spent) as total_spent
      FROM projects p
      LEFT JOIN budgets b ON b.project_id = p.id
      GROUP BY p.id ORDER BY p.title
    `);
    res.json(rows.map(r=>({ project: r.project, category: r.category, total_budget: Number(r.total_budget || 0), total_allocated: Number(r.total_allocated || 0), total_spent: Number(r.total_spent || 0) })));
  }catch(err){ console.error(err); res.status(500).json({ error: 'server error' }); }
};
