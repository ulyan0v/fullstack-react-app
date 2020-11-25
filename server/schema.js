const { gql } = require('apollo-server');

const typeDefs = gql`
  type Auth {
    id: ID!
    token: String!
  }

  type User {
    id: ID!
    firstName: String!
    lastName: String!
    email: String!
    password: String!
    isSubscribed: Boolean
    avatar: String
    subscriptions: [User]
  }
  
  type Message {
    from: ID!
    to: ID!
    text: String!
  }
  
  type Response {
    success: Boolean!
    message: String
  }
  
  type Query {
    confirmAuth: Response 
    user(id: ID): User
    users(subscriptionsOnly: Boolean): [User]
    messages(id: ID!): [Message]
  }
  
  type Mutation {
    login(email: String, password: String): Auth
    register(
      email: String,
      password: String,
      firstName: String,
      lastName: String,
    ): Auth
    toggleSubscribe(id: ID!): Response
    sendMessage(id: ID!, text: String!): Message
  }
`;

module.exports = typeDefs;