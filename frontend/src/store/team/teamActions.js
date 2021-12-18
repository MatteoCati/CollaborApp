import types from "./teamTypes";

/* Action for sending a request of teams list */
const fetchTeamsRequest = () => {
    return {
        type: types.FETCH_TEAMS_REQUEST
    };
}
/* Action for setting the teams list */
const fetchTeamsSuccess = (teams) => {
    return {
        type: types.FETCH_TEAMS_SUCCESS,
        payload: teams,
    }
}
/* Action for setting the get teams list error */
const fetchTeamsFailure = error => {
    return {
        type: types.FETCH_TEAMS_FAILURE,
        payload: error,
    }
}

/* Action for sendig request to addd a new team*/
const createTeamRequest = () => {
    return {
        type: types.CREATE_TEAM_REQUEST
    };
}
/* Action for adding a new team */
const createTeamSuccess = (newTeam) => {
    return {
        type: types.CREATE_TEAM_SUCCESS,
        payload: newTeam,
    }
}
/* Action for setting the create team error */
const createTeamFailure = error => {
    return {
        type: types.CREATE_TEAM_FAILURE,
        payload: error,
    }
}

/* Action for setting current team */
export const setCurrentTeam = teamId => {
    return {
        type: types.SET_CURRENT_TEAM,
        payload: teamId,
    }
}

/* Create a new team */
export const createTeam = (team) => {
    return (dispatch) => {
        // Set loading flag to true
        dispatch(createTeamRequest())
        // Send request for creating team
        fetch('http://localhost:8000/api/teams', {
            credentials: "include",
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(team)
        }).then(res => res.json())
        .then((data) => {
            // Add team to the state
            dispatch(createTeamSuccess(data));
            dispatch(setCurrentTeam(data._id));
        }).catch((err) => {
            // Set error message
            dispatch(createTeamFailure(err.message));
        });
    }
}

/* Fetch teams list from the server */
export const fetchTeams = () => {
    return (dispatch, getState) => {
        // Set loading flag to true
        dispatch(fetchTeamsRequest())
        // Send request for teams list
        fetch('http://localhost:8000/api/teams', {
            credentials: "include",
            method: 'GET',
        }).then(res => res.json())
        .then((data) => {
            // Set teams list in state 
            dispatch(fetchTeamsSuccess(data));
        }).catch((err) => {
            // Set error message in state
            dispatch(fetchTeamsFailure(err.message));
        });
    }
}

/* Add a new user to the current team*/ 
export const addUserToTeam = (userId) => {
    return (dispatch, getState) => {
        const state = getState();
        // Set loading flag to true
        dispatch(fetchTeamsRequest);
        // Send request for adding team
        fetch(`http://localhost:8000/api/teams/${state.team.currentTeam._id}`, {
            credentials: "include",
            method: 'PUT',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({ userId: userId })
        }).then(res => res.json())
        .then((data) => {
            // Send request for fetching teams list (updated)
            dispatch(fetchTeams());
        }).catch((err) => {
            // Set error message
            dispatch(fetchTeamsFailure(err.message));
        });
    }
}