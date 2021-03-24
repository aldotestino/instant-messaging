/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpdateMutation
// ====================================================

export interface UpdateMutation_update {
  id: string;
  username: string;
  avatar: string | null;
}

export interface UpdateMutation {
  update: UpdateMutation_update | null;
}

export interface UpdateMutationVariables {
  newUsername: string;
  newAvatar: string;
}
