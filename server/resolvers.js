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
    },
    messages: async (_, {id}, context) => {
      if (!context.userId) return null;
      return context.dataSources.messageApi.getMessages(context.userId, id)
    }
  },
  Mutation: {
    login: async (_, {email, password}, {dataSources}) => {
      return await dataSources.userApi.login(email, password);
    },
    register: async (_, args, {dataSources}) => {
      return await dataSources.userApi.register(args);
    },
    toggleSubscribe: async (_, {id}, context) => {
      if (!context.userId) return null;
      return await context.dataSources.userApi.toggleSubscribe(context.userId, id)
    },
    sendMessage: async (_, {id, text}, context) => {
      if (!context.userId) return null;
      return context.dataSources.messageApi.addMessage(context.userId, id, text);
    }
  }

};