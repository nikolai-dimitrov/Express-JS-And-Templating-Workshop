//Imports
const express = require("express");
const expressConfig = require("./config/expressConfig");
const handlebarsConfig = require("./config/handlebarsConfig");
const routes = require("./router");
const { PORT } = require("./constants");
// Local Variables
const app = express();
// const PORT = 5050;

// Configs
expressConfig(app);
handlebarsConfig(app);

// Routing 
app.use(routes)
// app.get('/',homeController);


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
