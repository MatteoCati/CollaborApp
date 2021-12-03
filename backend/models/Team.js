const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Activity Schema and model
const TeamSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name field is required'],
        unique: true,
    },
    ownerId: {
        type: [mongoose.ObjectId],
        ref: 'User'
    },
    members: {
        type: [mongoose.ObjectId],
        ref: 'User'
    }
});


const Team = mongoose.model('team', TeamSchema);

module.exports = Team;