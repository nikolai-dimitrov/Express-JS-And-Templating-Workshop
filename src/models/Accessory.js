const mongoose = require("mongoose");
const modelValidators = require("../validators/modelValidators");

const accessorySchema = new mongoose.Schema({
  name: {
    type: "string",
    required: [true, "This is required"],
    minLength: [5, "Name must be more than 5 characters."],
    validate: [
      {
        validator: modelValidators.validateAlphaNumCharacters,
        message: "Name must be letters and digits only.",
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
  cubes: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Cube",
    },
  ],
});

const Accessory = mongoose.model("Accessory", accessorySchema);
module.exports = Accessory;
