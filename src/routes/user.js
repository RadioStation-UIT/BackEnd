const express = require('express');
const router = express.Router();

const userController = require('../app/controller/userController');

router.get('/',userController.getAllUser);
router.post('/register',userController.RegisterUser);
router.get('/track-by-userId', userController.authenticateToken ,userController.getMusicByUserId);

module.exports = router; 