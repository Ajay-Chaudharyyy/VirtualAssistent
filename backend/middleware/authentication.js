const jwt = require("jsonwebtoken");
const User = require("../Model/UserModel");

exports.authenticate = (req, res, next) => {
  try {
    let token = req.cookies.token;
    if (!token && req.headers.authorization) {
      const [bearer, tokenValue] = req.headers.authorization.split(" ");
      if (bearer === "Bearer") token = tokenValue;
    }
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token not found, please login or signup 🤢🤢👍👍",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({
        success: false,
        message: "Invalid token, please login or signup",
      });
    }
    req.userId = decoded?.userId;
    next();
  } catch (err) {
    console.error("Authentication error:", err);
    res
      .status(401)
      .json({
        success: false,
        message: "Authentication failed",
        error: err.message,
      });
  }
};
