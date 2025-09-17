const queries = require('../models/queries');

exports.createProject = async (req, res) => {
  try {
    const id = await queries.createProject(req.body);
    res.json({ id });
  } catch (err) { console.error(err); res.status(500).json({ error: 'Server error' }); }
};

exports.getProjects = async (req, res) => {
  try {
    const projects = await queries.getProjects();
    res.json(projects);
  } catch (err) { console.error(err); res.status(500).json({ error: 'Server error' }); }
};
