const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Activity Schema and model
const TaskSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Title field is required']
    },
    description: {
        type: String,
        default: ''
    },
    ownerId: {
        type: mongoose.ObjectId,
        required: true
    },
    ownerUsername: {
        type: String,
    },
    assignedId: {
        type: mongoose.ObjectId,
    },
    assignedUsername: {
        type: String,
    },
    completed: {
        type: Boolean,
        default: false
    },
    teamId: {
        type: mongoose.ObjectId, 
        ref: 'Team'
    }
});


const Task = mongoose.model('task', TaskSchema);

module.exports = Task;
