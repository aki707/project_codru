const jwt = require("jsonwebtoken");
const User = require("../models/userSchema");
const bcrypt = require("bcrypt");

const authenticate = async (req, res, next) => {
  try {
    const token = req.cookies.jwtoken;
    if (!token) {
      return res.status(401).json({ error: "Unauthorized: No token provided" });
    }

    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    const user = await User.findOne({ _id: verified._id });

    if (!user) {
      return res.status(401).json({ error: "Unauthorized: User not found" });
    }

    const hashedUsername = await bcrypt.hash(user.username, 10);

    req.token = token;
    req.user = user;
    req.userId = user._id;
    req.hashedUsername = hashedUsername; 
    

    next();
  } catch (err) {
    res.status(401).json({ error: "Unauthorized: Invalid token" });
  }
};

module.exports = authenticate;
