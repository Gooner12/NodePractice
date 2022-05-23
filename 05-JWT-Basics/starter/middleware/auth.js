const jwt = require("jsonwebtoken"); // we use this package to sign the token
const { UnauthenticatedError } = require("../errors");

const authenticationMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    throw new UnauthenticatedError("No token provided"); // 401 is the authentication error
  }

  const token = authHeader.split(" ")[1];

  // verifying the token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { id, username } = decoded;
    req.user = { id, username };
    next();
    // console.log(decoded);
  } catch (error) {
    throw new UnauthenticatedError("Not authorised to access this route");
  }
};

module.exports = authenticationMiddleware;
