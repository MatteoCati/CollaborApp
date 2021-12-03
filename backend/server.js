const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { checkUser } = require('./middleware/authMiddleware');


// Create express app
const app = express();

// Connect to database
mongoose.connect('mongodb://localhost/CollaborApp');
//mongoose.Promise = global.Promise; // May not be required anymore

app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['POST', 'PUT', 'GET', 'DELETE'],
    credentials: true
  }));

// Add body data to request object
app.use(express.json());

// Add cookies to request object
app.use(cookieParser());

// Get user from token
app.use(checkUser);


// Initialize routes for activities
app.use('/api', require('./routes/tasksRoutes'));
app.use('/api', require('./routes/usersRoutes'));
app.use('/api', require('./routes/teamsRoutes'));

// Error handling 
app.use((err, req, res, next) => {
    res.status(422).send({error: err.message});
});

app.use('/auth', require('./routes/authRoutes'));



const PORT = process.env.PORT || 8000;

app.listen(PORT, ()=>{
    console.log("Now listening on port:", PORT);
});
