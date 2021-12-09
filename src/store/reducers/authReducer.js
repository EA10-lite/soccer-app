const initState = {
    authError: null,
    success: false,
    emailVerified: false,
}

const authReducer = (state = initState, action)=> {
    switch (action.type) {
        case 'LOGIN_SUCCESS' : 
            return {
                ...state,
                authError:null,
                success : true
            }
        case 'LOGIN_ERROR' : 
            return {
                ...state,
                authError: action.err.message,
                success: false
            }
        case 'LOGOUT_SUCCESS ': 
            return {
                ...state,
                success : false,
                authError: null
            }
        case 'SIGNUP_SUCCESS' : 
            return {
                ...state,
                authError:null,
                success: true,
            }
        case 'SIGNUP_ERROR' : 
            return {
                ...state,
                authError: action.err.message,
                success: false,
            }
        case 'ACCOUNT_DELETE_SUCCESS' : 
            return state;
        case 'PROFILE_UPDATE' : 
            return {
                ...state,
                authError: null
            }
        case 'UPDATE_FAILED' : 
        return {
            ...state,
            }
        case 'VERIFICATION_SUCCESS': 
            return {
                ...state,
                emailVerified:true
            }
        case 'VERIFICATION_FAILED':
            return {
                ...state,
                emailVerified:false
            }
        default :
            return state;
    }
}

export default authReducer;