module.exports = {
  Query: {
    users: async (parent, args, {dataSources}) => {
      return await dataSources.userApi.getUsers();
    }
  },
  Mutation: {
    user: async (parent, {id}, context) => {
      if (!context.userId) console.log('Нету id')
      if (!id) id = context.userId;
      return await context.dataSources.userApi.getUser(id);
    },
    login: async (_, {email, password}, context) => {
      return await context.dataSources.userApi.login(email, password);
    },
    register: async (parents, args, {dataSources}) => {
      return await dataSources.userApi.register(args);
    }
  }

};