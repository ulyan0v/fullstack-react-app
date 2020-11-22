const { gql } = require('apollo-server');

const typeDefs = gql`
  type User {
    id: ID!
    firstName: String!
    lastName: String!
    email: String!
    password: String!
    avatar: String
    friends: [User]
    posts: [Post]
  }
  
  type Post {
    id: ID!
    author: User!
    text: String
    nested: String
    timestamp: Int
    likeCount: Int
    comments: [Message] 
  }
  
  type Message {
    id: ID!
    author: User
    text: String
    nested: String
    timestamp: Int
  }
  
  type Auth {
    id: ID
    token: String
  }
  
  type Query {
    users(ids: [ID]): [User]
  }
  
  type Mutation {
    user(id: ID): User
    login(email: String, password: String): Auth
    register(
      email: String,
      password: String,
      firstName: String,
      lastName: String,
    ): Auth
  }
`;

module.exports = typeDefs;

// const {GraphQLObjectType, GraphQLSchema, GraphQLList, GraphQLID, GraphQLString} = require('graphql');
// const {User, UserType} = require('./models/User');
// const bcrypt = require('bcryptjs');
// const config = require('config');
// const jwt = require('jsonwebtoken');
//
// const Query = new GraphQLObjectType({
//   name: 'Query',
//   fields: {
//     users: {
//       type: GraphQLList(UserType),
//       resolve() {
//         return User.find({});
//       }
//     }
//   }
// });
//
// const Mutation = new GraphQLObjectType({
//   name: 'Mutation',
//   fields: {
//     authUser: {
//       type: UserType,
//       args: {
//         email: {type: GraphQLString},
//         password: {type: GraphQLString}
//       },
//       async resolve(parent, args) {
//         const {email, password} = args;
//         const user = await User.findOne({email});
//         if (!user) {
//           throw Error('Неверный логин или пароль');
//         }
//
//         const passwordIsMatch = bcrypt.compare(password, user.password);
//         if (!passwordIsMatch) {
//           throw Error('Неверный логин или пароль');
//         }
//
//         const token = jwt.sign(
//           {userId: user.id},
//           config.get('jwtSecretKey'),
//           {expiresIn: '1h'}
//         );
//
//         return {id: user.id, token, ...user._doc};
//       }
//     },
//     addUser: {
//       type: UserType,
//       args: {
//         firstName: {type: GraphQLString},
//         lastName: {type: GraphQLString},
//         email: {type: GraphQLString},
//         password: {type: GraphQLString}
//       },
//       async resolve(parent, args) {
//         const {firstName, lastName, email, password} = args;
//
//         const candidate = await User.findOne({email});
//         if (candidate) {
//           throw Error('Пользователь уже существует')
//         }
//
//         const hashedPassword = await bcrypt.hash(password, 12);
//
//         const user = new User({
//           firstName,
//           lastName,
//           email,
//           password: hashedPassword
//         });
//         await user.save();
//
//         const token = jwt.sign(
//           {userId: user.id},
//           config.get('jwtSecretKey'),
//           {expiresIn: '1h'}
//         );
//
//         return {id: user.id, token, ...user._doc};
//       }
//     }
//   }
// });
//
//
// module.exports = new GraphQLSchema({
//   query: Query,
//   mutation: Mutation
// });