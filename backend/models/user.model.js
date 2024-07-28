const mongoose = require('mongoose');
const {createHmac, randomBytes} = require('crypto');

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    role:{
        type: String,
        required: true,
        default: 'USER',
    },
    password: {
        type: String,
        required:true,
    },
},
{
    timestamps: true
});

userSchema.pre("save", function(next){
    const user = this;

    if(!user.isModified("password")) return;

    const salt = randomBytes(16).toString('hex');
    const hashedPass = createHmac('sha256', salt)
    .update(user.password)
    .digest('hex');

    this.password = salt + '.' + hashedPass;

    next();
});

userSchema.static("matchPassword", async function(saltedPassword, password){
    const salt = saltedPassword.split('.')[0];
    const originalPass = saltedPassword.split('.')[1];

    const hashedPass = createHmac('sha256', salt)
    .update(password)
    .digest('hex');
    return hashedPass === originalPass;
});

const User = mongoose.model('users', userSchema);

module.exports = User;