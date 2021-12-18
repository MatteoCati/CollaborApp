import types from "./teamTypes";
import {LOG_OUT_SUCCESS} from "../auth/authTypes"; 


const initState = {
    teams: [],
    currentTeam: null,
    error: '',
    loading: false,
}

const taskReducer = (state = initState, action) => {
    switch(action.type){
        case types.FETCH_TEAMS_REQUEST:
            //console.log("Fetch requested")
            return {
                ...state,
                loading: true,
            }
        case types.FETCH_TEAMS_SUCCESS:
            //console.log("Fetch obtained")
            var ct = null;
            if(state.currentTeam){
                //console.log("updating current team");
                ct = action.payload.find((t) => t._id === state.currentTeam._id);
                //console.log("in red", ct.members);
            }
            return {
                ...state,
                loading: false,
                error: '',
                teams: action.payload,
                currentTeam: ct,
            }
        case types.FETCH_TEAMS_FAILURE:
            //console.log("Fetch failed")
            return {
                ...state,
                loading: false,
                error: action.payload,
                teams: [],
            }
        case types.SET_CURRENT_TEAM:
            const team = state.teams.find((team) => team._id === action.payload);
            return {
                ...state,
                currentTeam: team,
            }
        case types.CREATE_TEAM_REQUEST:
            //console.log("team creation requested")
            return {
                ...state,
                loading: true,
            }
        case types.CREATE_TEAM_SUCCESS:
            //console.log("team creation succeeded")
            return {
                ...state,
                teams: [...state.teams, action.payload],
                error: '',
                loading: false,
            }
        case types.CREATE_TEAM_FAILURE:
           //console.log("team creation failed")
            return {
                ...state,
                error: action.payload,
                loading: false,
            }
        case LOG_OUT_SUCCESS:
            return initState;
        default:
            return state;
    }
}



export default taskReducer;