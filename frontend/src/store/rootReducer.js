import authReducer  from "./auth/authReducer";
import taskReducer from "./task/taskReducer";
import teamReducer from "./team/teamReducer";
import { combineReducers } from "redux";


const rootReducer = combineReducers({
    auth: authReducer,
    task: taskReducer,
    team: teamReducer
});

export default rootReducer;
