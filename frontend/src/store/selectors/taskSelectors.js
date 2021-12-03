
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