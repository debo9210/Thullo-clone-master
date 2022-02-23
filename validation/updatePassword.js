const Validator = require('validator');
const { isEmpty, regex } = require('./isEmpty');

module.exports = validateUpdatePasswordInput = (data) => {
  const errors = {};

  data.newPass = !isEmpty(data.newPass) ? data.newPass : '';
  data.newPass2 = !isEmpty(data.newPass2) ? data.newPass2 : '';

  if (Validator.isEmpty(data.newPass)) {
    errors.newPass = 'New Password field is required';
  }

  if (data.newPass) {
    if (!regex.test(data.newPass)) {
      errors.newPass =
        'Password must be atleast one upper case, lowercase, number, symbol and must be between 6 and 30 characters';
    }
  }

  if (Validator.isEmpty(data.newPass2)) {
    errors.newPass2 = 'Confirm New Password field is required';
  }

  if (!Validator.equals(data.newPass, data.newPass2)) {
    errors.newPass2 = 'Password must be identical';
  }

  if (data.password) {
    if (Validator.equals(data.newPass, data.password)) {
      errors.newPass = "New and old password can't be identical";
    }
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
