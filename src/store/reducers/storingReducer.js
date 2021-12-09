const initState = {
    following: false,
}

const storingReducer = (state = initState, action)=> {
    switch (action.type){
        case 'FOLLOWING_SUCCESS' :
            return {
                ...state,
                following:true,
            }
        case 'FOLLOWING_ERROR' : 
            return {
                ...state,
                following:false
            }
        case 'DOC_GOTTEN' : 
            return {
                ...state,
                following: true
            }
        case 'NO_SUCH_DOC' : 
            return {
                ...state,
                following: false
            }
        case 'FAILED_TO_FETCH_DOC':
            return {
                ...state,
                following:false
            }
        default :
            return state
    }
}

export default storingReducer;