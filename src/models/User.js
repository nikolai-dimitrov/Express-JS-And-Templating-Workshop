const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const modelValidators = require("../validators/modelValidators");

const userSchema = new mongoose.Schema({
  username: {
    type: "string",
    minLength: [5, "Username should be at least 5 characters."],
    validate: [
      {
        //Access model and find entity in the validator.
        validator: async function (value) {
          return (await mongoose
            .model("User")
            .findOne({ username: this.username }))
            ? false
            : true;
        },
        message: "Username already exists.",
      },
      {
        validator: function (value) {
          return /^[A-Za-z0-9]+$/.test(value);
        },
        message: "Username must be letters and digits only.",
      },
    ],
  },
  password: {
    type: "string",
    minLength: [8, "Password must be at least 8 characters."],
    validator: function (value) {
      return /^[A-Za-z0-9]+$/.test(value);
    },
    message: "Password must be letters and digits only.",
  },
});
// repeatPassword -> we pass to the model.create as extra parameter (we don't have it in to schema)
// We can validate fields without save them to the database.
userSchema.virtual("repeatPassword").set(function (value) {
  if (value !== this.password) {
    throw new Error("Passwords do not match!");
  }
});

userSchema.pre("save", async function () {
  const hashPassword = await bcrypt.hash(this.password, 10);
  this.password = hashPassword;
});

const User = mongoose.model("User", userSchema);
module.exports = User;
