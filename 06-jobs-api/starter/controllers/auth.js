const User = require('../models/User');
const {StatusCodes} = require('http-status-codes');
const {BadRequestError} = require('../errors');
const bcrypt = require('bcryptjs'); // this library is used for hashing the password


const register = async (req, res) => {
  
    const {name, email, password} = req.body;
    // setting up the hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    const tempUser = {name, email, password:hashedPassword};
    const user = await User.create({...tempUser}) // here we want mongoose to do all the validation
    res.status(StatusCodes.CREATED).json(user);
}

const login = async (req, res) => {
    res.send('login user');
}

module.exports = {
    register, login
};