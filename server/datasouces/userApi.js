const User = require('../models/User');
const jwt = require("jsonwebtoken");
const config = require('config');
const bcrypt = require('bcryptjs');

module.exports.getUser = async id => {
  return await User.findById(id);
}

module.exports.getUsers = async () => {
  return await User.find({});
}

module.exports.login = async (email, password) => {
  const user = await User.findOne({email});

  if (!user) throw new Error('Неверный логие или пароль');

  const passwordIsMatch = bcrypt.compare(password, user.password);
  if (!passwordIsMatch) throw Error('Неверный логин или пароль');

  const token = jwt.sign(
    {userId: user.id},
    config.get('jwtSecretKey'),
    {expiresIn: '1h'}
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
    {expiresIn: '1h'}
  );

  return {id: user.id, token};
}