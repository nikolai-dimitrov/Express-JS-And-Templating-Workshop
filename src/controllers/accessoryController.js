const router = require("express").Router();
const accessoryServices = require("../services/accessoryServices");
const cubeServices = require("../services/cubeServices");
const { isAuth } = require("../middlewares/authMiddleware");

router.get("/create", isAuth, (req, res) => {
  res.render("../views/accessory/create");
});

router.post("/create", isAuth, async (req, res) => {
  let { name, description, imageUrl } = req.body;
  await accessoryServices.create({ name, description, imageUrl });
  res.render("../views/accessory/create");
});

router.get("/attach/:cubeId", isAuth, async (req, res) => {
  let { cubeId } = req.params;
  let currentCube = await cubeServices.getCurrentCube(cubeId);
  let availableAccessories = await accessoryServices.getNotOwnedAccessories(
    currentCube.accessories
  );
  res.render("../views/accessory/attach", {
    availableAccessories,
    currentCube,
  });
});

router.post("/attach/:cubeId", isAuth, async (req, res) => {
  let { cubeId } = req.params;
  let accessoryId = req.body.accessory;
  let currentCube = await cubeServices.getCurrentCubeNotLeaned(cubeId); //To do in accessory service.
  await accessoryServices.attachAccessory(currentCube, accessoryId);
  res.redirect(`/accessory/attach/${cubeId}`);
});
module.exports = router;
