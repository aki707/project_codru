const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const bodyParser = require("body-parser");

//const Student = require("./models/studentSchema.js");
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const port = process.env.PORT;
const path = require("path");

dotenv.config({ path: "./config.env" });
require("./db/conn.js");

const Student = require("./models/studentSchema.js");

app.use(require("./router/studentauth.js"));

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.send("Hello there!");
});

app.listen(port, () => {
  console.log(`Server is listening at ${port}`);
});
