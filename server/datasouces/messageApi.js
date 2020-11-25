const Message = require('../models/Message');

module.exports.getMessages = async (currentUserId, userId) => {
  console.log(currentUserId, userId)

  const messages1 = await Message.find({from: currentUserId, to: userId});
  const messages2 = await Message.find({to: currentUserId, from: userId});

  return [...messages1, ...messages2].sort((a, b) => a.timestamp - b.timestamp);
}

module.exports.addMessage = async (from, to, text) => {
  const message = new Message({from, to, text});

  return await message.save();
}