const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/budgetController');
const auth = require('../middleware/auth');
const checkRole = require('../middleware/role');
router.post('/', auth, checkRole(['Treasurer','Chairman']), ctrl.record);
router.put('/:id/allocate', auth, checkRole(['Treasurer','Chairman']), async (req,res)=>{
  // expects { allocated }
  const { allocated } = req.body; const budget_id = req.params.id; req.body.budget_id = budget_id; await ctrl.allocate(req,res);
});
router.get('/', auth, ctrl.list);
module.exports = router;
