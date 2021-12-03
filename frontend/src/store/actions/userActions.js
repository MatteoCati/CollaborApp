export const logoutUser = () => {
    return {type: 'REMOVE_USER'};
}

export const loginUser = (username) => {
    return {
        type: 'ADD_USER',
        username: username
    };
}