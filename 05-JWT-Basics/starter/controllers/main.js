const jwt = require("jsonwebtoken"); // we use this package to sign the token
const {BadRequestError} = require("../errors");

const login = async (req, res) => {
  const { username, password } = req.body;

  // Available options or operations to perform after receiving username and password from the user
  // mongoose validation
  // Joi
  //  check in the controller

  if (!username || !password) {
    throw new BadRequestError("Please Provide email and password");
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
  //   console.log(token);
  console.log(req.user); // req.user is received from authMiddleware


  const luckyNumber = Math.floor(Math.random() * 100);
  res.status(200).json({
    msg: `Hello, ${req.user.username}`,
    secret: `Here is your authorised data, your lucky number is ${luckyNumber}`,
  });
};

module.exports = { login, dashboard };
