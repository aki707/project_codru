const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const cors = require("cors");
const path = require("path");
const { Server } = require("socket.io");

dotenv.config({ path: "./config.env" });

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
    credentials: true,
  })
);

app.use(express.static(path.join(__dirname, "public")));

require("./db/conn.js");
const User = require("./models/userSchema");
const Student = require("./models/studentSchema");
const Teacher = require("./models/teacherSchema");
app.use(require("./router/userauth.js"));
app.use(require("./router/blogauth.js"));
app.use(require("./router/courseauth.js"));
// app.use(require("./router/googleauth.js"));

let notifications = {};

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
    `,
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

app.post("/notifications", async (req, res) => {
  try {
    const { usernames } = req.body;

    const users = await User.find({ username: { $in: usernames } });
    if (!users) {
      return res.json({ error: "Users not found" });
    }

    const userNotifications = {};
    for (const user of users) {
      userNotifications[user.username] = notifications[user.username] || [];
    }

    res.status(200).json(userNotifications);
  } catch (error) {
    console.error("Error finding users:", error);
    res.status(500).json({ error: "Server error" });
  }
});

app.post("/notifications/push", async (req, res) => {
  const { usernames, message } = req.body;

  try {
    const users = await User.find({ username: { $in: usernames } });
    if (!users) {
      return res.json({ error: "Users not found" });
    }
    for (const user of users) {
      if (!notifications[user.username]) {
        notifications[user.username] = [];
      }

      const newNotification = {
        message,
        date: new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" }),
      };

      notifications[user.username].push(newNotification);

      io.to(user.username).emit("notification", newNotification);
    }

    res.status(201).json({ message: "Notifications sent" });
  } catch (error) {
    console.error("Error finding users:", error);
    res.status(500).json({ error: "Server error" });
  }
});

app.get("/count", async (req, res) => {
  try {
    const userCount = await User.countDocuments();
    const studentCount = await Student.countDocuments();
    const teacherCount = await Teacher.countDocuments();

    res.json({
      userCount: userCount,
      studentCount: studentCount,
      teacherCount: teacherCount,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error occurred" });
  }
});

app.get("/users", async (req, res) => {
  try {
    const users = await User.find(
      {},
      { _id: 0, name: 1, username: 1, email: 1, phone: 1, role: 1, photo: 1 }
    ).lean(); //projection on these fields
    res.json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error occurred" });
  }
});

app.delete("/user/:username", async (req, res) => {
  try {
    const { username } = req.params;
    const { role } = req.body;

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ error: "User doesn't exist." });
    }

    let deleted;
    if (role === "Student") {
      deleted = await Student.deleteOne({ username });
    } else if (role === "Teacher") {
      deleted = await Teacher.deleteOne({ username });
    } else {
      return res.status(403).json({ error: "Invalid role." });
    }

    if (deleted.deletedCount === 0) {
      return res.status(500).json({ error: "Failed to delete user." });
    }

    await User.deleteOne({ username });

    return res.status(200).json({ message: "User deleted successfully." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error." });
  }
});

app.put("/assignTask/:username", (req, res) => {
  try {
    const user = User.findOne({ username: req.params.username });
    if (!user) {
      return res.status(404).json({ error: "User doesn't exist." });
    }
    const student = Student.findOneAndUpdate(
      { username: req.params.username },
      {
        $push: {
          tasks: {
            week: req.body.week,
            question: req.body.question,
            answer: req.body.answer,
            link: req.body.link,
          },
        },
      },
      { new: true }
    );
    if (!student) {
      return res.status(404).json({ error: "Student not found." });
    }

    res.status(200).json({ message: "Task assigned successfully." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error." });
  }
});

const cleanupOldNotifications = () => {
  const oneDay = 24 * 60 * 60 * 1000;
  const now = Date.now().toLocaleString("en-US", { timeZone: "Asia/Kolkata" });

  for (const username in notifications) {
    notifications[username] = notifications[username].filter((notification) => {
      const notificationDate = new Date(notification.date).getTime();
      return now - notificationDate < oneDay;
    });

    if (notifications[username].length === 0) {
      delete notifications[username];
    }
  }
};

setInterval(cleanupOldNotifications, 60 * 60 * 1000);

const server = app.listen(port, () => {
  console.log(`Server is listening at ${port}`);
});

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("join", (username) => {
    if (!username) {
      console.log("Received invalid username:", username);
      return;
    }
    socket.join(username);
    console.log(`${username} joined`);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});
