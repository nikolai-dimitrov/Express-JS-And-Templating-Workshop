const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("../lib/jwt");
const { SECRET } = require("../constants");

exports.register = async (userData) => {
  const newUser = await User.create(userData);
  return newUser;
};

exports.login = async (username, password) => {
  const user = await User.findOne({ username });
  if (!user) {
    throw new Error("Invalid username or password");
  }
  const passwordValid = await bcrypt.compare(password, user.password);
  if (!passwordValid) {
    throw new Error("Invalid username or password");
  }
  const payload = {
    _id: user._id,
    username: user.username,
  };
  const token = await jwt.sign(payload, SECRET, { expiresIn: "2d" });
  return token;
};
