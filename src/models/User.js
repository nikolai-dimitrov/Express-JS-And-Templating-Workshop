const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  username: {
    type: "string",
  },

  password: {
    type: "string",
  },
});
// repeatPassword -> we pass to the model.create as extra parameter (we don't have it in to schema)
// We can validate fields without save them to the database.
userSchema.virtual("repeatPassword").set(function (value) {
  if (value !== this.password) {
    throw new mongoose.MongooseError("Passwords do not match!");
  }
});

userSchema.pre("save", async function () {
  const hashPassword = await bcrypt.hash(this.password, 10);
  this.password = hashPassword;
});

const User = mongoose.model("User", userSchema);
module.exports = User;
