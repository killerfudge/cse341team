const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.body.token;
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, process.env.TOKEN_KEY);
  } catch (err) {
    err.statusCode = 500;
    throw err;
  }
  if (!decodedToken) {
    const error = new Error("Token was not authenticated");
    error.statusCode = 401;
    throw error;
  }
  req.userId = decodedToken.userId;

  if (req.userId != req.body._userId) {
    const error = new Error("You are not authorized to make this change.");
    error.statusCode = 401;
    throw error;
  }

  next();
};
