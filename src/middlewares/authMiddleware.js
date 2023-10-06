const jwt = require("../lib/jwt");
const { SECRET } = require("../constants");

exports.auth = async (req, res, next) => {
  const token = req.cookies["auth"];
  if (token) {
    try {
      const user = await jwt.verify(token, SECRET);
      //set user data into req (access user in all requests)
      req.user = user;
      //set user and other variables into locals (easy accessible in all views .hbs)
      res.locals.user = user;
      res.locals.isAuthenticated = true;

      next();
    } catch (err) {
      res.clearCookies("auth");
      res.redirect("/users/login");
    }
  } else {
    next();
  }
};

exports.isAuth = async (req, res, next) => {
  if (!req.user) {
    res.redirect("/users/login");
  }
  next();
};
