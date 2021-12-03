const User = require('../models/User');


module.exports.getAllUsers = async (req, res) => {
    
    const users = await User.find({}).select('username');
    res.status(200).send({users});
}