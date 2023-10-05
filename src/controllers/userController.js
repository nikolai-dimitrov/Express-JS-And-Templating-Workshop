const router = require("express").Router();
const userServices = require("../services/userServices");

router.get("/register", (req, res) => {
  res.render("../views/user/register");
});

router.post("/register", async (req, res) => {
  const { username, password, repeatPassword } = req.body;
  await userServices.register({ username, password, repeatPassword });
  res.redirect("/users/login");
});

router.get("/login", async (req, res) => {
  res.render("../views/user/login");
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const token = await userServices.login(username, password);
  res.cookie("auth", token, { httpOnly: true }); //{ httpOnly: true ,maxAge: 3600 }
  res.redirect("/");
});
module.exports = router;
