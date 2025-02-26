const jwt = require("jsonwebtoken");

const tokenValidator = (req, res, next) => {
  const token = req.token;
  if (!token) {
    return res.status(401).json({ error: "Token missing or invalid" });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.SECRET);
    req.user = decodedToken;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Token invalid or expired" });
  }
};

module.exports = tokenValidator;
