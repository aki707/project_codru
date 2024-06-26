const mongoose = require("mongoose");
const DB = process.env.DATABASE;
mongoose
  .connect(DB, {
    serverSelectionTimeoutMS: 15000,
  })
  .then(() => {
    console.log("Connection Successful");
  })
  .catch((err) => console.log("Connection Error:", err));
