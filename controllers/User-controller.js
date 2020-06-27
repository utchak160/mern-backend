const User = require('../models/User');

const getAllUsers = async (req, res, next) => {
    let users;
    try {
        users = await User.find({}, -password);
    } catch (e) {
        return res.status(404).send({message: 'No user found'});
    }
    if (!users || users.length === 0) {
        return res.status(404).send({message: 'No users found'});
    }
    res.json({users: users.map(user => user.toObject( { getters: true} ))});
};

const signup = async (req, res, next) => {
    const { name, email, password } = req.body;
    const user = new User({
        name,
        email,
        password,
        image: 'https://www.freecodecamp.org/news/content/images/2020/04/Copy-of-Copy-of-Travel-Photography-1.png',
        places: []
    });
    const createdUser = await user.save();
    if (!name || !email || !password || !createdUser) {
        return res.status(422).send({error: 'Please fill out all the credentials'});
    }
    console.log(createdUser);
    res.status(201).json({message: 'Registered Successfully', user: createdUser});
};

const login = (req, res, next) => {
    const {email, password} = req.body;
    User.findOne({email: email}).then((user) => {
        if (!user) {
            return res.status(404).send({
                message: 'Register first and then login'
            })
        }
        if (user.password !== password) {
            return res.status(422).send({
                message: 'Incorrect password'
            })
        }
        res.status(200).json({
            message: 'Login Success',
            user: user
        });
    })
};

module.exports = {
    getAllUsers,
    signup,
    login
};
