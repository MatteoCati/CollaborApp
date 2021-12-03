import authReducer  from "./authReducer";
import taskReducer from "./taskReducer";
import teamReducer from "./teamReducer";
import { combineReducers } from "redux";


const rootReducer = combineReducers({
    auth: authReducer,
    task: taskReducer,
    team: teamReducer
});

export default rootReducer;
