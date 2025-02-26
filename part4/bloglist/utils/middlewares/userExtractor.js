const jwt = require("jsonwebtoken");
const User = require("../../models/user");

const userExtractor = async (req, res, next) => {
  const token = req.token;

  if (!token) {
    return res.status(401).json({ error: "Token missing or invalid" });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.SECRET);
    const user = await User.findById(decodedToken.id);

    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Token invalid or expired" });
  }
};

module.exports = userExtractor;
