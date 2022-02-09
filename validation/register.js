const Validator = require('validator');
const isEmpty = require('./isEmpty');

module.exports = validateRegisterInput = (data) => {
  const regex =
    /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{6,30}$/;

  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : '';
  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';
  data.password2 = !isEmpty(data.password2) ? data.password2 : '';

  if (!Validator.isLength(data.name, { min: 2, max: 20 })) {
    errors.name = 'Name must be between 2 and 20 characters';
  }

  if (Validator.isEmpty(data.name)) {
    errors.name = 'Name field is required';
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = 'Email is invalid';
  }

  if (Validator.isEmail(data.email)) {
    errors.email = 'Email field is required';
  }

  //   if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
  //     errors.password = 'Password must be between 6 and 30 characters';
  //   }

  if (!regex.test(data.password)) {
    errors.password =
      'Password must be atleast one upper case, lowercase, number, symbol and must be between 6 and 30 characters';
  }

  if (!Validator.isEmpty(data.password)) {
    errors.password = 'Password field is required';
  }

  if (!Validator.isEmpty(data.password2)) {
    errors.password = 'Confirm password field is required';
  }

  if (!Validator.equals(data.password, data.password2)) {
    errors.password = 'Password must be identical';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
