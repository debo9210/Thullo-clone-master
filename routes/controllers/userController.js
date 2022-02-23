const passport = require('passport');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys').secretOrKey;

//load user model
const User = require('../../models/User');

//load register input validation
const validateRegisterInput = require('../../validation/register');

//load login input validation
const validateLoginInput = require('../../validation/login');

//load update password input validation
const validateUpdatePasswordInput = require('../../validation/updatePassword');

//register user controller
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
            .then(() => res.json({ registered: true }))
            .catch((err) => console.log(err));
        });
      });
    }
  });
};

// login user controller / return jwt token
const userLogin = (req, res) => {
  // console.log(req.body);
  const { errors, isValid } = validateLoginInput(req.body);

  //check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  // find user by email
  User.findOne({ email }).then((user) => {
    //check for user
    if (!user) {
      errors.email = 'User not found, register yet?';
      return res.status(400).json(errors);
    }

    //check password
    bcrypt.compare(password, user.password).then((isMatch) => {
      //user matched
      if (isMatch) {
        //user matched

        //create jwt payload
        const payload = {
          id: user._id,
          name: user.name,
          email: user.email,
          password: user.password,
        };

        //sign Token
        jwt.sign(payload, keys, { expiresIn: 3600 * 2 }, (err, token) => {
          if (err) throw err;

          res.json({
            success: true,
            token: `Bearer ${token}`,
          });
        });
      } else {
        errors.password = 'Password incorrect';
        return res.status(400).json(errors);
      }
    });
  });
};

//update password
const updateUserPass = (req, res) => {
  // console.log(req.body);
  const { errors, isValid } = validateUpdatePasswordInput(req.body);

  if (!isValid) {
    console.log(errors);
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then((user) => {
    if (!user) {
      errors.email = 'No user with the specified email';
      return res.status(400).json(errors);
    }

    bcrypt.compare(req.body.password, user.password).then((isMatch) => {
      if (!isMatch) {
        errors.password = 'Password does not match with saved credentials';
        return res.status(400).json(errors);
      }
    });

    //hash new user password and save to db
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(req.body.newPass, salt, (err, hash) => {
        if (err) throw err;
        user.password = hash;
        user
          .save()
          .then(() => res.json({ passUpdated: true }))
          .catch((err) => console.log(err));
      });
    });
  });
};

module.exports = {
  userRegister,
  userLogin,
  updateUserPass,
};
