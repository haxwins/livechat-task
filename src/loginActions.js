export function login (email, password){
    return dispatch => {
        dispatch({type: 'LOGIN_PENDING'})
        // MOCK API REPONSE 
        setTimeout(() => {
            if (email === 'test@test.pl' && password === 'Password1') {
                dispatch({
                    type: 'LOGIN_SUCCESFULL',
                    payload: {
                        loginMessage: 'Login succesfull',
                    },
                });

            } else {
                dispatch({
                    type: 'LOGIN_FAILURE',
                    payload: {
                        loginMessage: 'Invalid email or password',
                    },
                });
            }
        }, 3000);
    }
}

export function logout (){
    return dispatch => {
        dispatch({type: 'LOGOUT'});
    }
}