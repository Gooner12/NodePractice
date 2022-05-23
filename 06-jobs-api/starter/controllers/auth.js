const User = require('../models/User');
const {StatusCodes} = require('http-status-codes');
const {BadRequestError} = require('../errors');


const register = async (req, res) => {
    // This block of code will validate user details in this controller file but we can validate using mongoose as well
    const {name, email, password} = req.body;
    if(!name || !email || !password){
        throw new BadRequestError('Please provide name, email and password');
    }
    const user = await User.create({...req.body}) // here we want mongoose to do all the validation
    res.status(StatusCodes.CREATED).json(user);
}

const login = async (req, res) => {
    res.send('login user');
}

module.exports = {
    register, login
};