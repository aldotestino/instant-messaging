import { ChangePasswordMutationVariables } from '../__generated__/ChangePasswordMutation';
import { LoginMutationVariables } from '../__generated__/LoginMutation';
import { SignupMutationVariables } from '../__generated__/SignupMutation';
import { UpdateMutationVariables } from '../__generated__/UpdateMutation';

const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
const URL_REGEX = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([-.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/i;

export function validateSignupArgs(values: SignupMutationVariables) {
  const errors: Partial<SignupMutationVariables> = {}; 

  if (!values.email) {
    errors.email = 'Campo obbligatorio';
  } else if (!EMAIL_REGEX.test(values.email)) {
    errors.email = 'Email invalida';
  }

  if (!values.username) {
    errors.username = 'Campo obbligatorio';
  } else if (values.username.length < 3) {
    errors.username = 'Deve contenere almeno 3 caratteri';
  }

  if (!values.password) {
    errors.password = 'Campo obbligatorio';
  } else if (values.password.length < 5) {
    errors.password = 'Deve contenere almeno 5 caratteri';
  }

  if(values.avatar && !URL_REGEX.test(values.avatar) && values.avatar !== '') {
    errors.avatar = 'Url invalido';
  }

  return errors;
};

export function validateLoginArgs(values: LoginMutationVariables) {
  const errors: Partial<LoginMutationVariables> = {}; 

  if (!values.username) {
    errors.username = 'Campo obbligatorio';
  } else if (values.username.length < 3) {
    errors.username = 'Deve contenere almeno 3 caratteri';
  }

  if (!values.password) {
    errors.password = 'Campo obbligatorio';
  } else if (values.password.length < 5) {
    errors.password = 'Deve contenere almeno 5 caratteri';
  }

  return errors;
};

export function validateUpdateArgs(values: UpdateMutationVariables) {
  const errors: Partial<UpdateMutationVariables> = {}; 

  if (!values.newUsername) {
    errors.newUsername = 'Campo obbligatorio';
  } else if (values.newUsername.length < 3) {
    errors.newUsername = 'Deve contenere almeno 3 caratteri';
  }

  if(values.newAvatar && !URL_REGEX.test(values.newAvatar) && values.newAvatar !== '') {
    errors.newAvatar = 'Url invalido';
  }

  return errors;
};

export function validateChangePasswordArgs(values: ChangePasswordMutationVariables) {
  const errors: Partial<ChangePasswordMutationVariables> = {}; 

  if (!values.oldPassword) {
    errors.oldPassword = 'Campo obbligatorio';
  } else if (values.oldPassword.length < 5) {
    errors.oldPassword = 'Deve contenere almeno 5 caratteri';
  }

  if (!values.newPassword) {
    errors.newPassword = 'Campo obbligatorio';
  } else if (values.newPassword.length < 5) {
    errors.newPassword = 'Deve contenere almeno 5 caratteri';
  }

  return errors;
};