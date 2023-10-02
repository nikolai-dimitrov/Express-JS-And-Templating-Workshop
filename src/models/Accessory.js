const mongoose = require("mongoose");
const modelValidators = require("../validators/modelValidators");

const accessorySchema = new mongoose.Schema({
  name: {
    type: "string",
    required: [true, "This is required"],
  },
  imageUrl: {
    type: "string",
    required: [true, "This is required"],
  },
  description: {
    type: "string",
    required: [true, "This is required"],
    maxLength: [30,'Description must be at less 30 characters'],
  },
  cubes: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Cube",
    },
  ],
});
accessorySchema
  .path("imageUrl")
  .validate(modelValidators.validateUrl, "This field must be image url");

const Accessory = mongoose.model("Accessory", accessorySchema);
module.exports = Accessory;
