const initState = {
    teams: [],
    currentTeam: null
}

const taskReducer = (state = initState, action) => {
    switch(action.type){
        case 'LOGOUT_SUCCESS':
            return initState;
        case 'CREATE_TEAM':
            return { ...state, teams: [...state.teams, action.team]};
        case 'CREATE_TEAM_ERRROR':
            //console.log('create team error:', action.err);
            return state;
        case 'GET_TEAMS':
            //console.log("loaded teams");
            return { ...state, teams: action.teams }
        case 'GET_TEAMS_ERROR':
            //console.log('get teams error:', action.err);
            return state;
        case 'SET_CURRENT_TEAM':
            //console.log("Changed current team");
            const team = state.teams.find((team) => team._id === action.teamId);
            return {...state, currentTeam: team };
        case 'ADD_USER_TO_TEAM':
            //console.log("Added user to team");
            return state;
        case 'ADD_USER_TO_TEAM_ERROR':
            //console.log("Add user to team error");
            return state;
        default:
            return state;
    }
}



export default taskReducer;