const queries = require('../models/queries');

exports.createTask = async (req, res) => {
  try {
    const id = await queries.createTask(req.body);
    res.json({ id });
  } catch (err) { console.error(err); res.status(500).json({ error: 'Server error' }); }
};

exports.getTasksByProject = async (req, res) => {
  try {
    const tasks = await queries.getTasksByProject(req.params.project_id);
    res.json(tasks);
  } catch (err) { console.error(err); res.status(500).json({ error: 'Server error' }); }
};
