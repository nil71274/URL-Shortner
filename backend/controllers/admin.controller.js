const URL = require("../models/url.model");
const User = require("../models/user.model");

async function handleViewAll(req, res){
    const users = await User.find({});
    const urls = await URL.find({});
    return res.render('admin',{
        users: users,
        urls, urls
    });
};

function handleAdminLogout(req, res){
    res.clearCookie('token');
    return res.redirect('/login');
};

module.exports = {
    handleViewAll,
    handleAdminLogout
};