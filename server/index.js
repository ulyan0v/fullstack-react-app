const config = require('config');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const {ApolloServer} = require('apollo-server');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const userApi = require('./datasouces/userApi');
const messageApi = require('./datasouces/messageApi');

const server = new ApolloServer({
  context: async ({req}) => {
    try {
      const token = req.headers.authorization;
      if (!token) return {userId: null};

      const decoded = jwt.verify(token, config.get('jwtSecretKey'));
      // console.log(token)
      return {userId: decoded.userId};
    } catch (err) {}
  },
  typeDefs,
  resolvers,
  dataSources: () => ({
    userApi: userApi,
    messageApi: messageApi
  })
});

const io = require('socket.io')(4001, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

mongoose.connect(config.get('mongoUrl'), {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
}).then(() => {
  return server.listen();
}).then(({url}) => {
  console.log(`Server ready at ${url}`);
}).catch(err => {
  console.log(err.message);
  process.exit(1);
});