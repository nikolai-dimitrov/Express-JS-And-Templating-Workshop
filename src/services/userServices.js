const User = require("../models/User");

exports.register = async (userData) => {
  const newUser = await User.create(userData);
  return newUser;
};

// exports.getUsers = async () => {
//   return User.userCollection();
// };
