const express = require('express');
const userRegister = require('../controllers/userController');
const router = express.Router();

// @Route POST api/users/register
// @Desc route to register users
// @Access Public
router.post('/register', userRegister);

module.exports = router;
