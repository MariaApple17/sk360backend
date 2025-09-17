const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
const auth = require('../middleware/auth');
const checkRole = require('../middleware/role');
router.post('/', auth, checkRole(['Secretary','Treasurer','Member']), projectController.create);
router.get('/', auth, projectController.list);
module.exports = router;
