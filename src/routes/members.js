const express = require('express');
const router = express.Router();
const members = require('../controllers/membersController');
const auth = require('../middleware/auth');
const checkRole = require('../middleware/role');
router.post('/register', auth, checkRole(['Chairman','Secretary']), members.registerMember);
router.get('/list', auth, checkRole(['Chairman','Secretary','Treasurer']), members.listMembers);
module.exports = router;
