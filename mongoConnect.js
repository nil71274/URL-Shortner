const mongoose = require('mongoose');

async function mongoConnect(url){
    return await mongoose.connect(url);
}

module.exports = {
    mongoConnect
};