const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/reportController');
const auth = require('../middleware/auth');
router.post('/generate', auth, ctrl.generate);
router.get('/list', auth, ctrl.list);
module.exports = router;
