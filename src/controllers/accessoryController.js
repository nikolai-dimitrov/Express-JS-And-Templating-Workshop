const router = require("express").Router();
const accessoryServices = require("../services/accessoryServices");
const cubeServices = require("../services/cubeServices");
const { isAuth } = require("../middlewares/authMiddleware");
const { checkPermission } = require("../utils/auth");

router.get("/create", isAuth, (req, res) => {
  res.render("../views/accessory/create");
});

router.post("/create", isAuth, async (req, res) => {
  let { name, description, imageUrl } = req.body;
  await accessoryServices.create({ name, description, imageUrl });
  res.render("../views/accessory/create");
});
//Check permissions for attach.
router.get("/attach/:cubeId", isAuth, async (req, res) => {
  let { cubeId } = req.params;
  let currentCube = await cubeServices.getCurrentCube(cubeId);
  checkPermission(currentCube.owner, req.user, res);
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
  let currentCube = await cubeServices.getCurrentCubeNotLeaned(cubeId);
  checkPermission(currentCube.owner, req.user, res);
  await accessoryServices.attachAccessory(currentCube, accessoryId);
  res.redirect(`/accessory/attach/${cubeId}`);
});
module.exports = router;
