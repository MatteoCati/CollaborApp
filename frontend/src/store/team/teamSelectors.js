export const teamByIdSelector = (state, id) => {
    const t = state.team.teams.find(x => x._id === id)
    return t;
}

export const selectUsersNotInTeam = (state, users) => {
    const team = state.team.currentTeam;
    return users.filter((user) => !team.members.includes(user._id));
}

export const selectUsersInTeam = (state, users) => {
    const team = state.team.currentTeam;
    return users.filter((user) => team.members.includes(user._id));
}