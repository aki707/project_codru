const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const port = process.env.PORT;
const path = require("path");

dotenv.config({ path: "./config.env" });
require("./db/conn.js");

app.use(require("./router/userauth.js"));
app.use(require("./router/blogauth.js"));

app.use(express.static(path.join(__dirname, "public")));

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

app.post("/contactus", (req, res) => {
  const { email, name, city, phone, message } = req.body;

  if (!email || !name || !message || !city || !phone) {
    return res.status(400).send("All fields are required");
  }

  const mailOptions = {
    from: process.env.EMAIL,
    replyTo: email,
    to: process.env.EMAIL,
    subject: `Contact form submission from ${name}`,
    text: `
      Name: ${name}
      Email: ${email}
      City: ${city}
      Phone: ${phone}
      Message: ${message}
    `
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      return res.status(500).send("Error sending message");
    } else {
      console.log("Email sent: " + info.response);
      return res.send("Message sent successfully");
    }
  });
});


app.get("/", (req, res) => {
  res.send("Hello there!");
});

app.listen(port, () => {
  console.log(`Server is listening at ${port}`);
});

app.post("/blogs", async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ error: "Empty field(s)" });
    }

    const bloggerLogin = await Blogger.findOne({ username: username });

    if (bloggerLogin) {
      const isMatched = await bcrypt.compare(password, studentLogin.password);
      const token = await bloggerLogin.generateAuthToken();
      console.log(token);

      res.cookie("jwtoken", token, {
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      });

      if (!isMatched) {
        res.status(400).json({ error: "Wrong Credentials" });
      } else {
        res.json({ message: "You are in", bloggerLogin });
      }
    } else {
      res.status(400).json({ error: "Wrong Credentials" });
    }
  } catch (err) {
    console.log(err);
  }
});

// const s = require("crypto").randomBytes(64).toString("hex");
