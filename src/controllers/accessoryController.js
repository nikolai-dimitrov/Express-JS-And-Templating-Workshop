const router = require("express").Router();
const accessoryServices = require("../services/accessoryServices");
const cubeServices = require("../services/cubeServices");
router.get("/create", (req, res) => {
  res.render("../views/accessory/create");
});

router.post("/create", async (req, res) => {
  let { name, description, imageUrl } = req.body;
  await accessoryServices.create({ name, description, imageUrl });
  res.render("../views/accessory/create");
});

router.get("/attach/:cubeId", async (req, res) => {
  let { cubeId } = req.params;
  let currentCube = await cubeServices.getCurrentCube(cubeId);
  let availableAccessories = await accessoryServices.getNotOwnedAccessories(currentCube.accessories);
  res.render("../views/accessory/attach", { availableAccessories, currentCube });
});

router.post("/attach/:cubeId", async (req, res) => {
  let { cubeId } = req.params;
  let accessoryId = req.body.accessory
  let currentCube = await cubeServices.getCurrentCubeNotLeaned(cubeId); //To do in accessory service.
  await accessoryServices.attachAccessory(currentCube, accessoryId);
  res.redirect(`/accessory/attach/${cubeId}`);
});
module.exports = router;
