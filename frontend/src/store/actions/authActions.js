export const logIn = (credentials) => {
    return (dispatch, getState) => {
        fetch("http://localhost:8000/auth/login", {
                credentials: "include",
                method:'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(credentials)
            }).then((data) => {
                    return data.json();
            }).then((info) => {
                if(info.err){
                    dispatch({type: 'LOGIN_ERROR', err:info.err })
                }else{
                    dispatch({type: 'LOGIN_SUCCESS', user: info.user});
                }
                
            }).catch((err) => {
                dispatch({type: 'LOGIN_ERROR', err: err.message })
            });
    }
}

export const isLoggedIn = () => {
    return (dispatch, getState) => {
        fetch("http://localhost:8000/auth/isauth", {
            credentials: "include",
            method:'GET'
        }).then((data) => {
            return data.json();
        }).then((info) => {
            dispatch({type: 'CHECK_LOGGED_IN', payload: info});
        });
    } 
    
}


export const logOut = () => {
    return (dispatch, getState) => {
        fetch("http://localhost:8000/auth/logout", {
            credentials: "include",
            method:'GET'
        }).then(() => {
            dispatch({type: 'LOGOUT_SUCCESS'});
        });
    }
}


export const signUp = (newUser) => {

    return (dispatch, getState) =>{
        fetch("http://localhost:8000/auth/signup", {
                credentials: "include",
                method:'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newUser)
        }).then((data) => data.json())
        .then((info) => {
            if(info.err){
                dispatch({type: 'SIGNUP_ERROR', err: info.err});
            }else{
                dispatch({type: 'SIGNUP_SUCCESS', user: info.user});
            }
        }).catch((err) => {
            dispatch({type: 'SIGNUP_ERROR', err: err.message});
        });
    }
     
}