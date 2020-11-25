const config = require('config');
const mongoose = require('mongoose');
const User = require('./models/User');
const Message = require('./models/Message');

const clear = async () => {
  await mongoose.connect(config.get('mongoUrl'), {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  });

  const users = await User.find({});

  for (const user of users) {
    await User.findByIdAndDelete(user._id);
  }

  const messages = await Message.find({});

  for (const message of messages) {
    await User.findByIdAndDelete(message._id);
  }

  await mongoose.disconnect();
}

clear().catch(err => {
  console.log(err);
});





