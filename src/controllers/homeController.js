const router = require("express").Router();
const cubeService = require("../services/cubeServices");
//Test mdw
// function mdw(req, res, next) {
//   console.log('homeController');
//   console.log(req.url)
//   next();
// }
// router.use(mdw)
router.get("/", (req, res) => {
  let { search, from, to } = req.query;
  let cubes = cubeService.getAll(search, from, to);
  res.render("index", { cubes, search, from, to });
});

router.get("/about", (req, res) => {
  res.render("about");
});

router.get("/404", (req, res) => {
  res.render("404");
});
module.exports = router;
