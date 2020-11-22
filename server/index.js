const config = require('config');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const {ApolloServer} = require('apollo-server');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const userApi = require('./datasouces/userApi')

const server = new ApolloServer({
  context: async ({req}) => {
    try {
      const token = req.headers.authorization;

      if (!token) return {userId: null};

      const decoded = jwt.verify(token, config.get('jwtSecretKey'));

      return {userId: decoded.userId};
    } catch (err) {
      console.log(err);
    }
  },
  typeDefs,
  resolvers,
  dataSources: () => ({
    userApi: userApi,
  })
});

// const io = require('socket.io')(server)
// console.log(io)
// io.on('connection', socket => {
//   console.log('Пользователь присоединился');
//
//   socket.on('disconnect', () => {
//     console.log('Пользователь отсоединился');
//   });
// });

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

// mongoose.connect(config.get('mongoUrl'), {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   useCreateIndex: true
// }).then(() => {
//   const PORT = config.get('port');
//   server.listen(() => {
//     console.log(`Server has been started on port ${PORT}...`);
//   });
// }).catch(err => {
//   console.log(err.message);
//   process.exit(1);
// });