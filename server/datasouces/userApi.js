const User = require('../models/User');
const jwt = require("jsonwebtoken");
const config = require('config');
const bcrypt = require('bcryptjs');

const TOKEN_EXPIRES_IN = '1h';

module.exports.getUser = async (userId, id) => {
  const currentUser = await User.findById(userId);

  if (id) {
    const user = await User.findById(id);
    const isSubscribed = currentUser.friends.includes(id);

    return {...user._doc, isSubscribed};
  }

  return currentUser;
}

module.exports.getUsers = async (userId, friendsOnly) => {
  if (!friendsOnly) return await User.find({});

  const currentUser = await User.findById(userId);

  const friends = [];
  for (const id of currentUser.friends) {
    friends.push(await User.findById(id));
  }

  return friends;
}

module.exports.toggleSubscribe = async (currentUserId, id) => {
  const currentUser = await User.findById(currentUserId);

  if (currentUser.friends.includes(id)) {
    currentUser.friends.pull({_id: id});
  } else {
    currentUser.friends.push(id);
  }

  await currentUser.save();
  return {success: true}
}

module.exports.login = async (email, password) => {
  const user = await User.findOne({email});

  if (!user) throw new Error('Неверный логие или пароль');

  const passwordIsMatch = bcrypt.compare(password, user.password);
  if (!passwordIsMatch) throw Error('Неверный логин или пароль');

  const token = jwt.sign(
    {userId: user.id},
    config.get('jwtSecretKey'),
    {expiresIn: TOKEN_EXPIRES_IN}
  );

  return {id: user.id, token};
}

module.exports.register = async ({firstName, lastName, email, password}) => {
  const candidate = await User.findOne({email});

  if (candidate) throw new Error('Пользователь уже существует');

  const hashedPassword = await bcrypt.hash(password, 12);

  const user = new User({
    firstName,
    lastName,
    email,
    password: hashedPassword
  });

  await user.save();

  const token = jwt.sign(
    {userId: user.id},
    config.get('jwtSecretKey'),
    {expiresIn: TOKEN_EXPIRES_IN}
  );

  return {id: user.id, token};
}