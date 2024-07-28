const {getUser} = require('../services/auth.service');

function authenticateUser(req, res, next){
    // const token = req.headers['authorization']?.split(' ')[1];
    const token = req.cookies?.token;
    req.user = null;
    if(!token){
        next();
    }else{
        const user = getUser(token);
        if(!user){
            next();
        } else {
            req.user = user;
            next();
        }
    }
}

function restrictTo(roles=[]){
    return function(req, res, next){
    if(!req.user) return res.redirect('/login');
    if(!roles.includes(req.user.role)) return res.end('UnAuthorized');

    next();
    }
}

module.exports = {
    authenticateUser,
    restrictTo
}