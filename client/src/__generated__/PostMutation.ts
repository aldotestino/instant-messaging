/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: PostMutation
// ====================================================

export interface PostMutation_post {
  __typename: "Message";
  id: string;
}

export interface PostMutation {
  post: PostMutation_post | null;
}

export interface PostMutationVariables {
  content: string;
}
