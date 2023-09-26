const router = require("express").Router();
const cubeService = require("../services/cubeServices");

router.get("/create", (req, res) => {
  res.render("create");
});

router.post("/create", (req, res) => {
  const { name, description, imageUrl, difficultyLevel } = req.body;
  cubeService.create({
    name,
    description,
    imageUrl,
    difficultyLevel: Number(difficultyLevel),
  });
  res.redirect("/cube/create");
});

router.get("/:cubeId/details", (req, res) => {
  const { cubeId } = req.params;
  let currentCube = cubeService.getCurrentCube(cubeId)
  if(!currentCube) {
    res.redirect("/404");
    return;
  }
  res.render("details", { currentCube });
});
module.exports = router;

// res.render("details", { ...currentCube });
// In template we can use only {{name}}. If we don't use ...currentCube ,then we have to use currentCube.name in the template.