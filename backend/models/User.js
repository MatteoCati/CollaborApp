const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Enter an email'],
        unique: true,
        lowercase: true,
        validate:  [isEmail, 'Invalid email']
    },
    password: {
        type: String,
        required: [true, 'Enter a password'],
        minlength: [6, 'Minimum password length is 6 character']
    },
    username: {
        type: String,
        required: [true, 'Enter a username']
    },
    teams: {
        type: [mongoose.ObjectId],
        ref: 'Team',
        default: []
    }
});

/* Encrypt password before saving */ 
UserSchema.pre('save', async function(next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

/* Creeate method to login user */
UserSchema.statics.login = async function(email, password) {
    const user = await this.findOne({ email });
    if(user){
        const auth = await bcrypt.compare(password, user.password);
        if(auth){
            return user;
        }
    }
    throw Error('Incorrect email or password');
}

UserSchema.statics.getUserData = (user) => {
    return {
        _id: user._id,
        email: user.email,
        username: user.username,
        teams: user.teams
    }
}

const User = mongoose.model('user', UserSchema);

module.exports = User;