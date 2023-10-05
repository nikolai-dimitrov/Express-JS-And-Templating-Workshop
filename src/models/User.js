const mongoose = require("mongoose");

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

const User = mongoose.model("User", userSchema);
module.exports = User;
