const express = require('express');
const {
  userRegister,
  userLogin,
  updateUserPass,
} = require('../controllers/userController');
const router = express.Router();

// @Route POST api/users/register
// @Desc route to register users
// @Access Public
router.post('/register', userRegister);

// @Route Post api/users/login
// @Desc route to login user
// @Access Public
router.post('/login', userLogin);

// @Route Post api/users/update-pass
// @Desc route to update user pass
// @Access Public
router.put('/update-pass', updateUserPass);

module.exports = router;
