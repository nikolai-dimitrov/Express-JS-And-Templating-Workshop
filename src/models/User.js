const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: "string",
  },

  password: {
    type: "string",
  },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
