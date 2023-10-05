const router = require("express").Router();
const cubeService = require("../services/cubeServices");
const accessoryServices = require(".././services/accessoryServices");

router.get("/create", (req, res) => {
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
  if (!currentCube) {
    res.redirect("/404");
    return;
  }
  let cubeAccessories = await accessoryServices.getCubeAccessories(currentCube);
  console.log(cubeAccessories);
  res.render("../views/cube/details", { currentCube, cubeAccessories });
});
router.get("/delete/:cubeId", async (req, res) => {
  const currentCube = await cubeService.getCurrentCube(req.params.cubeId);
  console.log(currentCube);
  res.render("../views/cube/delete", {currentCube});
});
module.exports = router;

// res.render("details", { ...currentCube });
// In template we can use only {{name}}. If we don't use ...currentCube ,then we have to use currentCube.name in the template.
