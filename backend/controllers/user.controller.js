const User = require('../models/user.model');
// const {v4: uuidv4} = require('uuid');
const {setUser} = require('../services/auth.service');

async function handleCreateUser(req, res){
    const {name, email, password} = req.body;

    await User.create({
        name: name,
        email: email, 
        password: password,
    });
    return res.redirect('/login');
};

async function handleLoginUser(req, res){
    const {email, password} = req.body;
    const user = await User.findOne({email, password});
    if (!user) return res.render('login', {
        error: 'Invalid email or password'
    });

    // const sessionId = uuidv4();
    const token = setUser(user);
    res.cookie('token', token);
    return res.redirect('/');
    // return res.json({'token': jwtSign});
};

function handleUserLogout(req, res){
    res.clearCookie('token');
    return res.redirect('/login');
};

module.exports = {
    handleCreateUser,
    handleLoginUser,
    handleUserLogout
};