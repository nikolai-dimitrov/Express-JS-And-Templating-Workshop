//Imports
const express = require("express");
const expressConfig = require("./config/expressConfig");
const handlebarsConfig = require("./config/handlebarsConfig");
const { PORT } = require("./constants");
// Local Variables
const app = express();
// const PORT = 5050;

// Configs
expressConfig(app);
handlebarsConfig(app);

// Routing 
app.get("/", (req, res) => {
  res.render("index");
});


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
