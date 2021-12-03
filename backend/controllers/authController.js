const User = require('../models/User');
const jwt = require('jsonwebtoken');

const handleErrors = (err) => {
    //let errors = { email: '', password: '', username: '' };

    // Incorrect email/password
    if(err.message === 'Incorrect email or password'){
        //errors.email  = err.message;
        return err.message
    }

    // Duplicate email error code
    if (err.code === 11000){
        //errors.email = 'This email is already registered';
        return 'This email is already registered';
    }

    // Validation errors
    if (err.message.includes('user validation failed') ) {
        let error = '';
        Object.values(err.errors).forEach(({ properties }) => {
            error = properties.message;
        });
        return error;
    }
    
    return err.messages;
}


const maxAge = 3*24*60*60; // Max duration of a token (3 days)
const createToken = (id) => {
    return jwt.sign({ id }, 'my secret signature', { expiresIn: maxAge });
}


module.exports.signup = async (req, res) => {
    const { email, password, username } = req.body;
    
    try{
        const user = await User.create({ email, password, username });
        const token = createToken(user._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge*1000 });
        const userData = await User.getUserData(user);
        res.status(201).json({ user: userData });
    } catch(err){
        const error = handleErrors(err);
        res.status(400).json({ err: error });
    }
    
}

module.exports.login = async (req, res) => {
    const { email, password } = req.body;

    try{
        const user = await User.login(email, password);
        const token = createToken(user._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge*1000 });
        const userData = await User.getUserData(user);
        res.status(200).json({ user: userData });

    }catch(err){
        const error = handleErrors(err);
        res.status(400).json({ err: error } );
    }
    
}

module.exports.requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;

    if(token){
        jwt.verify(token, 'my secret signature', async (err, decodedToken) =>{
            if(err) {
                console.log("authController -", err.message);
                res.send({auth: false, user: null});
            } else {
                const user = await User.findOne({_id: decodedToken.id});
                res.send({ auth: true, user: User.getUserData(user) });
            }
        });

    }else{
        res.send({auth: false});
    }
    
} 

module.exports.logout = (req, res) => {
    res.cookie('jwt', '', { maxAge: 1 });
    res.end();
}