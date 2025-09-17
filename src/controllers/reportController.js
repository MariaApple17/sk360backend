const queries = require('../models/queries');

exports.createReport = async (req, res) => {
  try {
    const id = await queries.createReport(req.body);
    res.json({ id });
  } catch (err) { console.error(err); res.status(500).json({ error: 'Server error' }); }
};

exports.getReportsByProject = async (req, res) => {
  try {
    const reports = await queries.getReportsByProject(req.params.project_id);
    res.json(reports);
  } catch (err) { console.error(err); res.status(500).json({ error: 'Server error' }); }
};
