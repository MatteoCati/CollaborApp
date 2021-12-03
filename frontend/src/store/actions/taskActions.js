export const createTask = (task) => {
    return (dispatch, getState) => {
        const state = getState();
        
        task.teamId = state.team.currentTeam._id;
        task.ownerId = state.auth.user._id;
        console.log(task);
        fetch('http://localhost:8000/api/tasks', {
            credentials: "include",
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(task)
        }).then(res => res.json())
        .then((data) => {
            dispatch({type: 'CREATE_TASK', task: data});
        }).catch((err) => {
            dispatch({type: 'CREATE_TASK_ERROR', err });
        });

        
    }
}

export const changeTaskStatus = (task) => {
    return (dispatch, getState) => {
        fetch(`http://localhost:8000/api/tasks/${task._id}`, {
            method: "PUT",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...task, completed: !task.completed })
        }).then((res) => {
            return res.json()
        }).then((data) =>{
            dispatch({type: 'CHANGE_TASK_STATUS', task: data});
        }).catch((err) => {
            dispatch({type: 'CHANGE_TASK_STATUS_ERROR', err });
        });
    }
}

export const deleteTask = (task) => {
    return (dispatch, getState) => {
        fetch(`http://localhost:8000/api/tasks/${task._id}`, {
            method: "DELETE"
        }).then((res) => {
            return res.json()
        }).then((data) =>{
            dispatch({type: 'DELETE_TASK', task: data});
        }).catch((err) => {
            dispatch({type: 'DELETE_TASK_ERROR', err });
        });
    }   
}

export const getTasks = () => {
    return (dispatch, getState) => {
        fetch('http://localhost:8000/api/tasks', {
            credentials: "include",
            method: 'GET',
        }).then(res => res.json())
        .then((data) => {
            dispatch({type: 'GET_TASKS', tasks: data});
        }).catch((err) => {
            dispatch({type: 'GET_TASKS_ERROR', err });
        });
    }
}