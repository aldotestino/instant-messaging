/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: MessagesQuery
// ====================================================

export interface MessagesQuery_messages_user {
  __typename: "User";
  id: string;
  username: string;
  avatar: string | null;
}

export interface MessagesQuery_messages {
  __typename: "Message";
  id: string;
  content: string;
  createdAt: any;
  user: MessagesQuery_messages_user | null;
}

export interface MessagesQuery {
  messages: MessagesQuery_messages[];
}
