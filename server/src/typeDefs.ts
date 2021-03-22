import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type User {
    id: ID!
    email: String!
    username: String!
    avatar: String
    messages: [Message!]!
  }

  type Message {
    id: ID!
    createdAt: DateTime!
    content: String!
    user: User
  }

  type Query {
    messages: [Message!]!
    me: User
  }

  type Subscription {
    newMessage: Message
  }

  type Mutation {
    signup(email: String!, username: String!, avatar: String, password: String!): Boolean!
    login(username: String!, password: String!): AuthPayload
    update(newUsername: String!, newAvatar: String): User
    changePassword(oldPassword: String, newPassword: String!): Boolean!
    deleteAccount: Boolean!
    post(content: String!): Message 
  }

  type AuthPayload {
    token: String
    user: User
  }

  scalar DateTime
`;