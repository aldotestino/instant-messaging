import { ChangePasswordMutationVariables } from '../__generated__/ChangePasswordMutation';
import { LoginMutationVariables } from '../__generated__/LoginMutation';
import { SignupMutationVariables } from '../__generated__/SignupMutation';
import { UpdateMutationVariables } from '../__generated__/UpdateMutation';

const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
const URL_REGEX = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([-.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/i;

export function validateSignupArgs(values: SignupMutationVariables) {
  const errors: Partial<SignupMutationVariables> = {}; 

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

export function validateLoginArgs(values: LoginMutationVariables) {
  const errors: Partial<LoginMutationVariables> = {}; 

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

export function validateUpdateArgs(values: UpdateMutationVariables) {
  const errors: Partial<UpdateMutationVariables> = {}; 

  if (!values.newUsername) {
    errors.newUsername = 'Required';
  } else if (values.newUsername.length < 3) {
    errors.newUsername = 'Must be 3 characters or more';
  }

  if(values.newAvatar && !URL_REGEX.test(values.newAvatar) && values.newAvatar !== '') {
    errors.newAvatar = 'Invalid URL';
  }

  return errors;
};

export function validateChangePasswordArgs(values: ChangePasswordMutationVariables) {
  const errors: Partial<ChangePasswordMutationVariables> = {}; 

  if (!values.oldPassword) {
    errors.oldPassword = 'Required';
  } else if (values.oldPassword.length < 5) {
    errors.oldPassword = 'Must be 5 characters or more';
  }

  if (!values.newPassword) {
    errors.newPassword = 'Required';
  } else if (values.newPassword.length < 5) {
    errors.newPassword = 'Must be 5 characters or more';
  }

  return errors;
};