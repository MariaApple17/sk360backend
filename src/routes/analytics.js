const express = require('express');
const router = express.Router();
const analytics = require('../controllers/analyticsController');
const auth = require('../middleware/auth');
router.get('/budget-by-project', auth, analytics.budgetByProject);
module.exports = router;
