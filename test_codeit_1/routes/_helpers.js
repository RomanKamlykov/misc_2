function validateParams([key, value]) {
  let error;
  switch (key) {
    case 'email': {
      const isValid = value.match(/\b[\w.-]+@[\w.-]+\.\w{2,4}\b/gi);
      if (!isValid) error = 'Email is invalid';
      break;
    }
    case 'login': {
      const isValid = value.length > 0;
      if (!isValid) error = 'You must enter a login';
      break;
    }
    case 'real_name': {
      const isValid = value.length > 0;
      if (!isValid) error = 'You must enter a name';
      break;
    }
    case 'password': {
      const isValid = value.length >= 6;
      if (!isValid) error = 'The password is too short';
      break;
    }
    case 'birth_date': {
      const isValid = value.length > 0;
      if (!isValid) error = 'You must enter a date';
      break;
    }
    case 'is_agree': {
      const isValid = value === true;
      if (!isValid) error = 'You must agree with terms and conditions';
      break;
    }
    case 'country': {
      const isValid = value.length > 0;
      if (!isValid) error = 'You must choose a country';
      break;
    }
    default: {
      break;
    }
  }

  return error;
}

module.exports = { validateParams };
