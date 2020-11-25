module.exports = {
  Query: {
    confirmAuth: (_, __, {userId}) => {
      if (userId) return {success: true};
      return {success: false}
    },
    user: async (parent, {id}, context) => {
      if (!context.userId) return null;
      return await context.dataSources.userApi.getUser(context.userId, id);
    },
    users: async (_, {subscriptionsOnly}, context) => {
      return await context.dataSources.userApi.getUsers(context.userId, subscriptionsOnly);
    }
  },
  Mutation: {
    toggleSubscribe: async (_, {id}, context) => {
      if (!context.userId) return null;
      await context.dataSources.userApi.toggleSubscribe(context.userId, id)
    },
    login: async (_, {email, password}, {dataSources}) => {
      return await dataSources.userApi.login(email, password);
    },
    register: async (_, args, {dataSources}) => {
      return await dataSources.userApi.register(args);
    }
  }

};