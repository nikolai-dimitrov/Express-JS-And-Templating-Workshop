const mongoose = require("mongoose");
const { CONNECTION_STR, DB_NAME } = require("../constants");

async function connectDb() {
  try {
    await mongoose.connect(`${CONNECTION_STR}/${DB_NAME}`);
    console.log(
      `Connected to DB ${CONNECTION_STR}/${DB_NAME} successfully.`
    );
  } catch (err) {
    throw err;
  }
}
module.exports = connectDb;
