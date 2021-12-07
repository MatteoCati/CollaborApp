import types from "./authTypes";

const initState = {
    error: '',
    authError: '',
    isLogged: false,
    user: null,
    loading: false,
}

const authReducer = (state = initState, action) => {
    switch(action.type){
        case types.LOGIN_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case types.LOGIN_SUCCESS: 
            return {
                ...state,
                loading: false,
                error: '',
                authError: '',
                isLogged: true,
                user: action.payload,
            }
        case types.LOGIN_DENIED:
            return {
                ...state,
                loading: false,
                isLogged: false,
                error : '',
                user: null,
                authError: action.payload
            }
        case types.LOGIN_FAILURE:
            return {
                ...state,
                loading: false,
                error: ''
            }
        case types.LOG_OUT_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case types.LOG_OUT_SUCCESS:
            return {
                ...state,
                loading: false,
                error: '',
                user: null,
                isLogged: false,
            }
        case types.LOG_OUT_FAILURE:
            console.log("Could not log out")
            return {
                ...state,
                loading: false,
                error: action.payload,
            }
        case types.CHECK_LOGGED_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case types.CHECK_LOGGED_SUCCESS:
            return {
                ...state,
                loading: false,
                error: '',
                isLogged: action.payload.auth,
                user: action.payload.user
            }
        case types.CHECK_LOGGED_FAILURE:
            console.log("Check logged error")
            return {
                ...state, 
                loading: false,
                error: action.payload,
                isLogged: false,
                user: null,
            }
        case types.SIGNUP_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case types.SIGNUP_SUCCESS:
            return {
                ...state,
                loading: false,
                isLogged: true,
                error: '',
                authError: '',
                user: action.payload,
            }
        case types.SIGNUP_DENIED:
            return {
                ...state,
                loading: false,
                isLogged: false,
                user: null,
                authError: action.payload,
                error: '',
            }
        case types.SIGNUP_FAILURE:
            return {
                ...state,
                loading: false,
                error: '',
            }
        default:
            return state;
    }
}


export default authReducer;