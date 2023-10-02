const mongoose = require("mongoose");
const modelValidators = require("../validators/modelValidators");

const cubeSchema = new mongoose.Schema({
  name: {
    type: "string",
    required: [true, "This is required"],
  },
  description: {
    type: "string",
    required: [true, "This is required"],
    maxLength: [30, "Description must be at less 30 characters"],
  },
  imageUrl: {
    type: "string",
    required: [true, "This is required"],
  },
  difficultyLevel: {
    type: "Number",
    required: [true, "This is required"],
  },
  accessories: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Accessory",
    },
  ],
});

cubeSchema
  .path("imageUrl")
  .validate(modelValidators.validateUrl, "This field must be image url");

cubeSchema.path("difficultyLevel").validate((value) => {
  if (value >= 1 || value <= 6) {
    return true;
  }
}, "Cube difficulty level must be between 1 and 6");

const Cube = mongoose.model("Cube", cubeSchema);
module.exports = Cube;
