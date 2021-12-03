const initState = {
    team: null,
    tasks: []

}

const taskReducer = (state = initState, action) => {
    switch(action.type){
        case 'LOGOUT_SUCCESS':
            return initState;
        case 'CREATE_TASK':
            return { ...state, tasks: [...state.tasks, action.task]};
        case 'CREATE_TASK_ERRROR':
            //console.log('create task error:', action.err);
            return state;
        case 'CHANGE_TASK_STATUS':
            return {...state, tasks: [...state.tasks.filter(x => x._id !== action.task._id), action.task]};
        case 'CHANGE_TASK_STATUS_ERROR':
            //console.log('change task status error:', action.err);
            return state;
        case 'DELETE_TASK':
            return { ...state, tasks: state.tasks.filter(x => x._id !== action.task._id) };
        case 'DELETE_TASK_ERROR':
            //console.log('delete task error:', action.err);
            return state;
        case 'GET_TASKS':
            return { ...state, tasks: action.tasks }
        case 'GET_TASKS_ERROR':
            //console.log('get tasks error:', action.err);
            return state;
        default:
            return state;
    }
}




export default taskReducer;