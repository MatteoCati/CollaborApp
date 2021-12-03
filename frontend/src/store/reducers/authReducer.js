const initState = {
    authError: null,
    isLogged: false,
    user: null
}

const authReducer = (state = initState, action) => {
    switch(action.type){
        case 'LOGIN_ERROR':
            //console.log("login error");
            return {
                ...state,
                authError: action.err
            };
        case 'LOGIN_SUCCESS':
            //console.log('Log in success');
            return {
                ...state,
                authError: null,
                isLogged: true,
                user: action.user
            };
        case 'LOGOUT_SUCCESS':
            //console.log('log out success');
            return {
                ...state,
                isLogged: false,
                user: null
            }
        case 'CHECK_LOGGED_IN':
            //console.log("updated login status");
            return {
                ...state,
                isLogged: action.payload.auth,
                user: action.payload.user
            }
        case 'SIGNUP_SUCCESS':
            //console.log("signup success");
            return {
                authError: null,
                isLogged: true,
                user: action.user
            }
        case 'SIGNUP_ERROR':
            //console.log('signup error');
            return {
                ...state,
                authError: action.err
            }
        default:
            return state;
    }
}


export default authReducer;