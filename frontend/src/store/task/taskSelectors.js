
export const taskByIdSelector = (state, id) => {
    const t = state.task.tasks.find(x => x._id === id)
    
    return t;
}

export const selectCurrentTeamTasks = (state) => {
    if(!state.team.currentTeam){
        return [];
    }
    return state.task.tasks.filter(task => (task.teamId === state.team.currentTeam._id));
}

export const selectActiveTasks = (state) => {
    if(!state.team.currentTeam){
        return [];
    }
    const isActive = (task) => {
        if(task.teamId !== state.team.currentTeam._id){
            return false;
        }
        if(task.completed){
            return false;
        }
        for(let id of task.prerequisites){
            const t = taskByIdSelector(state, id);
            if(!t.completed){
                return false;
            }
        }
        return true;
    }


    return state.task.tasks.filter(isActive);
}

export const selectQueuedTasks = (state) => {
    if(!state.team.currentTeam){
        return [];
    }
    const isQueued = (task) => {
        if(task.teamId !== state.team.currentTeam._id){
            return false;
        }
        if(task.completed){
            return false;
        }
        for(let id of task.prerequisites){
            const t = taskByIdSelector(state, id);
            if(!t.completed){
                return true;
            }
        }
        return false;
    }


    return state.task.tasks.filter(isQueued);
}

export const selectCompletedTasks = (state) => {
    if(!state.team.currentTeam){
        return [];
    }
    const isCompleted= (task) => {
        if(task.teamId !== state.team.currentTeam._id){
            return false;
        }
        return task.completed;
    }
    return state.task.tasks.filter(isCompleted);
}