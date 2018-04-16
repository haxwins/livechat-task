import reducer from '../loginReducer';

describe('Login reducer', ()=>{

    it('has default state', ()=>{

        expect(reducer(undefined, { type: 'UNEXPECTED'})).toEqual({
            isLoginValid: false,
            loginMessage: '',
            isLoading: false,
            errorMessage: '',
        });

    })

    it('set isLoading to true', ()=>{

        expect(reducer(undefined, { type: 'LOGIN_PENDING'})).toEqual({
            isLoginValid: false,
            loginMessage: '',
            isLoading: true,
            errorMessage: '',
        });

    })

    it('login succesfull', ()=>{

        expect(reducer(undefined, { 
            type: 'LOGIN_SUCCESFULL', 
            payload: { 
                loginMessage: 'test error message'
            }
        })).toEqual({
            isLoading: false,
            isLoginValid: true,
            loginMessage: 'test error message',
            errorMessage: '',
        });

    })

    it('login faliture', ()=>{

        expect(reducer(undefined, { 
            type: 'LOGIN_FAILURE', 
            payload: { 
                loginMessage: 'Invalid email or password'
            }
        })).toEqual({
            isLoading: false,
            isLoginValid: false,
            loginMessage: '',
            errorMessage: 'Invalid email or password',
        });

    })

    it('login faliture', ()=>{

        expect(reducer(undefined, { type: 'LOGOUT' })).toEqual({
            isLoginValid: false,
            loginMessage: '',
            isLoading: false,
            errorMessage: '',
        });

    })

})