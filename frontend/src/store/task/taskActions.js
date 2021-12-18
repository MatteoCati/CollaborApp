import types from "./taskTypes";

/* Actions to create a new task*/
const createTaskRequest = () => {
    return {
        type: types.CREATE_TASK_REQUEST
    }
}
const createTaskSuccess = (task) => {
    return {
        type: types.CREATE_TASK_SUCCESS,
        payload: task
    }
}
const createTaskFailure = (error) => {
    return {
        type: types.CREATE_TASK_FAILURE,
        payload: error
    }
}

/* Actions to change a task's status */
const changeTaskStatusRequest = () => {
    return {
        type: types.CHANGE_TASK_STATUS_REQUEST
    }
}
const changeTaskStatusSuccess = (task) => {
    return {
        type: types.CHANGE_TASK_STATUS_SUCCESS,
        payload: task
    }
}
const changeTaskStatusFailure = (error) => {
    return {
        type: types.CHANGE_TASK_STATUS_FAILURE,
        payload: error
    }
}

/* Actions to delete a task */
const deleteTaskRequest = () => {
    return {
        type: types.DELETE_TASK_REQUEST
    }
}
const deleteTaskSuccess = (task) => {
    return {
        type: types.DELETE_TASK_SUCCESS,
        payload: task
    }
}
const deleteTaskFailure = (error) => {
    return {
        type: types.DELETE_TASK_FAILURE,
        payload: error
    }
}

/* Actions to gat tasks list */
const fetchTasksRequest = () => {
    return {
        type: types.FETCH_TASKS_REQUEST
    }
}
const fetchTasksSuccess = (tasks) => {
    return {
        type: types.FETCH_TASKS_SUCCESS,
        payload: tasks
    }
}
const fetchTasksFailure = (error) => {
    return {
        type: types.FETCH_TASKS_FAILURE,
        payload: error
    }
}


/* Create a new task */
export const createTask = (task) => {
    return (dispatch, getState) => {
        const state = getState();
        
        task.teamId = state.team.currentTeam._id;
        task.ownerId = state.auth.user._id;
        dispatch(createTaskRequest());
        fetch('http://localhost:8000/api/tasks', {
            credentials: "include",
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(task)
        }).then(res => res.json())
        .then((data) => {
            dispatch(createTaskSuccess(data));
        }).catch((err) => {
            dispatch(createTaskFailure(err.message));
        });
    }
}

/* Change task status */
export const changeTaskStatus = (task) => {
    return (dispatch) => {
        dispatch(changeTaskStatusRequest())
        fetch(`http://localhost:8000/api/tasks/${task._id}`, {
            method: "PUT",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...task, completed: !task.completed })
        }).then((res) => {
            return res.json()
        }).then((data) =>{
            dispatch(changeTaskStatusSuccess(data));
        }).catch((err) => {
            dispatch(changeTaskStatusFailure(err.message));
        });
    }
}

/* Delete task*/
export const deleteTask = (task) => {
    return (dispatch, getState) => {
        dispatch(deleteTaskRequest());
        fetch(`http://localhost:8000/api/tasks/${task._id}`, {
            method: "DELETE"
        }).then((res) => {
            return res.json()
        }).then((data) =>{
            dispatch(deleteTaskSuccess(data));
            dispatch(fetchTasks());
        }).catch((err) => {
            dispatch(deleteTaskFailure(err.message));
        });
    }   
}

/* Fetch tasks */
export const fetchTasks = () => {
    return (dispatch, getState) => {
        dispatch(fetchTasksRequest());
        console.log("Fetched");
        fetch('http://localhost:8000/api/tasks', {
            credentials: "include",
            method: 'GET',
        }).then(res => res.json())
        .then((data) => {
            dispatch(fetchTasksSuccess(data));
        }).catch((err) => {
            dispatch(fetchTasksFailure(err.message));
        });
    }
}
