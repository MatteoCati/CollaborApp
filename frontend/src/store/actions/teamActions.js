export const createTeam = (team) => {
    return (dispatch, getState) => {
        fetch('http://localhost:8000/api/teams', {
            credentials: "include",
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(team)
        }).then(res => res.json())
        .then((data) => {
            dispatch({type: 'CREATE_TEAM', team: data});
        }).catch((err) => {
            dispatch({type: 'CREATE_TEAM_ERROR', err });
        });
    }
}

export const getTeams = () => {
    return (dispatch, getState) => {
        fetch('http://localhost:8000/api/teams', {
            credentials: "include",
            method: 'GET',
        }).then(res => res.json())
        .then((data) => {
            dispatch({type: 'GET_TEAMS', teams: data});
        }).catch((err) => {
            dispatch({type: 'GET_TEAMS_ERROR', err });
        });
    }
}

export const setCurrentTeam = (teamId) => {
    return (dispatch, getState) => {
        dispatch({type: 'SET_CURRENT_TEAM', teamId});
    }
}

export const addUserToTeam = (userId) => {
    return (dispatch, getState) => {
        const state = getState();

        fetch(`http://localhost:8000/api/teams/${state.team.currentTeam._id}`, {
            credentials: "include",
            method: 'PUT',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({ userId: userId })
        }).then(res => res.json())
        .then((data) => {
            dispatch({type: 'ADD_USER_TO_TEAM', team: data});
            dispatch(getTeams());
            dispatch(setCurrentTeam(state.team.currentTeam._id));
        }).catch((err) => {
            dispatch({type: 'ADD_USER_TO_TEAM_ERROR', err });
        });
    }
}