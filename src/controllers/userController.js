const router = require("express").Router();
const userServices = require("../services/userServices");
router.get("/register", (req, res) => {
  res.render("../views/user/register");
});

router.post("/register", async (req, res) => {
  const { username, password, repeatPassword } = req.body;
  await userServices.register({username, password, repeatPassword});
  res.redirect("users/login");
});

module.exports = router;
