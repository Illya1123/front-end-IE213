import { SET_USER_TOKEN } from '../actions'

const initState = {
    accessToken : ''
}

const authReducer = (state=initState, action) => {
    switch(action.type) {
        case SET_USER_TOKEN : {
            return {
                ...state,
                accessToken : action.payload,
            }
        }           
        default: 
            return state
    }
}

export default authReducer