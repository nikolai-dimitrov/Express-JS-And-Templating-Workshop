const router = require("express").Router();

router.get("/register", (req, res) => {
  res.render("../views/user/register");
});
module.exports = router;
