/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: LoginMutation
// ====================================================

export interface LoginMutation_login_user {
  __typename: "User";
  id: string;
  username: string;
  email: string;
  avatar: string | null;
}

export interface LoginMutation_login {
  __typename: "AuthPayload";
  token: string | null;
  user: LoginMutation_login_user | null;
}

export interface LoginMutation {
  login: LoginMutation_login | null;
}

export interface LoginMutationVariables {
  username: string;
  password: string;
}
