const queries = require('../models/queries');

exports.createBudget = async (req, res) => {
  try {
    const id = await queries.createBudget(req.body);
    res.json({ id });
  } catch (err) { console.error(err); res.status(500).json({ error: 'Server error' }); }
};

exports.getBudgetsByProject = async (req, res) => {
  try {
    const budgets = await queries.getBudgetsByProject(req.params.project_id);
    res.json(budgets);
  } catch (err) { console.error(err); res.status(500).json({ error: 'Server error' }); }
};
