const { findByIdAndUpdate } = require('../models/Team');
const Team = require('../models/Team');
const User = require('../models/User');

module.exports.getMyTeams = (req, res, next) =>{
    Team.find({ members: req.user._id }).then((teams) => {
        res.send(teams);
    });
}

module.exports.addUserToTeam = async (req, res, next) =>{
    var team = await Team.findById(req.params.id);
    if(team.members.includes(req.user._id) && !team.members.includes(req.body.userId)){
        team.members.push(req.body.userId);
        const user = await User.findById(req.body.userId);
        await User.findByIdAndUpdate(req.body.userId, {teams: [...user.teams, team._id]});
        const newTeam = await Team.findByIdAndUpdate(req.params.id, team, {new: true});
        res.send({newTeam});
    }else{
        res.status(400).end();
    }
}

module.exports.addTeam = async (req, res, next) =>{
    // Create new instance and save into collection
    const team = {
        name: req.body.name,
        ownerId : req.user._id,
        members: [req.user._id],
    }
    try {
        const newTeam = await Team.create(team);
        let user = await User.findById(req.user._id);
        user.teams.push(newTeam._id);
        await User.findByIdAndUpdate({ _id: user._id }, user);
        const updatedUser = await User.findById(user._id);
        res.send(updatedUser);
    }catch(err){
        res.status(400).send(err.message);
    }
}