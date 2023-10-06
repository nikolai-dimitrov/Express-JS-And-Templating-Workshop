const router = require("express").Router();
const cubeService = require("../services/cubeServices");
const accessoryServices = require(".././services/accessoryServices");
const { isAuth } = require("../middlewares/authMiddleware");

router.get("/create", isAuth, (req, res) => {
  res.render("../views/cube/create");
});

router.post("/create", async (req, res) => {
  const { name, description, imageUrl, difficultyLevel } = req.body;
  await cubeService.create({
    name,
    description,
    imageUrl,
    difficultyLevel: Number(difficultyLevel),
    owner: req.user._id,
  });
  res.redirect("/cube/create");
});

router.get("/:cubeId/details", async (req, res) => {
  const { cubeId } = req.params;
  let currentCube = await cubeService.getCurrentCube(cubeId);
  const [ownerId] = currentCube.owner;
  const isOwner = currentCube.owner == req.user._id;

  if (!currentCube) {
    res.redirect("/404");
    return;
  }
  let cubeAccessories = await accessoryServices.getCubeAccessories(currentCube);
  res.render("../views/cube/details", {
    currentCube,
    cubeAccessories,
    isOwner,
  });
});

router.get("/delete/:cubeId", isAuth, async (req, res) => {
  const currentCube = await cubeService.getCurrentCube(req.params.cubeId);
  console.log(currentCube);
  res.render("../views/cube/delete", { currentCube });
});

router.post("/delete/:cubeId", isAuth, async (req, res) => {
  await cubeService.delete(req.params.cubeId);
  res.redirect("/");
});

router.get("/edit/:cubeId", isAuth, async (req, res) => {
  let currentCube = await cubeService.getCurrentCube(req.params.cubeId);
  res.render("../views/cube/edit", { currentCube });
});

router.post("/edit/:cubeId", isAuth, async (req, res) => {
  const { name, description, imageUrl, difficultyLevel } = req.body;
  await cubeService.update(req.params.cubeId, {
    name,
    description,
    imageUrl,
    difficultyLevel,
  });
  res.redirect(`/cube/${req.params.cubeId}/details`);
});
module.exports = router;

// res.render("details", { ...currentCube });
// In template we can use only {{name}}. If we don't use ...currentCube ,then we have to use currentCube.name in the template.
