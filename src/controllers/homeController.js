const router = require("express").Router();
//Test mdw
// function mdw(req, res, next) {
//   console.log('homeController');
//   console.log(req.url)
//   next();
// }
// router.use(mdw)

router.get("/", (req, res) => {
  res.render("index");
});

router.get("/about", (req, res) => {
  res.render("about");
});

router.get("/404", (req, res) => {
  res.render("404");
});
module.exports = router;
