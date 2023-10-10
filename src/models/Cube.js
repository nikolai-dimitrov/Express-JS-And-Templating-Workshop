const mongoose = require("mongoose");
const modelValidators = require("../validators/modelValidators");

const cubeSchema = new mongoose.Schema({
  name: {
    type: "string",
    required: [true, "This is required"],
    minLength: [5, "Name must be at least 5 characters."],
    validate: [
      {
        validator: modelValidators.validateAlphaNumCharacters,
        message: "Name must consist of alphanumeric characters.",
      },
    ],
  },
  description: {
    type: "string",
    required: [true, "This is required"],
    minLength: [20, "Description must be more than 20 characters."],
    validate: [
      {
        validator: modelValidators.validateAlphaNumCharacters,
        message: "Description must consist of alphanumeric characters.",
      },
    ],
  },
  imageUrl: {
    type: "string",
    required: [true, "This is required"],
    validate: [
      {
        validator: modelValidators.validateUrl,
        message: "Image field must be valid url.",
      },
    ],
  },
  difficultyLevel: {
    type: "Number",
    required: [true, "This is required"],
    validate: {
      validator: function (value) {
        return value >= 1 || value <= 6 ? true : false;
      },
      message: "Cube difficulty level must be between 1 and 6.",
    },
  },
  accessories: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Accessory",
    },
  ],
  owner: [
    {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  ],
});

const Cube = mongoose.model("Cube", cubeSchema);
module.exports = Cube;
