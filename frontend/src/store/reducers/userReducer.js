
const initState = {
    email: '',
    auth: false,
    teams: []
}

const userReducer = (state = initState, action) => {
    switch(action.type){
        case 'ADD_USER':
            return {username: action.username, auth: true, teams: []};
        case 'REMOVE_USER':
            return initState;
        default:
            return state;
    }
    
}

export default userReducer;