const express = require('express');
const router = express.Router();
const teamsController = require("../controllers/teamsController");

/* Get a list of teams from database */ 
router.get('/teams', teamsController.getMyTeams);

/* Update an activity in the database */ 
router.put('/teams/:id', teamsController.addUserToTeam);


/* Add new team to the datebase */
router.post('/teams', teamsController.addTeam);



module.exports = router;



