import types from "./taskTypes";
import {LOG_OUT_SUCCESS} from "../auth/authTypes"; 
const initState = {
    tasks: [],
    loading: false,
    error: '',
}

const taskReducer = (state = initState, action) => {
    switch(action.type){
        case types.CREATE_TASK_REQUEST:
            return {
                ...state, 
                loading: true
            };
        case types.CREATE_TASK_SUCCESS:
            console.log(action.payload);
            return {
                ...state,
                tasks: [...state.tasks, action.payload],
                error: '',
                loading: false
            }
        case types.CREATE_TASK_FAILURE:
            return{
                ...state,
                error: action.payload,
                loading: false,
            }
        case types.CHANGE_TASK_STATUS_REQUEST:
            return {
                ...state, 
                loading: true,
            }
        case types.CHANGE_TASK_STATUS_SUCCESS:
            return {
                ...state,
                tasks: [...state.tasks.filter(x => x._id !== action.payload._id), action.payload],
                error: '',
                loading: false,
            }
        case types.CHANGE_TASK_STATUS_FAILURE:
            return {
                ...state,
                error: action.payload,
                loading: false,
            }
        case types.DELETE_TASK_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case types.DELETE_TASK_SUCCESS:
            return {
                ...state,
                tasks: [],
                loading: false,
                error: '',
            }
        case types.DELETE_TASK_FAILURE:
            return {
                ...state, 
                error: action.payload,
                loading: false,
            }
        case types.FETCH_TASKS_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case types.FETCH_TASKS_SUCCESS:
            return {
                ...state,
                tasks: action.payload,
                error: '',
                loading: false,
            }
        case types.FETCH_TASKS_FAILURE:
            return {
                ...state,
                tasks: [],
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