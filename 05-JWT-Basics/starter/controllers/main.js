const jwt = require("jsonwebtoken"); // we use this package to sign the token
const CustomAPIError = require("../errors/custom-error");

const login = async (req, res) => {
  const { username, password } = req.body;

  // Available options or operations to perform after receiving username and password from the user
  // mongoose validation
  // Joi
  //  check in the controller

  if (!username || !password) {
    throw new CustomAPIError("Please Provide email and password", 400);
  }

  // just for Demo, normally provided by the DB!
  const id = new Date().getDate();

  // try to keep the payload small, better experience for user
  const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  }); // the first argument is payload. JWT_SECRET is used to sign the token
  res.status(200).json({ msg: "user created", token });
};

const dashboard = async (req, res) => {
  //   console.log(req.headers);
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    throw new CustomAPIError("No token provided", 401); // 401 is the authentication error
  }

  const token = authHeader.split(" ")[1];
  console.log(token);

  // verifying the token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // console.log(decoded);
    const luckyNumber = Math.floor(Math.random() * 100);
    res.status(200).json({
      msg: `Hello, ${decoded.username}`,
      secret: `Here is your authorised data, your lucky number is ${luckyNumber}`,
    });
  } catch (error) {
    throw new CustomAPIError("Not authorised to access this route", 401);
  }
};

module.exports = { login, dashboard };
