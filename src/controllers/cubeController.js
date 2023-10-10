const router = require("express").Router();
const cubeService = require("../services/cubeServices");
const accessoryServices = require(".././services/accessoryServices");
const { generateDifficultyLevelViewOpts } = require("../utils/views");
const { checkPermission } = require("../utils/auth");
const { isAuth } = require("../middlewares/authMiddleware");
const { extractErrorMessages } = require("../utils/error");

router.get("/create", isAuth, (req, res) => {
  res.render("../views/cube/create");
});

router.post("/create", isAuth, async (req, res) => {
  const { name, description, imageUrl, difficultyLevel } = req.body;
  try {
    await cubeService.create({
      name,
      description,
      imageUrl,
      difficultyLevel: Number(difficultyLevel),
      owner: req.user._id,
    });
    res.redirect("/cube/create");
  } catch (err) {
    const errorMessages = extractErrorMessages(err);
    res.render("../views/cube/create", { errorMessages });
  }
});

router.get("/:cubeId/details", async (req, res) => {
  const { cubeId } = req.params;
  let currentCube = await cubeService.getCurrentCube(cubeId);
  const isOwner = currentCube.owner?.toString() === req.user?._id;

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
  checkPermission(currentCube.owner, req.user, res);
  const options = generateDifficultyLevelViewOpts(currentCube.difficultyLevel);
  res.render("../views/cube/delete", { currentCube, options });
});

router.post("/delete/:cubeId", isAuth, async (req, res) => {
  const currentCube = await cubeService.getCurrentCube(req.params.cubeId);
  checkPermission(currentCube.owner, req.user, res);
  await cubeService.delete(req.params.cubeId);
  res.redirect("/");
});

router.get("/edit/:cubeId", isAuth, async (req, res) => {
  let currentCube = await cubeService.getCurrentCube(req.params.cubeId);
  checkPermission(currentCube.owner, req.user, res);
  const options = generateDifficultyLevelViewOpts(currentCube.difficultyLevel);
  res.render("../views/cube/edit", { currentCube, options });
});

router.post("/edit/:cubeId", isAuth, async (req, res) => {
  const { name, description, imageUrl, difficultyLevel } = req.body;
  let currentCube = await cubeService.getCurrentCube(req.params.cubeId);
  checkPermission(currentCube.owner, req.user, res);
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
