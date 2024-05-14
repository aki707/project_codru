const express =require("express");
const app =express();
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const bodyParser = require("body-parser");

//const Student = require("./models/studentSchema.js");
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const port = process.env.PORT;

app.get("/",(rerq,res)=>{
    res.send("Hello there!")
})

app.listen(port,()=>{
    console.log(`Server is listening at ${port}`)
})