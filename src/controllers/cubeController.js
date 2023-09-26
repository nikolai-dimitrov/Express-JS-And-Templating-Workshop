const router = require("express").Router();

router.get("/", (req, res) => {
//   res.render("index");
  res.send('welcome cube');
});

router.get("/create", (req, res) => {
      res.render("create");
    });

module.exports = router;