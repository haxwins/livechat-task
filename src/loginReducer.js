const initialState = {
    isLoginValid: false,
    loginMessage: '',
    isLoading: false,
    errorMessage: '',
}

export default function reducer (state = initialState, action) {
    switch (action.type){
        case 'LOGIN_PENDING':{
            return {
                ...state,
                isLoading: true,
                errorMessage: '',
            }
        }
        case 'LOGIN_SUCCESFULL':{
            return {
                ...state,
                isLoading: false,
                isLoginValid: true,
                loginMessage: action.payload.loginMessage,
            }
        }
        case 'LOGIN_FAILURE':{
            return {
                ...state,
                isLoading: false,
                isLoginValid: false,
                errorMessage: action.payload.loginMessage,
            }
        }
        case 'LOGOUT':{
            return {
                ...initialState,
                isLoginValid: false,
            }
        }
        default:{
            return state
        }
    }
}