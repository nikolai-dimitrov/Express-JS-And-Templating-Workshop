let Accessory = require("./../models/Accessory");

exports.create = async (accessoryData) => {
  console.log(accessoryData);
  const newAccessory = await Accessory.create(accessoryData);
  return newAccessory;
};

exports.attachAccessory = async (cube, accessoryId) => {
  await cube.populate("accessories");
  await cube.accessories.push(accessoryId);
  return cube.save();
};

exports.getNotOwnedAccessories = async (accessoryIds) => {
  return Accessory.find({ _id: { $nin: accessoryIds } }).lean();
};

exports.getCubeAccessories = async (cube) => {
  let accessoryIds = cube.accessories;
  let accessories = await Accessory.find({})
    .where("_id")
    .in(accessoryIds)
    .lean();
  return accessories;
};
