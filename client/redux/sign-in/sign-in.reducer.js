import { signInActionTypes } from './sign-in.types';


const INITIAL_STATE = {
    userAuthenticated: true,
    userID: null,
    logoutModalVisible: false
 
}

const signInReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case signInActionTypes.AUTHENTICATE_USER:
            return {
                ...state,
                userAuthenticated: action.payload
            }

        case signInActionTypes.SET_USER_ID:
            return {
                ...state,
                userID: action.payload
            }

        default:
            return state
    }
};


export default signInReducer;