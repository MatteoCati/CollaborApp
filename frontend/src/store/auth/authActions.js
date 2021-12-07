import types from "./authTypes";

const logInRequest = () => {
    return {
        type: types.LOGIN_REQUEST,
    }
}
const logInSuccess = (user) => {
    return {
        type: types.LOGIN_SUCCESS,
        payload: user,
    }
}
const logInDenied = error => {
    return {
        type: types.LOGIN_DENIED,
        payload: error,
    }
}
const logInFailure = (error) => {
    return {
        type: types.LOGIN_FAILURE,
        payload: error,
    }
}

const signUpRequest = () => {
    return {
        type: types.SIGNUP_REQUEST,
    }
}
const signUpSuccess = (user) => {
    return {
        type: types.SIGNUP_SUCCESS,
        payload: user,
    }
}
const signUpDenied = error => {
    return {
        type: types.SIGNUP_DENIED,
        payload: error,
    }
}
const signUpFailure = (error) => {
    return {
        type: types.SIGNUP_FAILURE,
        payload: error
    }
}

const checkLoggedRequest = () => {
    return {
        type: types.CHECK_LOGGED_REQUEST,
    }
}
const checkLoggedSuccess = (info) => {
    return {
        type: types.CHECK_LOGGED_SUCCESS,
        payload: info,
    }
}
const checkLoggedFailure = (error) => {
    return {
        type: types.CHECK_LOGGED_FAILURE,
        payload: error,
    }
}

const logOutRequest = () => {
    return {
        type: types.LOG_OUT_REQUEST,
    }
}
const logOutSuccess = () => {
    return {
        type: types.LOG_OUT_SUCCESS,
    }
}
const logOutFailure = () => {
    return {
        type: types.LOG_OUT_FAILURE,
    }
}

/* Log in */
export const logIn = (credentials) => {
    return (dispatch) => {
        dispatch(logInRequest());
        fetch("http://localhost:8000/auth/login", {
                credentials: "include",
                method:'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(credentials)
        }).then(data => data.json())
        .then((info) => {
            if(info.err){
                console.log("Error")
                dispatch(logInDenied(info.err.message))
            }else{
                dispatch(logInSuccess(info.user));
            }       
        }).catch((err) => {
            dispatch(logInFailure(err.message));
        });
    }
}

/* Sign up */
export const signUp = (newUser) => {
    return (dispatch) =>{
        dispatch(signUpRequest());
        fetch("http://localhost:8000/auth/signup", {
                credentials: "include",
                method:'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newUser)
        }).then(data => data.json())
        .then((info) => {
            if(info.err){
                dispatch(signUpDenied(info.err.message))
            }else{
                dispatch(signUpSuccess(info.user))
            }
        }).catch((err) => {
            dispatch(signUpFailure(err.message));
        });
    }    
}

/* Check if logged in */
export const isLoggedIn = () => {
    return (dispatch) => {
        dispatch(checkLoggedRequest())
        fetch("http://localhost:8000/auth/isauth", {
            credentials: "include",
            method:'GET'
        }).then(data => data.json())
        .then((info) => {
            dispatch(checkLoggedSuccess(info))
        }).catch(err => {
            dispatch(checkLoggedFailure(err.message));
        });
    }    
}

/* Log Out */
export const logOut = () => {
    return (dispatch) => {
        dispatch(logOutRequest());
        fetch("http://localhost:8000/auth/logout", {
            credentials: "include",
            method:'GET'
        })
        .then(() => {
            dispatch(logOutSuccess());
        })
        .catch(() => {
            dispatch(logOutFailure());
        });
    }
}

