const passport = require('passport');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys').secretOrKey;

//load user model
const User = require('../../models/User');

//load register input validation
const validateRegisterInput = require('../../validation/register');

const userRegister = (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  //check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  //check is user already exists
  User.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      errors.email = 'User with the specified email already exists';
      return res.status(400).json(errors);
    } else {
      // create new user
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      });

      //hash user password and save to db
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then((user) => res.json(user))
            .catch((err) => console.log(err));
        });
      });
    }
  });
};

module.exports = userRegister;
