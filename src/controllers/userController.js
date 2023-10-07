const router = require("express").Router();
const userServices = require("../services/userServices");
const { extractErrorMessages } = require("../utils/error");

router.get("/register", (req, res) => {
  res.render("../views/user/register");
});

router.post("/register", async (req, res) => {
  const { username, password, repeatPassword } = req.body;
  try {
    await userServices.register({ username, password, repeatPassword });
    res.redirect("/users/login");
  } catch (err) {
    const errorMessages = extractErrorMessages(err);
    res.render("../views/user/register", { errorMessages });
  }
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

router.get("/logout", async (req, res) => {
  res.clearCookie("auth");
  res.redirect("/");
});
module.exports = router;
