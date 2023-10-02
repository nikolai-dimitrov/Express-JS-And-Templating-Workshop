//Imports
const express = require("express");
const expressConfig = require("./config/expressConfig");
const handlebarsConfig = require("./config/handlebarsConfig");
const routes = require("./router");
const { PORT } = require("./constants");
const connectDb = require("./config/mongooseConfig");
// Local Variables
const app = express();

function startApp() {
  try {
    expressConfig(app);
    handlebarsConfig(app);
    connectDb();

    // Routing
    app.use(routes);

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.log(err);
  }
}
startApp();

// Configs
// expressConfig(app);
// handlebarsConfig(app);
// connectDb();

// // Routing
// app.use(routes);
// // app.get('/',homeController);

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
