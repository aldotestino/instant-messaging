/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL subscription operation: NewMessageSubscription
// ====================================================

export interface NewMessageSubscription_newMessage_user {
  __typename: "User";
  id: string;
  username: string;
  avatar: string | null;
}

export interface NewMessageSubscription_newMessage {
  __typename: "Message";
  id: string;
  content: string;
  createdAt: any;
  user: NewMessageSubscription_newMessage_user | null;
}

export interface NewMessageSubscription {
  newMessage: NewMessageSubscription_newMessage | null;
}
