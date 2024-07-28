// const userAndSessionIdMap = new Map();   //stateful authentication
const jwt = require('jsonwebtoken');
const secret = "hdsahdk@*&#*@DHAH3232";

function setUser(user){
    // userAndSessionIdMap.set(id, user);
    return jwt.sign({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
    }, secret);
}

function getUser(token){
    // return userAndSessionIdMap.get(id);
    
    return jwt.verify(token, secret);
}

module.exports = {
    getUser,
    setUser
}