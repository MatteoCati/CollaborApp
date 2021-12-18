const Task = require('../models/Task');
const User = require('../models/User');

/* Get all tasks visible to the current user */
module.exports.getTasks = async (req, res, next) =>{
    try {
        const tasks = await Task.find({});
        const allowedTasks =  tasks.filter(task => req.user.teams.includes(task.teamId));
        res.send(allowedTasks);
    } catch(err){
        res.status(400).send(err.message);
    }
}

/* Get a specific (check if visible to the user) */
module.exports.getTask = (req, res, next) =>{
    Task.findById(req.params.i).then((task) => {
        if(req.user.teams.includes(task.teamId)){
            res.send(task);
        }else{
            res.status(400).send({ err: "User cannot access this task" })
        }
    });
}


module.exports.addTask = async (req, res, next) =>{
    if(!req.user.teams.includes(req.body.teamId)){
        res.status(400).send("User not allowed in this team");
        return ;
    }
    // Create new instance and save into collection


    const task = {
        title: req.body.title, 
        description: req.body.description,
        ownerId: req.user._id,
        ownerUsername: req.user.username,
        teamId: req.body.teamId,
        prerequisites: req.body.prerequisites,
    }
    try{
        var assigned = req.user;
        if(req.body.assignedId){
            assigned = await User.findById(req.body.assignedId);
        }
        task.assignedId = assigned._id;
        task.assignedUsername = assigned.username;
        
        const createdTask = await Task.create(task)
        res.send(createdTask);
    } catch(err){
        next();
    }
}

module.exports.updateTask = (req, res, next) =>{
    Task.findByIdAndUpdate({ _id: req.params.id }, req.body)
    .then(() => {
        Task.findById(req.params.id)
        .then((task) => {
            res.send(task);
        });
    });
}

module.exports.deleteTask = async (req, res, next) =>{
    const deletedTask = await Task.findByIdAndDelete({ _id: req.params.id });
    const tasks = await Task.find({});
    for(let task of tasks){
        if(task.prerequisites.includes(deletedTask._id)){
            Task.updateOne({_id: task._id}, {$pull: {prerequisites: deletedTask._id}}, (err, task) => {
                if(err){
                    console.log(err);
                }
            } )
        }
    }
    res.send(deletedTask);
}
