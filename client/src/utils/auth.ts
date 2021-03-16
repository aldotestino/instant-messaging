const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
const URL_REGEX = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([-.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/i;

export interface SignupArgs {
  email: string
  username: string
  password: string
  avatar?: string
}

export interface LoginArgs {
  username: string
  password: string
}


export function validateSignupArgs(values: SignupArgs) {
  const errors: Partial<SignupArgs> = {}; 

  if (!values.email) {
    errors.email = 'Required';
  } else if (!EMAIL_REGEX.test(values.email)) {
    errors.email = 'Invalid email address';
  }

  if (!values.username) {
    errors.username = 'Required';
  } else if (values.username.length < 3) {
    errors.username = 'Must be 3 characters or more';
  }

  if (!values.password) {
    errors.password = 'Required';
  } else if (values.password.length < 5) {
    errors.password = 'Must be 5 characters or more';
  }

  if(values.avatar && !URL_REGEX.test(values.avatar) && values.avatar !== '') {
    errors.avatar = 'Invalid URL';
  }

  return errors;
};

export function validateLoginArgs(values: LoginArgs) {
  const errors: Partial<SignupArgs> = {}; 

  if (!values.username) {
    errors.username = 'Required';
  } else if (values.username.length < 3) {
    errors.username = 'Must be 3 characters or more';
  }

  if (!values.password) {
    errors.password = 'Required';
  } else if (values.password.length < 5) {
    errors.password = 'Must be 5 characters or more';
  }

  return errors;
};