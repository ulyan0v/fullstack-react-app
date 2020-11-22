const config = require('config');
const mongoose = require('mongoose');
const User = require('./models/User');

const clearUsers = async () => {
  await mongoose.connect(config.get('mongoUrl'), {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  });

  const users = await User.find({});

  for (const user of users) {
    await User.findByIdAndDelete(user._id);
  }

  await mongoose.disconnect();
}

clearUsers().catch(err => {
  console.log(err);
});